"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import { Intro, QuestionCard, Bar } from "./QuizShell";
import { TYPES, QUESTIONS, scoreToRanked } from "../lib/pastLifeTest";

export default function PastLifeTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({});
  const [copied, setCopied] = useState(false);

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
    else setScreen("result");
  }

  function back() {
    if (history.length === 0) return;
    setScores(history[history.length - 1]);
    setHistory(history.slice(0, -1));
    setStep(Math.max(0, step - 1));
  }

  function restart() {
    setScores({});
    setHistory([]);
    setStep(0);
    setCopied(false);
    setScreen("intro");
  }

  async function share() {
    const t = result.top;
    const text = `나의 전생은 「${t.emoji} ${t.name}」 (일치도 ${t.pct}%)\n"${t.tagline}"\n\n너의 전생도 알아봐 🔮\nzemitest.com`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "전생 테스트", text });
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
          emoji="🔮"
          eyebrow="PAST LIFE TEST"
          title={<>전생에 나는<br />무엇이었을까?</>}
          sub={<>28개의 질문으로 찾아가는 나의 전생.<br />12가지 인물 중 당신은 누구였을까요?</>}
          meta="28문항 · 약 3분 · 결과 12종"
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

          <Link href="/articles/why-past-life" className="lu-readmore">
            <span>사람들은 왜 전생 이야기에 끌릴까</span>
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
          <p className="lu-mini lu-center">친구의 전생과 인연이 맞는지 확인해보세요 🔮</p>
        </div>
      )}
    </div>
  );
}
