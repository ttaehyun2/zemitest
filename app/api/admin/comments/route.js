import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * 관리자 인증.
 * ADMIN_TOKEN 환경변수와 요청 헤더를 비교합니다.
 * 길이가 달라도 시간차로 추측당하지 않도록 고정 길이 해시를 비교합니다.
 */
function isAdmin(req) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false; // 토큰 미설정 시 관리 기능 자체를 잠금
  const given = req.headers.get("x-admin-token") || "";
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

// 전체 댓글 조회 (페이지별)
export async function GET(req) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const redis = getRedis();
  if (!redis) return NextResponse.json({ enabled: false, pages: [] });

  const pages = (await redis.smembers("cmt:pages")) || [];
  const result = [];
  for (const p of pages) {
    const raw = await redis.lrange(`cmt:${p}`, 0, 99);
    const items = (raw || []).map((v) => (typeof v === "string" ? JSON.parse(v) : v));
    if (items.length) result.push({ page: p, items });
  }
  result.sort((a, b) => (b.items[0]?.at || 0) - (a.items[0]?.at || 0));
  return NextResponse.json({ enabled: true, pages: result });
}

// 댓글 삭제 (단건) 또는 특정 작성자 전체 삭제
export async function DELETE(req) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "storage" }, { status: 503 });

  try {
    const { page, id, banHash } = await req.json();

    // 특정 작성자(해시)의 모든 댓글 삭제
    if (banHash) {
      const pages = (await redis.smembers("cmt:pages")) || [];
      let removed = 0;
      for (const p of pages) {
        const raw = (await redis.lrange(`cmt:${p}`, 0, -1)) || [];
        const items = raw.map((v) => (typeof v === "string" ? JSON.parse(v) : v));
        const keep = items.filter((it) => it.h !== banHash);
        removed += items.length - keep.length;
        await redis.del(`cmt:${p}`);
        if (keep.length) {
          await redis.rpush(`cmt:${p}`, ...keep.map((k) => JSON.stringify(k)));
        }
      }
      // 24시간 차단
      await redis.set(`ban:${banHash}`, 1, { ex: 86400 });
      return NextResponse.json({ ok: true, removed });
    }

    if (!page || !id) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const key = `cmt:${page}`;
    const raw = (await redis.lrange(key, 0, -1)) || [];
    const items = raw.map((v) => (typeof v === "string" ? JSON.parse(v) : v));
    const keep = items.filter((it) => it.id !== id);
    await redis.del(key);
    if (keep.length) {
      await redis.rpush(key, ...keep.map((k) => JSON.stringify(k)));
    }
    return NextResponse.json({ ok: true, removed: items.length - keep.length });
  } catch (e) {
    console.error("admin DELETE:", e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
