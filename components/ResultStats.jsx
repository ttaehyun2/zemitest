"use client";

import { useEffect, useState, useRef } from "react";

/**
 * 결과 통계. 내 유형이 전체에서 몇 퍼센트인지 보여줍니다.
 *
 * 저장소(Upstash Redis)가 연결되지 않은 환경에서는 아무것도 표시하지 않고
 * 조용히 넘어갑니다. 즉 설정 전에도 사이트는 정상 동작합니다.
 */
export default function ResultStats({ test, type, typeName }) {
  const [data, setData] = useState(null);
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true; // 새로고침이 아닌 이상 1회만 기록

    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ test, type }),
        });
        const json = await res.json();
        if (alive && json.enabled) setData(json);
      } catch (e) {
        /* 통계는 부가 기능이므로 실패해도 조용히 넘어갑니다 */
      }
    })();
    return () => {
      alive = false;
    };
  }, [test, type]);

  if (!data || !data.total) return null;

  const mine = data.dist[type];
  if (!mine) return null;

  // 나보다 흔한 유형이 몇 개인지로 희귀도 판단
  const rarer = Object.values(data.dist).filter((d) => d.pct < mine.pct).length;
  const totalTypes = Object.keys(data.dist).length;
  const isRare = mine.pct > 0 && rarer <= Math.floor(totalTypes / 4);

  return (
    <div className="stats-box">
      <p className="stats-main">
        참여자 중 <strong>{mine.pct}%</strong>가 같은 결과를 받았어요
      </p>
      <p className="stats-sub">
        지금까지 {data.total.toLocaleString()}명 참여
        {isRare && " · 흔치 않은 유형이에요 ✨"}
      </p>
    </div>
  );
}
