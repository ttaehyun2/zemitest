"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import Comments from "./Comments";
import CommentJump from "./CommentJump";
import SaveImageButton from "./SaveImageButton";
import ResultStats from "./ResultStats";
import { Intro, QuestionCard, ReadyScreen, Bar } from "./QuizShell";
import { cardToneClass } from "../lib/contrast";
import { QUESTIONS, AREAS, MAX_PER_AREA, getGrade } from "../lib/moneyTest";

// 점수를 원형 게이지로 표시. 숫자는 정중앙에 배치됩니다.
function ScoreRing({ value }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;

  return (
    <div className="score-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} className="score-svg" role="img"
           aria-label={`경제력 점수 ${value}점`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke="rgba(0,0,0,0.18)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke="rgba(255,255,255,0.95)" strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${filled} ${circ}`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div className="score-center">
        <span className="score-num">{value}</span>
        <span className="score-unit">점</span>
      </div>
    </div>
  );
}

export default function MoneyTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cmtCount, setCmtCount] = useState(null);

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
    else setScreen("ready");
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function backFromReady() {
    setScreen("quiz");
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setScreen("intro");
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

      {screen === "ready" && (
        <ReadyScreen
          emoji="💰"
          total={QUESTIONS.length}
          onShow={() => setScreen("result")}
          onBack={backFromReady}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            id="result-card-money"
            className={`lu-result-card${cardToneClass(result.grade.grad)}`}
            style={{
              background: `linear-gradient(160deg, ${result.grade.grad[0]}, ${result.grade.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나의 경제력 점수</p>

            <ScoreRing value={result.totalPct} />
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

          <Link href={`/tests/money/types#${result.grade.grade}`} className="lu-readmore lu-readmore-main">
            <span>등급 설명과 영역별 안내 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>


          <ResultStats test="money" type={result.grade.grade} typeName={result.grade.name} />
          <CommentJump pageId="test-money" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`나의 경제력 점수는 ${result.totalPct}점 「${result.grade.emoji} ${result.grade.name}」\n제일 강한 영역: ${result.strong.label} ${result.strong.pct}%\n\n너의 경제력도 측정해봐 💰`}
              url="https://zemitest.com/tests/money"
              title="나의 경제력 테스트"
            />
            <SaveImageButton targetId="result-card-money" filename="zemitest-money" />
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구들과 점수 비교해보세요 💸</p>

          <Comments pageId="test-money" title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
