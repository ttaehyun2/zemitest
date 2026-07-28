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
import { QUESTIONS, scoreToRanked, tally } from "../lib/moralTest";

export default function MoralTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({});
  const [picks, setPicks] = useState([]);
  const [cmtCount, setCmtCount] = useState(null);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const ranked = scoreToRanked(scores);
    return { top: ranked[0], others: ranked.slice(1, 4), count: tally(picks) };
  }, [screen, scores, picks]);

  function pick(i) {
    const gained = QUESTIONS[step].a[i].s;
    const next = { ...scores };
    Object.entries(gained).forEach(([k, v]) => (next[k] = (next[k] || 0) + v));
    setHistory([...history, scores]);
    setScores(next);
    setPicks([...picks.slice(0, step), i]);
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
  function restart() { setScores({}); setPicks([]); setHistory([]); setStep(0); setScreen("intro"); }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro emoji="⚖️" eyebrow="MORAL COMPASS"
          title={<>너라면<br />누구를 살릴래?</>}
          sub={<>기차, 침몰하는 배, 불타는 건물.<br />20번의 선택이 당신이 어떤 사람인지 말해줍니다.</>}
          meta="20문항 · 결과 6종"
          onStart={() => setScreen("quiz")} />
      )}

      {screen === "quiz" && (
        <QuestionCard step={step} total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={QUESTIONS[step].a.map((o) => o.t)}
          onPick={pick} onBack={back} />
      )}

      {screen === "ready" && (
        <ReadyScreen emoji="⚖️" total={QUESTIONS.length}
          onShow={() => setScreen("result")} onBack={backFromReady} />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-moral"
            className={`lu-result-card${cardToneClass(result.top.grad)}`}
            style={{ background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})` }}>
            <p className="lu-result-eyebrow">20번의 선택이 남긴 결과</p>

            <div className="toll-box">
              <div className="toll-item toll-saved">
                <span className="toll-num">{result.count.saved}</span>
                <span className="toll-label">명을 살렸고</span>
              </div>
              <div className="toll-divider" />
              <div className="toll-item toll-lost">
                <span className="toll-num">{result.count.lost}</span>
                <span className="toll-label">명을 잃었습니다</span>
              </div>
            </div>

            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <p className="era-tag">📖 철학적으로는 {result.top.school}에 가깝습니다</p>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="info-box">
              <p className="info-title">✨ 이 관점의 강점</p>
              <ul className="remedy-list">
                {result.top.strengths.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>
            <div className="info-box">
              <p className="info-title">⚠️ 놓치기 쉬운 것</p>
              <ul className="remedy-list">
                {result.top.cautions.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">함께 나타나는 관점</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">당신의 선택</span>
              <span className="lu-tip-text">{result.top.quote}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/moral/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>6가지 도덕관 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <ResultStats test="moral" type={result.top.key} typeName={result.top.name} />
          <CommentJump pageId="test-moral" count={cmtCount} />

          <p className="disclaimer">
            이 테스트는 윤리적 판단 성향을 살펴보기 위한 것으로, 어떤 답도 정답이나
            오답이 아닙니다.
          </p>

          <div className="lu-actions">
            <ShareButtons
              text={`나는 ${result.count.saved}명을 살리고 ${result.count.lost}명을 잃었다\n「${result.top.emoji} ${result.top.name}」\n\n너라면 누구를 살릴래? ⚖️`}
              url="https://zemitest.com/tests/moral" title="누구를 살릴래" />
            <SaveImageButton targetId="result-card-moral" filename="zemitest-moral" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>
          <p className="lu-mini lu-center">친구랑 답이 갈리는지 확인해보세요 ⚖️</p>

          <Comments pageId="test-moral" title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
