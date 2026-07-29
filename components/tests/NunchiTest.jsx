"use client";

import ScoreTest from "../ScoreTest";
import { QUESTIONS, MAX_SCORE, getLevel } from "../../lib/nunchiTest";

// 설정에 함수가 들어가므로 클라이언트 쪽에서 구성합니다.
const config = {
  testKey: "nunchi",
  questions: QUESTIONS,
  maxScore: MAX_SCORE,
  getLevel,
  emoji: "👀",
  eyebrow: "NUNCHI TEST",
  title: (
    <>
      나는 눈치가
      <br />
      얼마나 빠를까?
    </>
  ),
  sub: (
    <>
      20가지 상황에서 가장 적절한 행동 고르기.
      <br />
      실제 참여자 기준 상위 몇 %인지 알려드려요.
    </>
  ),
  meta: "20문항 · 상위 % 표시",
  scoreLabel: "눈치 점수",
  resultEyebrow: "나의 눈치 점수",
  shareText: (r) =>
    `나 눈치 상위 ${r.top}% 나왔다 (${r.grade.g}등급)\n「${r.level.emoji} ${r.level.name}」\n\n너는 상위 몇 %인지 해봐 👀`,
  footerNote: "친구들과 점수 비교해보세요 👀",
};

export default function NunchiTest() {
  return <ScoreTest config={config} />;
}
