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
import { QUESTIONS, scoreToRanked } from "../lib/stressTest";

export default function StressTest() {
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
          emoji="🌿"
          eyebrow="STRESS TYPE TEST"
          title={<>나는 스트레스를<br />어떻게 받아내는 사람일까?</>}
          sub={<>스트레스의 크기가 아니라 반응 방식을 봅니다.<br />8가지 유형과 나에게 맞는 힐링 처방까지.</>}
          meta="24문항 · 결과 8종"
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
          emoji="🌿"
          total={QUESTIONS.length}
          onShow={() => setScreen("result")}
          onBack={backFromReady}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            id="result-card-stress"
            className={`lu-result-card${cardToneClass(result.top.grad)}`}
            style={{
              background: `linear-gradient(160deg, ${result.top.grad[0]}, ${result.top.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나의 스트레스 유형</p>
            <div className="lu-orb" style={{ boxShadow: `0 0 60px 10px ${result.top.glow}` }}>
              <span>{result.top.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.top.name}</h2>
            <p className="lu-result-bigpct">{result.top.pct}%</p>
            <p className="lu-result-tagline">&ldquo;{result.top.tagline}&rdquo;</p>
            <p className="lu-result-desc">{result.top.desc}</p>

            <div className="info-box">
              <p className="info-title">🔔 나의 스트레스 신호</p>
              <p className="info-text">{result.top.signal}</p>
            </div>

            <div className="info-box">
              <p className="info-title">⚠️ 빠지기 쉬운 함정</p>
              <p className="info-text">{result.top.trap}</p>
            </div>

            <div className="remedy-box">
              <p className="info-title">🌿 나를 위한 힐링 처방</p>
              <ol className="remedy-list">
                {result.top.remedies.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
              <p className="rest-tag">잘 맞는 휴식 · {result.top.rest}</p>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">함께 나타나는 성향</p>
              {result.others.map((t) => (
                <Bar key={t.key} label={`${t.emoji} ${t.name}`} pct={t.pct} />
              ))}
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <p className="disclaimer">
            이 테스트는 스트레스에 대처하는 방식을 돌아보기 위한 참고용이며,
            심리 상태를 진단하지 않습니다. 힘든 상태가 오래 이어진다면 주변
            사람이나 전문가에게 이야기해보시길 권합니다.
          </p>

          <Link href={`/tests/stress/types#${result.top.key}`} className="lu-readmore lu-readmore-main">
            <span>내 유형과 처방 자세히 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>


          <ResultStats test="stress" type={result.top.key} typeName={result.top.name} />
          <CommentJump pageId="test-stress" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`나의 스트레스 유형은 「${result.top.emoji} ${result.top.name}」 ${result.top.pct}%\n"${result.top.tagline}"\n\n너는 어떤 유형인지 알아봐 🌿`}
              url="https://zemitest.com/tests/stress"
              title="스트레스 유형 테스트"
            />
            <SaveImageButton targetId="result-card-stress" filename="zemitest-stress" />
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구는 어떤 유형인지도 확인해보세요 🌿</p>

          <Comments pageId="test-stress" title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
