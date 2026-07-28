"use client";

/**
 * 결과 화면 상단에서 댓글 영역으로 바로 내려가는 버튼.
 * 댓글이 화면 맨 아래에 있어 그냥 두면 존재를 모르고 지나칩니다.
 */
export default function CommentJump({ pageId, count }) {
  // count 가 null 이면 댓글 기능이 꺼진 상태이므로 버튼도 숨깁니다
  if (count === null || count === undefined) return null;

  function go() {
    const el = document.getElementById(`comments-${pageId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const input = el.querySelector("textarea");
    if (input) setTimeout(() => input.focus({ preventScroll: true }), 500);
  }

  return (
    <button className="cmt-jump" onClick={go}>
      <span className="cmt-jump-icon">💬</span>
      <span className="cmt-jump-text">
        {count > 0 ? "다들 뭐 나왔는지 보기" : "첫 댓글 남기러 가기"}
      </span>
      {count > 0 && <span className="cmt-jump-badge">{count}</span>}
      <span className="cmt-jump-arrow">↓</span>
    </button>
  );
}
