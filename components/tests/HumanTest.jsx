"use client";
import ScoreTest from "../ScoreTest";
import { QUESTIONS, MAX_SCORE, MAX_PER_AREA, AREAS, getLevel } from "../../lib/humanTest";

const config = {
  testKey: "human", questions: QUESTIONS, maxScore: MAX_SCORE, getLevel,
  areas: AREAS, maxPerArea: MAX_PER_AREA,
  emoji: "👑", eyebrow: "HUMAN STATS",
  title: <>너는 상위 몇 프로의<br />인간인가?</>,
  sub: <>멘탈·사회성·자기관리·판단력·체력·공감력.<br />6개 영역 종합 능력치를 재봅니다.</>,
  meta: "24문항 · 6개 영역 · 상위 %",
  scoreLabel: "종합 능력치", resultEyebrow: "나의 인간 종합 능력치",
  shareText: (r) => `나 인간 능력치 상위 ${r.top}% (${r.grade.g}등급)\n최고 영역: ${r.areaScores[0].label} ${r.areaScores[0].pct}%\n\n너는 상위 몇 %인지 해봐 👑`,
  footerNote: "친구들과 능력치 비교해보세요 👑",
};
export default function HumanTest() { return <ScoreTest config={config} />; }
