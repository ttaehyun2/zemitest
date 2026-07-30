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
import {
  QUESTIONS, MAX_SCORE, MAX_PER_AREA, AREAS,
  getLevel, getType, toMonths, formatDuration, toSurvival,
} from "../lib/stockTest";

export default function StockTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState([]);
  const [cmtCount, setCmtCount] = useState(null);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    const raw = picks.reduce((s, i, qi) => s + QUESTIONS[qi].a[i].p, 0);
    const score = Math.round((raw / MAX_SCORE) * 100);

    // 영역별 점수
    const sums = {};
    Object.keys(AREAS).forEach((k) => (sums[k] = 0));
    picks.forEach((i, qi) => {
      const q = QUESTIONS[qi];
      sums[q.area] += q.a[i].p;
    });
    const areaScores = Object.keys(AREAS)
      .map((k) => ({ ...AREAS[k], pct: Math.round((sums[k] / MAX_PER_AREA[k]) * 100) }))
      .sort((a, b) => b.pct - a.pct);

    return {
      score,
      level: getLevel(score),
      type: getType(picks),
      months: toMonths(score),
      survival: toSurvival(score),
      areaScores,
    };
  }, [screen, picks]);

  function pick(i) {
    const next = [...picks.slice(0, step), i];
    setPicks(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("ready");
  }
  function back() { if (step > 0) setStep(step - 1); }
  function restart() { setPicks([]); setStep(0); setScreen("intro"); }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro emoji="📈" eyebrow="STOCK SURVIVAL"
          title={<>주식 시작하면<br />얼마나 버틸까?</>}
          sub={<>수익률은 아무도 모릅니다. 대신 버티는 능력을 봅니다.<br />22개 상황으로 계좌 생존 기간을 계산해드려요.</>}
          meta="22문항 · 생존 기간 · 생존 확률"
          onStart={() => setScreen("quiz")} />
      )}

      {screen === "quiz" && (
        <QuestionCard step={step} total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={QUESTIONS[step].a.map((o) => o.t)}
          onPick={pick} onBack={back} />
      )}

      {screen === "ready" && (
        <ReadyScreen emoji="📈" total={QUESTIONS.length}
          onShow={() => setScreen("result")} onBack={() => setScreen("quiz")} />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-stock"
            className={`lu-result-card${cardToneClass(result.level.grad)}`}
            style={{ background: `linear-gradient(160deg, ${result.level.grad[0]}, ${result.level.grad[1]})` }}>
            <p className="lu-result-eyebrow">당신의 계좌 예상 수명</p>

            <div className="headline-box">
              <p className="headline-main">{formatDuration(result.months)}</p>
            </div>

            {/* 생존 확률 */}
            <div className="survival-box">
              <div className="survival-head">
                <span>생존 확률</span>
                <span className="survival-num">{result.survival}%</span>
              </div>
              <div className="survival-track">
                <div className="survival-fill" style={{ width: `${result.survival}%` }} />
              </div>
            </div>

            <ScoreResult test="stock" score={result.score} label="생존력" />

            <h2 className="lu-result-name">
              {result.level.emoji} {result.level.name}
            </h2>
            <p className="lu-result-tagline">{result.level.label}</p>
            <p className="lu-result-desc">{result.level.desc}</p>

            <div className="extra-box">
              <p className="extra-label">나의 투자 심리 유형</p>
              <p className="extra-name">
                {result.type.emoji} {result.type.name}
              </p>
              <p className="extra-desc">{result.type.desc}</p>
            </div>

            <div className="lu-bars">
              <p className="lu-bars-title">영역별 점수</p>
              {result.areaScores.map((a) => (
                <Bar key={a.key} label={`${a.emoji} ${a.label}`} pct={a.pct} sub={a.desc} />
              ))}
            </div>

            <div className="lu-tip">
              <span className="lu-tip-label">한마디</span>
              <span className="lu-tip-text">{result.level.tip}</span>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <p className="disclaimer">
            이 테스트는 투자 심리를 가볍게 살펴보기 위한 것이며, 투자 권유나
            수익률 예측이 아닙니다. 실제 투자 판단은 스스로 하시고, 필요하면
            전문가와 상담하세요.
          </p>

          <Link href={`/tests/stock/types#${result.level.key}`} className="lu-readmore lu-readmore-main">
            <span>6단계 · 5가지 유형 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <CommentJump pageId="test-stock" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`내 계좌 예상 수명은 ${formatDuration(result.months)} (생존 확률 ${result.survival}%)\n「${result.level.emoji} ${result.level.name}」 · ${result.type.emoji} ${result.type.name}\n\n너는 얼마나 버티는지 해봐 📈`}
              url="https://zemitest.com/tests/stock" title="주식 생존력 테스트" />
            <SaveImageButton targetId="result-card-stock" filename="zemitest-stock" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 하기</button>
          </div>
          <p className="lu-mini lu-center">친구 계좌 수명도 확인해보세요 📈</p>

          <Comments pageId="test-stock" title="다들 얼마나 버틴대요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}
