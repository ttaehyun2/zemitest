"use client";

import { useState } from "react";
import Link from "next/link";

// 처음엔 3개만 보여주고 나머지는 더보기로 펼칩니다.
// 검색엔진이 모든 글 링크를 읽을 수 있도록, 숨긴 항목도 HTML에는 그대로 두고
// CSS 로만 감춥니다. (조건부 렌더링으로 빼버리면 크롤러가 링크를 못 봅니다)
export default function ArticleList({ articles, initial = 3 }) {
  const [open, setOpen] = useState(false);
  const hiddenCount = Math.max(0, articles.length - initial);

  return (
    <>
      <div className="grid">
        {articles.map((a, i) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className={`tile${!open && i >= initial ? " tile-hidden" : ""}`}
          >
            <h3 className="tile-title">{a.title}</h3>
            <p className="tile-desc">{a.excerpt}</p>
            <p className="tile-meta">
              {a.date} · {a.readMin}분 읽기
            </p>
          </Link>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button className="more-btn" onClick={() => setOpen(!open)}>
          {open ? "접기 ▲" : `더보기 (${hiddenCount}편) ▼`}
        </button>
      )}
    </>
  );
}
