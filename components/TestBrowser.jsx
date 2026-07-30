"use client";

import { useState, useMemo } from "react";
import TestGrid from "./TestGrid";

/**
 * 전체 테스트 탐색기.
 * 테스트가 스무 개를 넘으면서 그냥 나열하는 것만으로는 찾기 어려워졌습니다.
 * 카테고리 탭과 검색을 붙여 원하는 테스트로 바로 갈 수 있게 합니다.
 */
export default function TestBrowser({ tests, categories }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const ready = tests.filter((t) => t.ready);

  const counts = useMemo(() => {
    const c = { all: ready.length };
    categories.forEach((x) => (c[x.key] = ready.filter((t) => t.category === x.key).length));
    return c;
  }, [ready, categories]);

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return ready.filter((t) => {
      if (cat !== "all" && t.category !== cat) return false;
      if (!kw) return true;
      return (
        t.title.toLowerCase().includes(kw) ||
        t.desc.toLowerCase().includes(kw) ||
        t.slug.includes(kw)
      );
    });
  }, [ready, cat, q]);

  const tabs = [{ key: "all", label: "전체" }, ...categories];

  return (
    <>
      <div className="browser-bar">
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab${cat === t.key ? " tab-on" : ""}`}
              onClick={() => setCat(t.key)}
            >
              {t.label}
              <span className="tab-count">{counts[t.key] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="search"
            placeholder="테스트 검색 (예: 연애, 인생, 눈치)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button className="search-clear" onClick={() => setQ("")} aria-label="검색어 지우기">
              ✕
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="browser-empty">
          찾는 테스트가 없어요. 다른 말로 검색해보세요.
        </p>
      ) : (
        <>
          <p className="browser-count">{filtered.length}개</p>
          {/* 필터링된 상태에서는 접지 않고 전부 보여줍니다 */}
          <TestGrid tests={filtered} initial={filtered.length} />
        </>
      )}
    </>
  );
}
