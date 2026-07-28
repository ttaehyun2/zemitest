"use client";
import ScoreTest from "../ScoreTest";
import { QUESTIONS, MAX_SCORE, getLevel } from "../../lib/socialTest";

const config = {
  testKey: "social", questions: QUESTIONS, maxScore: MAX_SCORE, getLevel,
  emoji: "🎖️", eyebrow: "SOCIAL SURVIVAL",
  title: <>나는 사회생활을<br />얼마나 잘 버틸까?</>,
  sub: <>거절, 실수 대응, 부당한 요구까지.<br />조직 안에서 나를 지키는 법 20가지 상황.</>,
  meta: "20문항 · 100점 만점 · 상위 % 표시",
  scoreLabel: "생존력", resultEyebrow: "나의 사회생활 생존력",
  shareText: (r) => `내 사회생활 생존력은 ${r.score}점 「${r.level.emoji} ${r.level.name}」\n\n너는 몇 점 나오는지 해봐 🎖️`,
  footerNote: "친구들과 점수 비교해보세요 🎖️",
};
export default function SocialTest() { return <ScoreTest config={config} />; }
