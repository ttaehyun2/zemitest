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
import { TYPES, QUESTIONS, scoreToRanked } from "../lib/spendingTest";

export default function SpendingTest() {
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

  function restart() {
    setScores({}); setHistory([]); setStep(0); setScreen("intro");
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro
          emoji="🛍️"
          eyebrow="SPENDING TYPE"
          title={<>나는 돈을<br />어떻게 쓰는 사람일까?</>}
          sub={<>22개의 질문으로 알아보는 소비 성향.<br />8가지 유형 중 나는 어디에?</>}
          meta="22문항 · 결과 8종"
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

      {screen === "ready" && (
        <ReadyScreen
          emoji="🛍️"
          total={QUESTIONS.length}
          onShow={() => setScreen("result")}
          onBack={backFromReady}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-spending" className={`lu-result-card${cardToneClass(result.top.grad)}`}
               style={{ background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})` }}>
            <p className="lu-result-eyebrow">나의 소비 성향</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="info-box">
              <p className="info-title">🛒 나의 소비 습관</p>
              <p className="info-text">{result.top.habit}</p>
            </div>

            <div className="info-box">
              <p className="info-title">🚨 이럴 땐 점검</p>
              <p className="info-text">{result.top.warning}</p>
            </div>

            <div className="remedy-box">
              <p className="info-title">💡 나에게 맞는 관리법</p>
              <ol className="remedy-list">
                {result.top.tips.map((x, i) => <li key={i}>{x}</li>)}
              </ol>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">함께 나타나는 성향</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-match-row">
              <div className="lu-match">
                <p className="lu-match-label">균형을 맞춰줄 유형 ⚖️</p>
                <p className="lu-match-type">
                  {TYPES[result.top.best].emoji} {TYPES[result.top.best].name}
                </p>
              </div>
              <div className="lu-match">
                <p className="lu-match-label">일치도 ✨</p>
                <p className="lu-match-type">{result.top.pct}% 일치</p>
              </div>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <p className="disclaimer">
            이 테스트는 소비 습관을 돌아보기 위한 참고용이며, 재무 상담을
            대신하지 않습니다.
          </p>

          <Link href={`/tests/spending/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>8가지 소비 성향 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <ResultStats test="spending" type={result.top.key} typeName={result.top.name} />
          <CommentJump pageId="test-spending" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`나의 소비 성향은 「${result.top.emoji} ${result.top.name}」 ${result.top.pct}%\n"${result.top.tagline}"\n\n너는 어떤 소비 유형일까? 🛍️`}
              url="https://zemitest.com/tests/spending"
              title="소비 성향 테스트"
            />
            <SaveImageButton targetId="result-card-spending" filename="zemitest-spending" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>
          <p className="lu-mini lu-center">친구들과 소비 유형 비교해보세요 🛍️</p>

          <Comments pageId="test-spending" title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
