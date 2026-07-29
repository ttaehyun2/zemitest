"use client";

import { useEffect, useRef, useState } from "react";
import { getGrade, estimateTop } from "../lib/grade";

/**
 * 점수형 테스트의 결과 상단부.
 *
 * 상위 몇 %를 크게 보여주고, 등급은 옆에 작게 붙입니다.
 * 퍼센트는 고정 기준 분포(평균 58·표준편차 16)에 점수를 대입해 계산하므로
 * 참여자 수와 무관하게 첫날부터 일관되고, 1점 차이도 구분됩니다.
 *
 * 실제 참여자 데이터는 계속 모으고, 표본이 충분해지면 아래에 참고로 덧붙입니다.
 */
export default function ScoreResult({ test, score, unit = "점", label }) {
  const [stat, setStat] = useState(null);
  const sent = useRef(false);

  const grade = getGrade(score);
  const top = estimateTop(score);

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

  const size = 190;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  // 상위일수록 원이 가득 찹니다
  const filled = ((100 - top) / 100) * circ;

  return (
    <>
      <div className="grade-wrap">
        <svg viewBox={`0 0 ${size} ${size}`} className="grade-svg" role="img"
             aria-label={`상위 ${top}퍼센트, ${grade.g}등급`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                  stroke="rgba(0,0,0,0.2)" strokeWidth={stroke} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                  stroke={grade.color} strokeWidth={stroke} strokeLinecap="round"
                  strokeDasharray={`${filled} ${circ}`}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        </svg>

        <div className="grade-center">
          <span className="top-prefix">상위</span>
          <span className="top-num">{top}</span>
          <span className="top-unit">%</span>
        </div>
      </div>

      <p className="grade-line">
        <span className="grade-chip" style={{ background: grade.color }}>
          {grade.g}등급
        </span>
        <span className="grade-label">{grade.label}</span>
      </p>

      <p className="grade-sub">
        {label || "점수"} {score}
        {unit}
        {stat && stat.total >= 50 && (
          <> · 참여자 {stat.total.toLocaleString()}명 · 평균 {stat.average}{unit}</>
        )}
      </p>
    </>
  );
}
