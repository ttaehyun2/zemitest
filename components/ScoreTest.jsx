"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import Comments from "./Comments";
import CommentJump from "./CommentJump";
import ScoreResult from "./ScoreResult";
import { Intro, QuestionCard, ReadyScreen, Bar } from "./QuizShell";
import { cardToneClass } from "../lib/contrast";

/**
 * 점수형 테스트 공용 엔진.
 * 눈치·인생난이도·무인도·사회생활·거짓말탐지 등이 이 컴포넌트를 함께 씁니다.
 *
 * config 로 문항·등급·문구만 바꿔 끼우면 새 테스트가 만들어집니다.
 */
export default function ScoreTest({ config }) {
  const {
    testKey, questions, maxScore, getLevel,
    emoji, eyebrow, title, sub, meta,
    scoreLabel = "점수", scoreUnit = "점",
    areas, maxPerArea,
    resultEyebrow, shareText, headline,
    disclaimer, footerNote,
  } = config;

  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cmtCount, setCmtCount] = useState(null);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const raw = answers.reduce((s, v) => s + v, 0);
    const score = Math.round((raw / maxScore) * 100);

    // 영역이 정의된 테스트는 영역별 점수도 계산합니다
    let areaScores = null;
    if (areas && maxPerArea) {
      const sums = {};
      Object.keys(areas).forEach((k) => (sums[k] = 0));
      answers.forEach((v, i) => {
        const a = questions[i].area;
        if (a in sums) sums[a] += v;
      });
      areaScores = Object.keys(areas)
        .map((k) => ({ ...areas[k], pct: Math.round((sums[k] / maxPerArea) * 100) }))
        .sort((a, b) => b.pct - a.pct);
    }
    return { score, level: getLevel(score), areaScores };
  }, [screen, answers, maxScore, getLevel]);

  function pick(i) {
    const next = [...answers.slice(0, step), questions[step].a[i].p];
    setAnswers(next);
    if (step + 1 < questions.length) setStep(step + 1);
    else setScreen("ready");
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }
  function backFromReady() {
    setScreen("quiz");
  }
  function restart() {
    setAnswers([]); setStep(0); setScreen("intro");
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro emoji={emoji} eyebrow={eyebrow} title={title} sub={sub}
               meta={meta} onStart={() => setScreen("quiz")} />
      )}

      {screen === "quiz" && (
        <QuestionCard
          step={step} total={questions.length}
          question={questions[step].q}
          options={questions[step].a.map((o) => o.t)}
          onPick={pick} onBack={back}
        />
      )}

      {screen === "ready" && (
        <ReadyScreen emoji={emoji} total={questions.length}
                     onShow={() => setScreen("result")} onBack={backFromReady} />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            id={`result-card-${testKey}`}
            className={`lu-result-card${cardToneClass(result.level.grad)}`}
            style={{
              background: `linear-gradient(160deg, ${result.level.grad[0]}, ${result.level.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">{resultEyebrow}</p>

            {headline ? (
              <div className="headline-box">
                <p className="headline-main">{headline(result)}</p>
              </div>
            ) : null}

            <ScoreResult test={testKey} score={result.score}
                         unit={scoreUnit} label={scoreLabel} />

            <h2 className="lu-result-name">
              {result.level.emoji} {result.level.name}
            </h2>
            {result.level.label && (
              <p className="lu-result-tagline">{result.level.label}</p>
            )}
            <p className="lu-result-desc">{result.level.desc}</p>

            {result.areaScores && (
              <div className="lu-bars">
                <p className="lu-bars-title">영역별 능력치</p>
                {result.areaScores.map((a) => (
                  <Bar key={a.key} label={`${a.emoji} ${a.label}`} pct={a.pct} sub={a.desc} />
                ))}
              </div>
            )}

            {result.level.tip && (
              <div className="lu-tip">
                <span className="lu-tip-label">한마디</span>
                <span className="lu-tip-text">{result.level.tip}</span>
              </div>
            )}

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href={`/tests/${testKey}/types#${result.level.key || result.level.name}`}
                className="lu-readmore lu-readmore-main">
            <span>전체 등급 설명 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <CommentJump pageId={`test-${testKey}`} count={cmtCount} />

          {disclaimer && <p className="disclaimer">{disclaimer}</p>}

          <div className="lu-actions">
            <ShareButtons
              text={shareText(result)}
              url={`https://zemitest.com/tests/${testKey}`}
              title={eyebrow}
            />
            <SaveImageButton targetId={`result-card-${testKey}`}
                             filename={`zemitest-${testKey}`} />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>

          {footerNote && <p className="lu-mini lu-center">{footerNote}</p>}

          <Comments pageId={`test-${testKey}`} title="다들 뭐 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
