"use client";

import ScoreTest from "../ScoreTest";
import { QUESTIONS, MAX_SCORE, getLevel, toDays } from "../../lib/islandTest";

const config = {
  testKey: "island",
  questions: QUESTIONS,
  maxScore: MAX_SCORE,
  getLevel,
  emoji: "🏝️",
  eyebrow: "ISLAND SURVIVAL",
  title: (
    <>
      무인도에서
      <br />
      나는 며칠 버틸까?
    </>
  ),
  sub: (
    <>
      물, 불, 식량, 구조 신호까지.
      <br />
      20가지 상황으로 알아보는 생존력.
    </>
  ),
  meta: "20문항 · 생존 일수 계산",
  scoreLabel: "생존력",
  resultEyebrow: "나의 무인도 생존력",
  headline: (r) => `${toDays(r.score)}일 생존`,
  shareText: (r) =>
    `나는 무인도에서 ${toDays(r.score)}일 버틴대 (상위 ${r.top}%)\n「${r.level.emoji} ${r.level.name}」\n\n너는 며칠인지 해봐 🏝️`,
  footerNote: "친구들과 생존 일수 비교해보세요 🏝️",
};

export default function IslandTest() {
  return <ScoreTest config={config} />;
}
