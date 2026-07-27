"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import { Intro, QuestionCard, Bar } from "./QuizShell";
import { TYPES, QUESTIONS } from "../lib/loveTest";

export default function LoveTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({});

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    const ranked = Object.keys(TYPES)
      .map((k) => ({
        ...TYPES[k],
        raw: scores[k] || 0,
        pct: Math.round(((scores[k] || 0) / total) * 100),
      }))
      .sort((a, b) => b.raw - a.raw);
    return { top: ranked[0], ranked };
  }, [screen, scores]);

  function pick(i) {
    const optionScores = QUESTIONS[step].a[i].s;
    const next = { ...scores };
    Object.entries(optionScores).forEach(([k, v]) => {
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
    setScreen("intro");
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro
          emoji="💫"
          eyebrow="PERSONALITY TEST"
          title={<>나의 연애 세계관은<br />어떤 우주일까?</>}
          sub={<>20개의 질문으로 알아보는 나의 연애 유형.<br />6가지 세계관 중 당신은 어디에?</>}
          meta="20문항 · 결과 6종"
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
            <p className="lu-result-eyebrow">나의 연애 세계관</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="lu-bars">
              <p className="lu-bars-title">유형별 성향 분포</p>
              {result.ranked.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-match-row">
              <div className="lu-match">
                <p className="lu-match-label">환상의 케미 💚</p>
                <p className="lu-match-type">
                  {TYPES[result.top.best].emoji} {TYPES[result.top.best].name}
                </p>
              </div>
              <div className="lu-match">
                <p className="lu-match-label">위험한 상극 💔</p>
                <p className="lu-match-type">
                  {TYPES[result.top.worst].emoji} {TYPES[result.top.worst].name}
                </p>
              </div>
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">연애 꿀팁</span>
              <span className="lu-tip-text">{result.top.tip}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/love/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>내 유형 자세히 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <Link href={`/articles/${result.top.article}`} className="lu-readmore">
            <span>이 유형에 대해 더 알아보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <div className="lu-actions">
            <ShareButtons
              text={`나의 연애 세계관은 「${t.emoji} ${t.name}」 ${t.pct}%\n"${t.tagline}"\n\n너의 연애 세계관도 알아봐 👀`}
              url="https://zemitest.com/tests/love"
              title="연애 세계관 테스트"
            />
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구에게 공유하고 궁합도 맞춰보세요 💕</p>
        </div>
      )}
    </div>
  );
}
