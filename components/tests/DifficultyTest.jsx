"use client";

import ScoreTest from "../ScoreTest";
import { QUESTIONS, MAX_SCORE, getLevel } from "../../lib/difficultyTest";

const config = {
  testKey: "difficulty",
  questions: QUESTIONS,
  maxScore: MAX_SCORE,
  getLevel,
  emoji: "🎮",
  eyebrow: "LIFE DIFFICULTY",
  title: (
    <>
      너의 인생 난이도는
      <br />
      몇 단계일까?
    </>
  ),
  sub: (
    <>
      일상의 귀찮음을 게임 난이도로 환산합니다.
      <br />
      EASY부터 NIGHTMARE까지 5단계.
    </>
  ),
  meta: "20문항 · 난이도 5단계",
  scoreLabel: "여유 점수",
  resultEyebrow: "나의 인생 난이도",
  headline: (r) => `난이도 ${r.level.name}`,
  shareText: (r) =>
    `내 인생 난이도는 「${r.level.emoji} ${r.level.name}」 (여유 상위 ${r.top}%)\n\n너는 몇 단계 나오는지 해봐 🎮`,
  disclaimer:
    "이 테스트는 생활 습관과 환경을 가볍게 살펴보는 참고용이며, 삶의 가치를 평가하지 않습니다.",
  footerNote: "친구들과 난이도 비교해보세요 🎮",
};

export default function DifficultyTest() {
  return <ScoreTest config={config} />;
}
