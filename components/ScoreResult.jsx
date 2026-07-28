"use client";

import { useEffect, useState, useRef } from "react";

/**
 * 점수형 테스트의 결과 상단부.
 * 점수를 원형 게이지로 보여주고, 실제 참여자 데이터로 상위 몇 %인지 계산합니다.
 * 저장소가 없으면 등수 없이 점수만 표시합니다.
 */
export default function ScoreResult({ test, score, unit = "점", label }) {
  const [stat, setStat] = useState(null);
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    (async () => {
      try {
        const res = await fetch("/api/stats", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ test, score }),
        });
        const json = await res.json();
        if (json.enabled) setStat(json);
      } catch (e) {
        /* 통계는 부가 기능 */
      }
    })();
  }, [test, score]);

  const size = 176;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  return (
    <>
      <div className="score-wrap score-wrap-lg">
        <svg viewBox={`0 0 ${size} ${size}`} className="score-svg" role="img"
             aria-label={`${label || "점수"} ${score}점`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                  stroke="rgba(0,0,0,0.18)" strokeWidth={stroke} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                  stroke="rgba(255,255,255,0.95)" strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${filled} ${circ}`}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        </svg>
        <div className="score-center">
          <span className="score-num">{score}</span>
          <span className="score-unit">{unit}</span>
        </div>
      </div>

      {stat && stat.total >= 5 && (
        <div className="rank-badge">
          <span className="rank-top">상위 {stat.topPct}%</span>
          <span className="rank-sub">
            참여자 {stat.total.toLocaleString()}명 기준 · 평균 {stat.average}
            {unit}
          </span>
        </div>
      )}
      {stat && stat.total > 0 && stat.total < 5 && (
        <div className="rank-badge">
          <span className="rank-sub">
            아직 참여자가 적어 등수는 조금 뒤에 표시돼요 ({stat.total}명)
          </span>
        </div>
      )}
    </>
  );
}
