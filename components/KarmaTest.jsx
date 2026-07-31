"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import Comments from "./Comments";
import CommentJump from "./CommentJump";
import { Intro, QuestionCard, ReadyScreen } from "./QuizShell";
import { cardToneClass } from "../lib/contrast";
import {
  QUESTIONS, SINS, PLACES, judge, topSin, verdict,
} from "../lib/karmaTest";

export default function KarmaTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState([]);
  const [cmtCount, setCmtCount] = useState(null);
  const [stat, setStat] = useState(null);
  const sent = useRef(false);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    let good = 0, evil = 0;
    const sins = {};
    Object.keys(SINS).forEach((k) => (sins[k] = 0));
    picks.forEach((i, qi) => {
      const o = QUESTIONS[qi].a[i];
      good += o.good || 0;
      evil += o.evil || 0;
      if (o.sin) sins[o.sin] += o.evil || 0;
    });
    const j = judge(good, evil);
    const place = PLACES[j.place];
    const info = place.floors[j.floor];
    const sin = topSin(sins);
    return {
      good, evil, sins, sin,
      ...j, place, info,
      verdict: verdict(j.place, j.floor, sin, good, evil),
      // 저울 기울기 (0~100, 50이 균형)
      tilt: Math.round(j.ratio * 100),
    };
  }, [screen, picks]);

  useEffect(() => {
    if (!result || sent.current) return;
    sent.current = true;
    (async () => {
      try {
        const res = await fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            test: "karma",
            type: result.place.key === "limbo" ? "limbo" : `${result.place.key}${result.floor}`,
          }),
        });
        const json = await res.json();
        if (json.enabled) setStat(json);
      } catch (e) {
        /* 통계는 부가 기능 */
      }
    })();
  }, [result]);

  function pick(i) {
    const next = [...picks.slice(0, step), i];
    setPicks(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("ready");
  }
  function back() { if (step > 0) setStep(step - 1); }
  function restart() {
    setPicks([]); setStep(0); setScreen("intro"); setStat(null); sent.current = false;
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro emoji="⚖️" eyebrow="FINAL JUDGMENT"
          title={<>당신은 천국에 갈까<br />지옥에 갈까?</>}
          sub={<>엘리베이터, 거스름돈, 단톡방 흑역사.<br />24개의 일상으로 최후의 심판을 받아보세요.</>}
          meta="24문항 · 천국 9층 · 연옥 · 지옥 9층"
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
          onShow={() => setScreen("result")} onBack={() => setScreen("quiz")} />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-karma"
            className={`lu-result-card${cardToneClass(result.place.grad)}`}
            style={{ background: `linear-gradient(160deg, ${result.place.grad[0]}, ${result.place.grad[1]})` }}>
            <p className="lu-result-eyebrow">최후의 심판 결과</p>

            {/* 저울 */}
            <div className="scale">
              <div className="scale-side">
                <span className="scale-emoji">😇</span>
                <span className="scale-label">선행</span>
                <span className="scale-num good">{result.good}</span>
              </div>
              <div className="scale-mid">
                <div className="scale-beam">
                  <div className="scale-fill" style={{ width: `${result.tilt}%` }} />
                </div>
                <span className="scale-pivot">⚖️</span>
              </div>
              <div className="scale-side">
                <span className="scale-emoji">😈</span>
                <span className="scale-label">악행</span>
                <span className="scale-num evil">{result.evil}</span>
              </div>
            </div>

            <div className="verdict-place">
              <span className="verdict-emoji">{result.place.emoji}</span>
              <h2 className="verdict-title">{result.info.title}</h2>
            </div>

            <div className="verdict-box">
              <p className="verdict-label">⚖️ 판결문</p>
              <p className="verdict-text">{result.verdict}</p>
            </div>

            <p className="lu-result-desc">{result.info.desc}</p>

            {result.sin && (
              <div className="info-box">
                <p className="info-title">😈 주요 죄목</p>
                <p className="info-text">
                  {result.sin.emoji} <strong>{result.sin.label}</strong> — {result.sin.desc}
                </p>
              </div>
            )}

            {stat && stat.total >= 10000 && (
              <p className="lu-mini lu-center" style={{ marginTop: 12 }}>
                참여자 중 {stat.dist?.[result.place.key === "limbo" ? "limbo" : `${result.place.key}${result.floor}`]?.pct ?? 0}%가 같은 곳에 배정됐어요
              </p>
            )}

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/karma/types#${result.place.key}`} className="lu-readmore lu-readmore-main">
            <span>19단계 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <CommentJump pageId="test-karma" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`나 「${result.place.emoji} ${result.info.title}」 배정됐다\n선행 ${result.good} vs 악행 ${result.evil}${result.sin ? `\n주요 죄목: ${result.sin.label}` : ""}\n\n너는 어디 가는지 해봐 ⚖️`}
              url="https://zemitest.com/tests/karma" title="천국 지옥 인성 테스트" />
            <SaveImageButton targetId="result-card-karma" filename="zemitest-karma" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 심판받기</button>
          </div>
          <p className="lu-mini lu-center">친구는 몇 층인지도 확인해보세요 ⚖️</p>

          <Comments pageId="test-karma" title="다들 몇 층 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
