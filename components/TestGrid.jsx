"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * 테스트 목록. 기본 3개만 보여주고 나머지는 더보기로 펼칩니다.
 * 읽을거리와 마찬가지로, 숨긴 항목도 HTML 에는 남겨두고 CSS 로만 감춥니다.
 * (조건부 렌더링으로 빼면 검색엔진이 링크를 못 봅니다)
 */
export default function TestGrid({ tests, initial = 3 }) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(0, tests.length - initial);

  return (
    <>
      <div className="grid">
        {tests.map((t, i) => {
          const cls = `tile tile-card${!open && i >= initial ? " tile-hidden" : ""}`;
          const head = t.grad ? (
            <div
              className="tile-head"
              style={{ background: `linear-gradient(135deg, ${t.grad[0]}, ${t.grad[1]})` }}
            >
              <span className="tile-big-emoji">{t.emoji}</span>
            </div>
          ) : null;

          return t.ready ? (
            <Link key={t.slug} href={t.href} className={cls}>
              {head}
              <div className="tile-body">
                <h3 className="tile-title">{t.title}</h3>
                <p className="tile-desc">{t.desc}</p>
                <p className="tile-meta">{t.meta}</p>
              </div>
            </Link>
          ) : (
            <div key={t.slug} className={`${cls} soon`}>
              {head}
              <div className="tile-body">
                <h3 className="tile-title">{t.title}</h3>
                <p className="tile-desc">준비 중입니다.</p>
                <p className="tile-meta">COMING SOON</p>
              </div>
            </div>
          );
        })}
      </div>

      {hidden > 0 && (
        <button className="more-btn" onClick={() => setOpen(!open)}>
          {open ? "접기 ▲" : `더보기 (${hidden}개) ▼`}
        </button>
      )}
    </>
  );
}
