import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// 이 라우트는 매 요청마다 실행되어야 합니다(정적 최적화 방지)
export const dynamic = "force-dynamic";

// 허용된 테스트/유형만 기록합니다. (임의의 값이 들어와 저장소가 오염되는 것 방지)
const ALLOWED = {
  love: ["fire", "game", "pure", "wall", "free", "strategy"],
  pastlife: ["king","general","scholar","assassin","shaman","merchant","jester","farmer","monk","wanderer","healer","bandit"],
  animal: ["retriever","cat","fox","wolf","bear","rabbit","lion","panda","owl","dolphin","penguin","deer","tiger","otter","squirrel","eagle"],
  stress: ["burst","freeze","ruminate","avoid","control","connect","reward","mask"],
  politics: ["center", "libLeft", "authLeft", "libRight", "authRight"],
  career: ["achieve","stable","reward","free","relation","meaning","balance","expert"],
  spending: ["flex","saver","planner","value","impulse","smart","giver","brand"],
  money: ["S", "A", "B", "C", "D"],
};

function getRedis() {
  // 환경변수가 없으면 통계 기능만 비활성화되고 사이트는 정상 동작합니다
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function isValid(test, type) {
  return Boolean(ALLOWED[test]) && ALLOWED[test].includes(type);
}

function summarize(test, counts) {
  const types = ALLOWED[test];
  const total = types.reduce((s, t) => s + (Number(counts[t]) || 0), 0);
  const dist = {};
  types.forEach((t) => {
    const n = Number(counts[t]) || 0;
    dist[t] = { count: n, pct: total ? Math.round((n / total) * 1000) / 10 : 0 };
  });
  return { total, dist };
}

// 결과 1건 기록 후 최신 분포 반환
export async function POST(req) {
  try {
    const { test, type } = await req.json();
    if (!isValid(test, type)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const redis = getRedis();
    if (!redis) return NextResponse.json({ enabled: false });

    const key = `stats:${test}`;
    await redis.hincrby(key, type, 1);
    const counts = (await redis.hgetall(key)) || {};
    return NextResponse.json({ enabled: true, ...summarize(test, counts) });
  } catch (e) {
    console.error("stats POST error:", e);
    return NextResponse.json({ enabled: false });
  }
}

// 기록 없이 분포만 조회
export async function GET(req) {
  try {
    const test = new URL(req.url).searchParams.get("test");
    if (!ALLOWED[test]) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const redis = getRedis();
    if (!redis) return NextResponse.json({ enabled: false });

    const counts = (await redis.hgetall(`stats:${test}`)) || {};
    return NextResponse.json({ enabled: true, ...summarize(test, counts) });
  } catch (e) {
    console.error("stats GET error:", e);
    return NextResponse.json({ enabled: false });
  }
}
