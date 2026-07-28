"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import Comments from "./Comments";
import CommentJump from "./CommentJump";
import ResultStats from "./ResultStats";
import { Intro, QuestionCard, ReadyScreen, Bar } from "./QuizShell";
import { cardToneClass } from "../lib/contrast";
import { QUESTIONS, scoreToRanked } from "../lib/legacyTest";

export default function LegacyTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({});
  const [cmtCount, setCmtCount] = useState(null);

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
    else setScreen("ready");
  }
  function back() {
    if (!history.length) return;
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
  function restart() { setScores({}); setHistory([]); setStep(0); setScreen("intro"); }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro emoji="🕊️" eyebrow="YOUR LEGACY"
          title={<>죽기 직전<br />어떤 사람으로 기억될까?</>}
          sub={<>당신의 묘비에 새겨질 한 문장.<br />사람들은 당신을 어떻게 기억할까요?</>}
          meta="22문항 · 결과 8종"
          onStart={() => setScreen("quiz")} />
      )}

      {screen === "quiz" && (
        <QuestionCard step={step} total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={QUESTIONS[step].a.map((o) => o.t)}
          onPick={pick} onBack={back} />
      )}

      {screen === "ready" && (
        <ReadyScreen emoji="🕊️" total={QUESTIONS.length}
          onShow={() => setScreen("result")} onBack={backFromReady} />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-legacy"
            className={`lu-result-card${cardToneClass(result.top.grad)}`}
            style={{ background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})` }}>
            <p className="lu-result-eyebrow">당신의 묘비에는 이렇게 남습니다</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <div className="grave">
              <div className="grave-stone">
                <p className="grave-cross">✝</p>
                <p className="grave-text">{result.top.epitaph}</p>
                <p className="grave-line" />
                <p className="grave-name">{result.top.name}</p>
              </div>
              <div className="grave-ground" />
            </div>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="info-box">
              <p className="info-title">🎬 사람들이 기억할 장면</p>
              <p className="info-text">{result.top.scene}</p>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">함께 남을 모습</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">지금 해두면 좋을 것</span>
              <span className="lu-tip-text">{result.top.now}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/legacy/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>8가지 모습 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <ResultStats test="legacy" type={result.top.key} typeName={result.top.name} />
          <CommentJump pageId="test-legacy" count={cmtCount} />

          <p className="disclaimer">
            이 테스트는 삶에서 무엇을 중요하게 여기는지 돌아보기 위한 것입니다.
            어떤 결과도 더 낫거나 못하지 않습니다.
          </p>

          <div className="lu-actions">
            <ShareButtons
              text={`내 묘비에는 이렇게 새겨진대\n\n「${result.top.epitaph}」\n— ${result.top.emoji} ${result.top.name}\n\n너는 뭐라고 남을지 해봐 🕊️`}
              url="https://zemitest.com/tests/legacy" title="죽기 직전 기억될 나" />
            <SaveImageButton targetId="result-card-legacy" filename="zemitest-legacy" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>
          <p className="lu-mini lu-center">친구는 어떻게 기억될지도 확인해보세요 🕊️</p>

          <Comments pageId="test-legacy" title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
