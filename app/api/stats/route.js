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
  karma: ["limbo", "heaven1", "heaven2", "heaven3", "heaven4", "heaven5", "heaven6", "heaven7", "heaven8", "heaven9", "hell1", "hell2", "hell3", "hell4", "hell5", "hell6", "hell7", "hell8", "hell9"],
  moral: ["util", "duty", "bond", "guard", "situation", "just"],
  legacy: ["tree", "fire", "candle", "path", "laugh", "make", "stand", "bridge"],
  lifesim: ["starve","prison","forgotten","burnedout","accident","overwork","gaveout","godmode","monster","ruined","collapse","broke","disgraced","hollow",
            "workhorse","lonelytop","legend","reborn","quietrich","giver","mentor",
            "creator","family","freesoul","comeback","gambler","healthy","ordinary"],
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

// ── 점수형 테스트: 점수 분포를 기록하고 백분위를 돌려줍니다 ──
// 유형형과 달리 0~100 점수를 버킷에 누적해 "상위 몇 %"를 실제 데이터로 계산합니다.
// ── 등수 계산용 기준 분포 ──
// 참여자가 한두 명일 때 "상위 100%" 같은 결과가 나오지 않도록,
// 가상 참여자 분포를 섞어 완만하게 만듭니다.
// 실제 참여자가 쌓이면 이 영향은 자연스럽게 옅어집니다.
const PRIOR_STRENGTH = 45;  // 가상 참여자 수에 해당
const PRIOR_MEAN = 58;      // 이런 테스트의 평균적인 점수대
const PRIOR_SD = 16;
const RELIABLE = 40;        // 이 인원을 넘으면 추정치 표시를 뗍니다

function gaussian(x, mean, sd) {
  return Math.exp(-((x - mean) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
}

const SCORE_TESTS = ["nunchi", "difficulty", "island", "social", "liar", "human", "youtube", "money", "princess", "stock"];

export async function PUT(req) {
  try {
    const { test, score } = await req.json();
    if (!SCORE_TESTS.includes(test)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const n = Math.max(0, Math.min(100, Math.round(Number(score))));
    if (!Number.isFinite(n)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const redis = getRedis();
    if (!redis) return NextResponse.json({ enabled: false });

    const key = `scores:${test}`;
    await redis.hincrby(key, String(n), 1);
    const counts = (await redis.hgetall(key)) || {};

    // 실제 참여자 집계
    let real = 0;
    Object.values(counts).forEach((v) => (real += Number(v) || 0));

    // 참여자가 적을 때 등수가 요동치는 것을 막기 위해
    // 기준 분포(가상 참여자)를 섞어 계산합니다.
    // 실제 참여자가 늘면 기준 분포의 영향은 자연히 사라집니다.
    const blended = { ...counts };
    Object.keys(blended).forEach((k) => (blended[k] = Number(blended[k]) || 0));
    for (let sc = 0; sc <= 100; sc++) {
      const w = PRIOR_STRENGTH * gaussian(sc, PRIOR_MEAN, PRIOR_SD);
      blended[sc] = (blended[sc] || 0) + w;
    }

    let total = 0, below = 0, same = 0;
    Object.entries(blended).forEach(([k, v]) => {
      const c = Number(v) || 0;
      total += c;
      if (Number(k) < n) below += c;
      if (Number(k) === n) same += c;
    });

    // 동점자는 절반만 앞선 것으로 계산 (표준적인 백분위 방식)
    const percentile = total ? ((below + same / 2) / total) * 100 : 50;
    const topPct = Math.max(1, Math.min(99, Math.round(100 - percentile)));

    // 평균은 실제 데이터로만 (기준 분포를 섞으면 왜곡됩니다)
    const realSum = Object.entries(counts).reduce(
      (acc, [k, v]) => acc + Number(k) * (Number(v) || 0), 0
    );

    return NextResponse.json({
      enabled: true,
      total: real,                 // 실제 참여자 수
      estimated: real < RELIABLE,  // 아직 표본이 적어 추정치인지
      topPct,
      percentile: Math.round(percentile),
      average: real ? Math.round(realSum / real) : null,
    });
  } catch (e) {
    console.error("stats PUT error:", e);
    return NextResponse.json({ enabled: false });
  }
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
