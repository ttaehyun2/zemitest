"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import { Intro, QuestionCard, Bar } from "./QuizShell";
import { QUESTIONS, AREAS, MAX_PER_AREA, getGrade } from "../lib/moneyTest";

export default function MoneyTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const areaScores = { save: 0, spend: 0, invest: 0, risk: 0 };
    answers.forEach((p, i) => {
      areaScores[QUESTIONS[i].area] += p;
    });
    const areaPcts = Object.keys(areaScores).map((k) => ({
      ...AREAS[k],
      pct: Math.round((areaScores[k] / MAX_PER_AREA) * 100),
    }));
    const totalPct = Math.round(
      (Object.values(areaScores).reduce((a, b) => a + b, 0) /
        (MAX_PER_AREA * 4)) *
        100
    );
    const sorted = [...areaPcts].sort((a, b) => b.pct - a.pct);
    return {
      totalPct,
      grade: getGrade(totalPct),
      areaPcts,
      strong: sorted[0],
      weak: sorted[sorted.length - 1],
    };
  }, [screen, answers]);

  function pick(i) {
    const p = QUESTIONS[step].a[i].p;
    const next = [...answers.slice(0, step), p];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("result");
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setCopied(false);
    setScreen("intro");
  }

  async function share() {
    const text = `나의 경제력 점수는 ${result.totalPct}점 「${result.grade.emoji} ${result.grade.name}」\n제일 강한 영역: ${result.strong.label} ${result.strong.pct}%\n\n너의 경제력도 측정해봐 💰\nzemitest.com`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "나의 경제력 테스트", text });
        return;
      }
    } catch (e) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      /* 무시 */
    }
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro
          emoji="💰"
          eyebrow="MONEY TEST"
          title={<>나의 경제력은<br />몇 점일까?</>}
          sub={<>저축, 소비 관리, 금융 이해, 위험 대비.<br />4개 영역을 점수로 확인해보세요.</>}
          meta="24문항 · 100점 만점"
          onStart={() => setScreen("quiz")}
        />
      )}

      {screen === "quiz" && (
        <QuestionCard
          step={step}
          total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={QUESTIONS[step].a.map((o) => o.t)}
          onPick={pick}
          onBack={back}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            className="lu-result-card"
            style={{
              background: `linear-gradient(160deg, ${result.grade.grad[0]}, ${result.grade.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나의 경제력 점수</p>

            <div className="score-ring">
              <span className="score-num">{result.totalPct}</span>
              <span className="score-unit">점</span>
            </div>
            <p className="grade-badge">
              {result.grade.emoji} {result.grade.grade}등급
            </p>

            <h2 className="lu-result-name">{result.grade.name}</h2>
            <p className="lu-result-desc">{result.grade.desc}</p>

            <div className="lu-bars">
              <p className="lu-bars-title">영역별 점수</p>
              {result.areaPcts.map((a) => (
                <Bar
                  key={a.key}
                  label={`${a.emoji} ${a.label}`}
                  pct={a.pct}
                  sub={a.desc}
                />
              ))}
            </div>

            <div className="lu-match-row">
              <div className="lu-match">
                <p className="lu-match-label">가장 강한 영역 💪</p>
                <p className="lu-match-type">
                  {result.strong.emoji} {result.strong.label}
                </p>
              </div>
              <div className="lu-match">
                <p className="lu-match-label">보완할 영역 📌</p>
                <p className="lu-match-type">
                  {result.weak.emoji} {result.weak.label}
                </p>
              </div>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <p className="disclaimer">
            이 테스트는 금융 습관을 돌아보기 위한 참고용입니다. 투자 판단이나
            재무 상담을 대신하지 않습니다.
          </p>

          <Link href="/articles/compound-interest" className="lu-readmore">
            <span>복리는 왜 대부분 체감되지 않을까</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <div className="lu-actions">
            <button className="lu-btn lu-share" onClick={share}>
              {copied ? "복사 완료! 붙여넣기 하세요" : "결과 공유하기"}
            </button>
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구들과 점수 비교해보세요 💸</p>
        </div>
      )}
    </div>
  );
}
