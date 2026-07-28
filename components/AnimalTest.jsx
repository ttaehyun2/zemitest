"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import ResultStats from "./ResultStats";
import { Intro, QuestionCard, ReadyScreen, Bar } from "./QuizShell";
import { TYPES, QUESTIONS, scoreToRanked } from "../lib/animalTest";

export default function AnimalTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({});

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const ranked = scoreToRanked(scores);
    return { top: ranked[0], others: ranked.slice(1, 4) };
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
          emoji="🐾"
          eyebrow="ANIMAL TEST"
          title={<>나와 닮은 동물은<br />무엇일까?</>}
          sub={<>27개의 질문으로 찾는 나의 동물.<br />16가지 동물 중 나는 누구를 닮았을까요?</>}
          meta="27문항 · 결과 16종"
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
          emoji="🐾"
          total={QUESTIONS.length}
          onShow={() => setScreen("result")}
          onBack={backFromReady}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            id="result-card-animal"
            className="lu-result-card"
            style={{
              background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나와 닮은 동물</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="info-box">
              <p className="info-title">✨ 이 동물의 강점</p>
              <ul className="remedy-list">
                {result.top.strengths.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="info-box">
              <p className="info-title">⚠️ 주의할 점</p>
              <ul className="remedy-list">
                {result.top.cautions.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">나에게 섞여 있는 다른 동물</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-match-row">
              <div className="lu-match">
                <p className="lu-match-label">환상의 짝꿍 🤝</p>
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
              <span className="lu-tip-label">한마디</span>
              <span className="lu-tip-text">{result.top.tip}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/animal/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>16가지 동물 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <ResultStats test="animal" type={result.top.key} typeName={result.top.name} />

          <div className="lu-actions">
            <ShareButtons
              text={`나와 닮은 동물은 「${result.top.emoji} ${result.top.name}」 ${result.top.pct}%\n"${result.top.tagline}"\n\n너는 어떤 동물인지 알아봐 🐾`}
              url="https://zemitest.com/tests/animal"
              title="나와 닮은 동물 테스트"
            />
            <SaveImageButton targetId="result-card-animal" filename="zemitest-animal" />
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구는 어떤 동물인지도 확인해보세요 🐾</p>
        </div>
      )}
    </div>
  );
}
