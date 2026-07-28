"use client";
import ScoreTest from "../ScoreTest";
import { ENGINE_QUESTIONS, MAX_SCORE, getLevel } from "../../lib/liarTest";

const config = {
  testKey: "liar", questions: ENGINE_QUESTIONS, maxScore: MAX_SCORE, getLevel,
  emoji: "🔍", eyebrow: "LIE DETECTOR",
  title: <>너는 이 사람의<br />거짓말을 알아챌까?</>,
  sub: <>20가지 상황을 보고 진실인지 거짓인지 판단하기.<br />참고로 사람의 평균 정확도는 54%입니다.</>,
  meta: "20문항 · 정확도 % · 상위 % 표시",
  scoreLabel: "정확도", scoreUnit: "%", resultEyebrow: "나의 거짓말 탐지 정확도",
  shareText: (r) => `내 거짓말 탐지 정확도는 ${r.score}% 「${r.level.emoji} ${r.level.name}」\n사람 평균은 54%래\n\n너는 몇 % 나오는지 해봐 🔍`,
  footerNote: "친구들과 정확도 비교해보세요 🔍",
};
export default function LiarTest() { return <ScoreTest config={config} />; }
