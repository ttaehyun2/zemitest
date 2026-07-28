import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import { validateComment } from "../../../lib/commentFilter";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;
const MAX_PER_PAGE = 300; // 페이지당 보관 최대 개수(오래된 건 밀려남)

// 도배 방지 기준
const COOLDOWN_SEC = 30; // 같은 사람 30초에 1개
const HOURLY_LIMIT = 10; // 시간당 10개

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// IP 는 원본을 저장하지 않고 해시만 사용합니다(도배 방지 용도)
function ipHash(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const salt = process.env.IP_SALT || "zemitest-default-salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex").slice(0, 16);
}

// 페이지 식별자 검증 (임의 키 생성 방지)
const PAGE_RE = /^[a-z0-9-]{2,40}$/;

export async function GET(req) {
  try {
    const pageId = new URL(req.url).searchParams.get("page");
    if (!pageId || !PAGE_RE.test(pageId)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const redis = getRedis();
    if (!redis) return NextResponse.json({ enabled: false, items: [] });

    const raw = await redis.lrange(`cmt:${pageId}`, 0, PAGE_SIZE - 1);
    const items = (raw || []).map((v) => (typeof v === "string" ? JSON.parse(v) : v));
    return NextResponse.json({ enabled: true, items });
  } catch (e) {
    console.error("comments GET:", e);
    return NextResponse.json({ enabled: false, items: [] });
  }
}

export async function POST(req) {
  try {
    const { page, nick, text } = await req.json();
    if (!page || !PAGE_RE.test(page)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const check = validateComment({ nick, text });
    if (!check.ok) {
      return NextResponse.json({ error: check.reason }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: "댓글 기능이 아직 준비되지 않았어요." }, { status: 503 });
    }

    // 도배 방지
    const h = ipHash(req);
    const cdKey = `cd:${h}`;
    const hourKey = `hr:${h}`;

    // 관리자가 차단한 작성자인지 확인
    if (await redis.get(`ban:${h}`)) {
      return NextResponse.json(
        { error: "현재 댓글을 남길 수 없는 상태입니다." },
        { status: 403 }
      );
    }

    if (await redis.get(cdKey)) {
      return NextResponse.json(
        { error: `조금만 기다렸다 다시 남겨주세요.` },
        { status: 429 }
      );
    }
    const hourCount = await redis.incr(hourKey);
    if (hourCount === 1) await redis.expire(hourKey, 3600);
    if (hourCount > HOURLY_LIMIT) {
      return NextResponse.json(
        { error: "한 시간에 남길 수 있는 댓글 수를 넘었어요." },
        { status: 429 }
      );
    }
    await redis.set(cdKey, 1, { ex: COOLDOWN_SEC });

    const item = {
      id: crypto.randomUUID(),
      nick: check.nick,
      text: check.text,
      at: Date.now(),
      h, // 신고·차단 처리용 (원본 IP 아님)
    };

    const key = `cmt:${page}`;
    await redis.lpush(key, JSON.stringify(item));
    await redis.ltrim(key, 0, MAX_PER_PAGE - 1);

    // 관리자 화면에서 전체 목록을 보기 위한 색인
    await redis.sadd("cmt:pages", page);

    return NextResponse.json({ ok: true, item });
  } catch (e) {
    console.error("comments POST:", e);
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
