"use client";

import { useEffect, useState } from "react";
import { MAX_LEN, MAX_NICK } from "../lib/commentFilter";

/**
 * 댓글 영역.
 * 저장소가 연결되지 않은 환경에서는 안내 문구만 보여주고 조용히 넘어갑니다.
 */
export default function Comments({ pageId, title = "댓글" }) {
  const [items, setItems] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [nick, setNick] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch(`/api/comments?page=${encodeURIComponent(pageId)}`);
      const json = await res.json();
      setEnabled(json.enabled !== false);
      setItems(json.items || []);
    } catch (e) {
      setEnabled(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  async function submit() {
    if (sending || !text.trim()) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pageId, nick, text }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "등록에 실패했어요.");
      } else {
        setText("");
        setItems((prev) => [json.item, ...prev]);
      }
    } catch (e) {
      setError("잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  }

  function when(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "방금";
    if (m < 60) return `${m}분 전`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}시간 전`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}일 전`;
    return new Date(ts).toLocaleDateString("ko-KR");
  }

  if (!enabled) return null;

  return (
    <section className="cmt-wrap">
      <div className="section-head">
        <h2>
          {title} {items.length > 0 && <span className="cmt-count">{items.length}</span>}
        </h2>
      </div>

      <div className="cmt-form">
        <input
          className="cmt-nick"
          placeholder="닉네임 (선택)"
          maxLength={MAX_NICK}
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
        <textarea
          className="cmt-text"
          placeholder="가볍게 한마디 남겨보세요"
          maxLength={MAX_LEN}
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="cmt-actions">
          <span className="cmt-len">
            {text.length} / {MAX_LEN}
          </span>
          <button className="cmt-submit" onClick={submit} disabled={sending || !text.trim()}>
            {sending ? "등록 중..." : "등록"}
          </button>
        </div>
        {error && <p className="cmt-error">{error}</p>}
        <p className="cmt-notice">
          연락처나 링크는 남길 수 없어요. 서로 기분 상하지 않게 부탁드려요.
        </p>
      </div>

      {loading ? (
        <p className="cmt-empty">불러오는 중...</p>
      ) : items.length === 0 ? (
        <p className="cmt-empty">아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
      ) : (
        <ul className="cmt-list">
          {items.map((c) => (
            <li key={c.id} className="cmt-item">
              <div className="cmt-head">
                <span className="cmt-author">{c.nick}</span>
                <span className="cmt-time">{when(c.at)}</span>
              </div>
              <p className="cmt-body">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
