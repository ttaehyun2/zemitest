"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import ResultStats from "./ResultStats";
import { Intro, QuestionCard, ReadyScreen, Bar } from "./QuizShell";
import { TYPES, QUESTIONS, scoreToRanked } from "../lib/pastLifeTest";

export default function PastLifeTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({});

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const ranked = scoreToRanked(scores);
    return { top: ranked[0], ranked, others: ranked.slice(1, 5) };
  }, [screen, scores]);

  function pick(i) {
    const gained = QUESTIONS[step].a[i].s;
    const next = { ...scores };
    Object.entries(gained).forEach(([k, v]) => {
      next[k] = (next[k] || 0) + v;
    });
    setHistory([...history, scores]);
    setScores(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("ready");
  }

  function back() {
    if (history.length === 0) return;
    setScores(history[history.length - 1]);
    setHistory(history.slice(0, -1));
    setStep(Math.max(0, step - 1));
  }

  function backFromReady() {
    setScreen("quiz");
    if (history.length) {
      setScores(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  }

  function restart() {
    setScores({});
    setHistory([]);
    setStep(0);
    setScreen("intro");
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro
          emoji="🔮"
          eyebrow="PAST LIFE TEST"
          title={<>전생에 나는<br />무엇이었을까?</>}
          sub={<>28개의 질문으로 찾아가는 나의 전생.<br />12가지 인물 중 당신은 누구였을까요?</>}
          meta="28문항 · 결과 12종"
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
          emoji="🔮"
          total={QUESTIONS.length}
          onShow={() => setScreen("result")}
          onBack={backFromReady}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            id="result-card-pastlife"
            className="lu-result-card"
            style={{
              background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나의 전생은</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>

            <p className="era-tag">📍 {result.top.era}</p>

            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="lu-bars">
              <p className="lu-bars-title">그 다음으로 가까운 전생</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-match-row">
              <div className="lu-match">
                <p className="lu-match-label">전생의 인연 🤝</p>
                <p className="lu-match-type">
                  {TYPES[result.top.best].emoji} {TYPES[result.top.best].name}
                </p>
              </div>
              <div className="lu-match">
                <p className="lu-match-label">일치도 ✨</p>
                <p className="lu-match-type">{result.top.pct}% 일치</p>
              </div>
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">이번 생을 위한 조언</span>
              <span className="lu-tip-text">{result.top.advice}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/pastlife/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>내 전생 자세히 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>


          <ResultStats test="pastlife" type={result.top.key} typeName={result.top.name} />

          <div className="lu-actions">
            <ShareButtons
              text={`나의 전생은 「${result.top.emoji} ${result.top.name}」 (일치도 ${result.top.pct}%)\n"${result.top.tagline}"\n\n너의 전생도 알아봐 🔮`}
              url="https://zemitest.com/tests/pastlife"
              title="전생 테스트"
            />
            <SaveImageButton targetId="result-card-pastlife" filename="zemitest-pastlife" />
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구의 전생과 인연이 맞는지 확인해보세요 🔮</p>
        </div>
      )}
    </div>
  );
}
