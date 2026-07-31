"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/**
 * 홈 상단 검색. 테스트가 스무 개를 넘으면서
 * 원하는 걸 바로 찾을 통로가 필요해졌습니다.
 */
export default function HomeSearch({ tests }) {
  const [q, setQ] = useState("");
  const ready = useMemo(() => tests.filter((t) => t.ready), [tests]);

  const hits = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return [];
    return ready
      .filter(
        (t) =>
          t.title.toLowerCase().includes(kw) ||
          t.desc.toLowerCase().includes(kw) ||
          t.slug.includes(kw)
      )
      .slice(0, 6);
  }, [ready, q]);

  return (
    <div className="home-search">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="search"
          placeholder="어떤 테스트 찾으세요? (연애, 인생, 눈치...)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button className="search-clear" onClick={() => setQ("")} aria-label="지우기">
            ✕
          </button>
        )}
      </div>

      {!q.trim() && (
        <div className="search-tags">
          <span className="search-tags-label">이런 걸 찾아보세요</span>
          {["연애", "인생", "눈치", "천국", "유튜버", "전생", "주식", "동물"].map((k) => (
            <button key={k} className="search-tag" onClick={() => setQ(k)}>
              {k}
            </button>
          ))}
        </div>
      )}

      {q.trim() && (
        <div className="search-results">
          {hits.length === 0 ? (
            <p className="search-none">찾는 테스트가 없어요.</p>
          ) : (
            hits.map((t) => (
              <Link key={t.slug} href={t.href} className="search-hit">
                <span className="search-hit-emoji">{t.emoji}</span>
                <span className="search-hit-body">
                  <span className="search-hit-title">{t.title}</span>
                  <span className="search-hit-meta">{t.meta}</span>
                </span>
                <span className="search-hit-arrow">→</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
