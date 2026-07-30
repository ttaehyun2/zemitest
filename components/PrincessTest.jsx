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
import { QUESTIONS, MAX_SCORE, getLevel } from "../lib/princessTest";

export default function PrincessTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cmtCount, setCmtCount] = useState(null);
  const [stat, setStat] = useState(null);
  const sent = useRef(false);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const raw = answers.reduce((s, v) => s + v, 0);
    const score = Math.round((raw / MAX_SCORE) * 100);
    return { score, level: getLevel(score) };
  }, [screen, answers]);

  // 결과가 나오면 분포를 기록합니다 (양쪽 끝 비율을 보여주기 위해)
  useEffect(() => {
    if (!result || sent.current) return;
    sent.current = true;
    (async () => {
      try {
        const res = await fetch("/api/stats", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ test: "princess", score: result.score }),
        });
        const json = await res.json();
        if (json.enabled) setStat(json);
      } catch (e) {
        /* 통계는 부가 기능 */
      }
    })();
  }, [result]);

  function pick(i) {
    const next = [...answers.slice(0, step), QUESTIONS[step].a[i].p];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("ready");
  }
  function back() { if (step > 0) setStep(step - 1); }
  function restart() {
    setAnswers([]); setStep(0); setScreen("intro"); setStat(null); sent.current = false;
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro emoji="👑" eyebrow="PRINCESS TEST"
          title={<>나는 공주병일까<br />자존감이 낮은 걸까?</>}
          sub={<>20개의 질문으로 재는 자기애 지수.<br />공주병 말기부터 거울 앞에서 사과하는 사람까지.</>}
          meta="20문항 · 7단계 스펙트럼"
          onStart={() => setScreen("quiz")} />
      )}

      {screen === "quiz" && (
        <QuestionCard step={step} total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={QUESTIONS[step].a.map((o) => o.t)}
          onPick={pick} onBack={back} />
      )}

      {screen === "ready" && (
        <ReadyScreen emoji="👑" total={QUESTIONS.length}
          onShow={() => setScreen("result")} onBack={() => setScreen("quiz")} />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-princess"
            className={`lu-result-card${cardToneClass(result.level.grad)}`}
            style={{ background: `linear-gradient(160deg, ${result.level.grad[0]}, ${result.level.grad[1]})` }}>
            <p className="lu-result-eyebrow">나의 자기애 지수</p>

            <div className="lu-orb">
              <span>{result.level.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.level.name}</h2>
            <p className="lu-result-tagline">&ldquo;{result.level.tagline}&rdquo;</p>

            {/* 스펙트럼: 자기비하 ← → 공주병 */}
            <div className="spectrum">
              <div className="spectrum-bar">
                <div className="spectrum-zone-mid" />
                <div className="spectrum-pin" style={{ left: `${result.score}%` }}>
                  <span className="spectrum-pin-emoji">{result.level.emoji}</span>
                  <span className="spectrum-pin-num">{result.score}</span>
                </div>
              </div>
              <div className="spectrum-ends">
                <span>😔 자기비하</span>
                <span className="spectrum-mid-label">🙂 건강</span>
                <span>공주병 👑</span>
              </div>
            </div>

            <p className="lu-result-desc">{result.level.desc}</p>

            <div className="lu-tip">
              <span className="lu-tip-label">한마디</span>
              <span className="lu-tip-text">{result.level.tip}</span>
            </div>

            {stat && stat.total >= 50 && (
              <p className="lu-mini lu-center" style={{ marginTop: 14 }}>
                참여자 {stat.total.toLocaleString()}명 · 평균 {stat.average}점
              </p>
            )}

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/princess/types#${result.level.key}`} className="lu-readmore lu-readmore-main">
            <span>7단계 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <CommentJump pageId="test-princess" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`나 「${result.level.emoji} ${result.level.name}」 나왔다 (자기애 지수 ${result.score})\n"${result.level.tagline}"\n\n너는 어느 쪽인지 해봐 👑`}
              url="https://zemitest.com/tests/princess" title="공주병 테스트" />
            <SaveImageButton targetId="result-card-princess" filename="zemitest-princess" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>
          <p className="lu-mini lu-center">친구는 어느 쪽인지도 확인해보세요 👑</p>

          <Comments pageId="test-princess" title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
