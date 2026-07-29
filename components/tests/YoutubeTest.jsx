"use client";

import ScoreTest from "../ScoreTest";
import {
  QUESTIONS, MAX_SCORE, MAX_PER_AREA, AREAS, CHANNEL_TYPES,
  getLevel, toSubs, formatSubs,
} from "../../lib/youtubeTest";

const config = {
  testKey: "youtube",
  questions: QUESTIONS,
  maxScore: MAX_SCORE,
  getLevel,
  areas: AREAS,
  maxPerArea: MAX_PER_AREA,
  emoji: "📺",
  eyebrow: "YOUTUBER TEST",
  title: (
    <>
      당신이 유튜버라면
      <br />
      구독자 몇 명일까?
    </>
  ),
  sub: (
    <>
      기획·꾸준함·표현·기술·멘탈·소통 6개 영역.
      <br />
      예상 구독자 수와 버튼 등급까지 알려드려요.
    </>
  ),
  meta: "20문항 · 예상 구독자 수 · 상위 %",
  scoreLabel: "유튜버 지수",
  resultEyebrow: "당신의 예상 구독자",
  headline: (r) => `구독자 ${formatSubs(toSubs(r.score))}명`,
  // 가장 높은 영역으로 어울리는 채널 유형을 정합니다
  extra: (r) => {
    const top = r.areaScores?.[0];
    const t = top && CHANNEL_TYPES[top.key];
    return t ? { label: "어울리는 채널 유형", emoji: t.emoji, name: t.name, desc: t.desc } : null;
  },
  shareText: (r) =>
    `내가 유튜버였다면 구독자 ${formatSubs(toSubs(r.score))}명 (상위 ${r.top}%)\n「${r.level.emoji} ${r.level.name}」\n\n너는 몇 명 나오는지 해봐 📺`,
  footerNote: "친구들과 구독자 수 비교해보세요 📺",
};

export default function YoutubeTest() {
  return <ScoreTest config={config} />;
}
