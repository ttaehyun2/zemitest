"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import ResultStats from "./ResultStats";
import { Intro, QuestionCard, Bar } from "./QuizShell";
import { QUESTIONS, scoreToRanked } from "../lib/careerTest";

export default function CareerTest() {
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
    Object.entries(gained).forEach(([k, v]) => (next[k] = (next[k] || 0) + v));
    setHistory([...history, scores]);
    setScores(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("result");
  }
  function back() {
    if (!history.length) return;
    setScores(history[history.length - 1]);
    setHistory(history.slice(0, -1));
    setStep(Math.max(0, step - 1));
  }
  function restart() {
    setScores({}); setHistory([]); setStep(0); setScreen("intro");
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro
          emoji="🧭"
          eyebrow="CAREER VALUES"
          title={<>나는 일에서<br />무엇을 원하는 사람일까?</>}
          sub={<>24개의 질문으로 알아보는 직업 가치관.<br />8가지 유형 중 나는 무엇을 우선할까요?</>}
          meta="24문항 · 결과 8종"
          onStart={() => setScreen("quiz")}
        />
      )}

      {screen === "quiz" && (
        <QuestionCard
          step={step} total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={QUESTIONS[step].a.map((o) => o.t)}
          onPick={pick} onBack={back}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-career" className="lu-result-card"
               style={{ background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})` }}>
            <p className="lu-result-eyebrow">나의 직업 가치관</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="info-box">
              <p className="info-title">✅ 잘 맞는 환경</p>
              <ul className="remedy-list">
                {result.top.fits.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>

            <div className="info-box">
              <p className="info-title">⚠️ 주의할 점</p>
              <ul className="remedy-list">
                {result.top.cautions.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">함께 중요하게 여기는 가치</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">기억할 것</span>
              <span className="lu-tip-text">{result.top.tip}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <p className="disclaimer">
            이 테스트는 일에 대한 가치관을 돌아보기 위한 참고용이며, 적성이나
            진로를 진단하지 않습니다.
          </p>

          <Link href={`/tests/career/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>8가지 직업 가치관 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <ResultStats test="career" type={result.top.key} typeName={result.top.name} />

          <div className="lu-actions">
            <ShareButtons
              text={`나의 직업 가치관은 「${result.top.emoji} ${result.top.name}」 ${result.top.pct}%\n"${result.top.tagline}"\n\n너는 일에서 뭘 중요하게 볼까? 🧭`}
              url="https://zemitest.com/tests/career"
              title="직업 가치관 테스트"
            />
            <SaveImageButton targetId="result-card-career" filename="zemitest-career" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>
          <p className="lu-mini lu-center">친구들과 가치관을 비교해보세요 🧭</p>
        </div>
      )}
    </div>
  );
}
