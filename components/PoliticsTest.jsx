"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import { Intro, QuestionCard } from "./QuizShell";
import { QUESTIONS, SCALE, MAX, classify } from "../lib/politicsTest";

// 2축 좌표 그래프
function Compass({ econPct, socPct }) {
  const size = 260;
  const pad = 26;
  const inner = size - pad * 2;
  const x = pad + (econPct / 100) * inner;
  const y = pad + ((100 - socPct) / 100) * inner; // 위쪽이 자유

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="compass" role="img"
         aria-label={`정치 성향 좌표. 경제 ${econPct}, 사회 ${socPct}`}>
      {/* 사분면 */}
      <rect x={pad} y={pad} width={inner / 2} height={inner / 2} fill="rgba(132,250,176,0.30)" />
      <rect x={pad + inner / 2} y={pad} width={inner / 2} height={inner / 2} fill="rgba(255,215,111,0.30)" />
      <rect x={pad} y={pad + inner / 2} width={inner / 2} height={inner / 2} fill="rgba(246,165,192,0.30)" />
      <rect x={pad + inner / 2} y={pad + inner / 2} width={inner / 2} height={inner / 2} fill="rgba(79,172,254,0.30)" />

      {/* 격자 */}
      {[0.25, 0.5, 0.75].map((f) => (
        <g key={f}>
          <line x1={pad + inner * f} y1={pad} x2={pad + inner * f} y2={pad + inner}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1={pad} y1={pad + inner * f} x2={pad + inner} y2={pad + inner * f}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </g>
      ))}

      {/* 중심축 */}
      <line x1={pad + inner / 2} y1={pad} x2={pad + inner / 2} y2={pad + inner}
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1={pad} y1={pad + inner / 2} x2={pad + inner} y2={pad + inner / 2}
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      <rect x={pad} y={pad} width={inner} height={inner} fill="none"
            stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" rx="4" />

      {/* 축 라벨 */}
      <text x={size / 2} y={14} textAnchor="middle" className="compass-label">자유</text>
      <text x={size / 2} y={size - 4} textAnchor="middle" className="compass-label">사회</text>
      <text x={8} y={size / 2} textAnchor="start" className="compass-label">진보</text>
      <text x={size - 8} y={size / 2} textAnchor="end" className="compass-label">보수</text>

      {/* 내 위치 */}
      <circle cx={x} cy={y} r="11" fill="rgba(255,255,255,0.35)" />
      <circle cx={x} cy={y} r="6" fill="#fff" stroke="#231343" strokeWidth="2" />
    </svg>
  );
}

export default function PoliticsTest() {
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const result = useMemo(() => {
    if (screen !== "result") return null;
    let econ = 0;
    let soc = 0;
    answers.forEach((v, i) => {
      const q = QUESTIONS[i];
      if (q.axis === "econ") econ += v * q.dir;
      else soc += v * q.dir;
    });
    // -MAX..+MAX → 0..100
    const econPct = Math.round(((econ + MAX.econ) / (2 * MAX.econ)) * 100);
    const socPct = Math.round(((soc + MAX.soc) / (2 * MAX.soc)) * 100);
    return {
      econPct,
      socPct,
      quad: classify(econPct, socPct),
      econLabel: econPct >= 50 ? "보수" : "진보",
      econVal: econPct >= 50 ? econPct : 100 - econPct,
      socLabel: socPct >= 50 ? "자유" : "사회",
      socVal: socPct >= 50 ? socPct : 100 - socPct,
    };
  }, [screen, answers]);

  function pick(i) {
    const v = SCALE[i].v;
    const next = [...answers.slice(0, step), v];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setScreen("result");
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setScreen("intro");
  }

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <Intro
          emoji="🗳️"
          eyebrow="POLITICAL COMPASS"
          title={<>나의 정치 성향은<br />어디쯤일까?</>}
          sub={<>진보↔보수, 자유↔사회.<br />두 개의 축으로 나의 좌표를 찍어봅니다.</>}
          meta="30문항 · 2축 좌표 · 결과 5종"
          onStart={() => setScreen("quiz")}
        />
      )}

      {screen === "quiz" && (
        <QuestionCard
          step={step}
          total={QUESTIONS.length}
          question={QUESTIONS[step].q}
          options={SCALE.map((s) => s.t)}
          onPick={pick}
          onBack={back}
        />
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div
            className="lu-result-card"
            style={{
              background: `linear-gradient(160deg, ${result.quad.grad[0]}, ${result.quad.grad[1]})`,
            }}
          >
            <p className="lu-result-eyebrow">나의 정치 성향 좌표</p>

            <Compass econPct={result.econPct} socPct={result.socPct} />

            <h2 className="lu-result-name">
              {result.quad.emoji} {result.quad.name}
            </h2>
            <p className="lu-result-tagline">&ldquo;{result.quad.tagline}&rdquo;</p>

            <div className="axis-row">
              <div className="axis-box">
                <p className="axis-label">경제적으로</p>
                <p className="axis-val">{result.econVal}%</p>
                <p className="axis-name">{result.econLabel}</p>
              </div>
              <div className="axis-box">
                <p className="axis-label">사회적으로</p>
                <p className="axis-val">{result.socVal}%</p>
                <p className="axis-name">{result.socLabel}</p>
              </div>
            </div>

            <p className="lu-result-desc">{result.quad.desc}</p>
            <p className="lu-watermark">zemitest.com</p>
          </div>

          <p className="disclaimer">
            이 테스트는 정치적 성향을 대략적으로 살펴보기 위한 것으로, 특정 정당이나
            입장을 지지하거나 권유하지 않습니다. 문항은 양쪽 방향이 비슷한 수로
            구성되어 있습니다.
          </p>

          <Link href={`/tests/politics/types#${result.quad.key}`} className="lu-readmore lu-readmore-main">
            <span>내 성향 자세히 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>


          <div className="lu-actions">
            <ShareButtons
              text={`나의 정치 성향은 「${result.quad.emoji} ${result.quad.name}」\n경제: ${result.econLabel} ${result.econVal}%\n사회: ${result.socLabel} ${result.socVal}%\n\n너의 좌표도 찍어봐 🗳️`}
              url="https://zemitest.com/tests/politics"
              title="정치 성향 좌표 테스트"
            />
            <button className="lu-btn lu-ghost" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="lu-mini lu-center">친구들과 좌표 비교해보세요 🗳️</p>
        </div>
      )}
    </div>
  );
}
