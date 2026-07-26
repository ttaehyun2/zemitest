"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { TYPES, QUESTIONS } from "../lib/loveTest";

function Stars({ count = 50 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2,
      })),
    [count]
  );
  return (
    <div className="lu-stars" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="lu-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LoveTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    let best = "fire";
    let max = -1;
    Object.keys(TYPES).forEach((k) => {
      const v = scores[k] || 0;
      if (v > max) {
        max = v;
        best = k;
      }
    });
    return TYPES[best];
  }, [screen, scores]);

  function choose(optionScores) {
    const next = { ...scores };
    Object.entries(optionScores).forEach(([k, v]) => {
      next[k] = (next[k] || 0) + v;
    });
    setScores(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("result");
  }

  function restart() {
    setScores({});
    setStep(0);
    setCopied(false);
    setScreen("intro");
  }

  async function share() {
    const text = `나의 연애 세계관은 「${result.emoji} ${result.name}」\n"${result.tagline}"\n\n너의 연애 세계관도 알아봐 👀`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "연애 세계관 테스트", text });
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
      /* 클립보드 사용 불가 */
    }
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <div className="lu-card lu-intro">
          <div className="lu-orb-mini">💫</div>
          <p className="lu-eyebrow">PERSONALITY TEST</p>
          <h1 className="lu-title">
            나의 연애 세계관은
            <br />
            어떤 우주일까?
          </h1>
          <p className="lu-sub">
            10개의 질문으로 알아보는 나의 연애 유형.
            <br />
            6가지 세계관 중 당신은 어디에?
          </p>
          <button className="lu-btn" onClick={() => setScreen("quiz")}>
            테스트 시작하기
          </button>
          <p className="lu-mini">약 1분 소요 · 결과 6종</p>
        </div>
      )}

      {screen === "quiz" && (
        <div className="lu-card lu-quiz">
          <div className="lu-progress-top">
            <span>
              {step + 1} / {QUESTIONS.length}
            </span>
            <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="lu-progress-bar">
            <div
              className="lu-progress-fill"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h2 className="lu-question" key={step}>
            {QUESTIONS[step].q}
          </h2>

          <div className="lu-options">
            {QUESTIONS[step].a.map((opt, i) => (
              <button
                key={i}
                className="lu-option"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => choose(opt.s)}
              >
                {opt.t}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            className="lu-result-card"
            style={{
              background: `linear-gradient(160deg, ${result.grad[0]}, ${result.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나의 연애 세계관</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.glow}` }}>
              <span>{result.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.name}</h2>
            <p className="lu-result-tagline">&ldquo;{result.tagline}&rdquo;</p>
            <p className="lu-result-desc">{result.desc}</p>

            <div className="lu-match-row">
              <div className="lu-match">
                <p className="lu-match-label">환상의 케미 💚</p>
                <p className="lu-match-type">
                  {TYPES[result.best].emoji} {TYPES[result.best].name}
                </p>
              </div>
              <div className="lu-match">
                <p className="lu-match-label">위험한 상극 💔</p>
                <p className="lu-match-type">
                  {TYPES[result.worst].emoji} {TYPES[result.worst].name}
                </p>
              </div>
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">연애 꿀팁</span>
              <span className="lu-tip-text">{result.tip}</span>
            </div>

            <p className="lu-watermark">연애 세계관 테스트</p>
          </div>

          {/* 결과 → 글로 연결. 체류시간이 올라가고 글도 읽히는 구조. */}
          <Link href={`/articles/${result.article}`} className="lu-readmore">
            <span className="lu-readmore-label">이 유형에 대해 더 알아보기</span>
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
          <p className="lu-mini lu-center">친구에게 공유하고 궁합도 맞춰보세요 💕</p>
        </div>
      )}
    </div>
  );
}
