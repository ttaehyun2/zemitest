"use client";

import { useEffect } from "react";
import Link from "next/link";

// 예상치 못한 오류가 나도 페이지 전체가 빈 화면이 되지 않도록 합니다.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("페이지 오류:", error);
  }, [error]);

  return (
    <div className="doc" style={{ textAlign: "center", paddingTop: 60 }}>
      <p style={{ fontSize: 48, margin: "0 0 16px" }}>😵</p>
      <h1 className="page-title">문제가 생겼어요</h1>
      <p className="page-lead">
        페이지를 불러오는 중에 오류가 발생했어요. 다시 시도해보시고, 계속 같은
        문제가 생기면 알려주세요.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="lu-btn" style={{ maxWidth: 200 }} onClick={reset}>
          다시 시도
        </button>
        <Link href="/" className="lu-btn lu-ghost" style={{ maxWidth: 200, textAlign: "center" }}>
          홈으로
        </Link>
      </div>
    </div>
  );
}
