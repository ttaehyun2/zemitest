"use client";

import { useEffect, useState } from "react";

/**
 * 댓글 삭제 관리 화면.
 *
 * 인증은 ADMIN_TOKEN 환경변수와 비교합니다. 토큰은 브라우저 세션에만
 * 잠시 보관되며 탭을 닫으면 사라집니다.
 */
export default function AdminComments() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("zt_admin");
    if (saved) {
      setToken(saved);
      load(saved);
    }
  }, []);

  async function load(t) {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/comments", { headers: { "x-admin-token": t } });
      if (res.status === 401) {
        setMsg("토큰이 맞지 않아요.");
        setAuthed(false);
        sessionStorage.removeItem("zt_admin");
        return;
      }
      const json = await res.json();
      if (json.enabled === false) {
        setMsg("저장소가 연결되지 않았어요. Upstash 설정을 먼저 해주세요.");
        setAuthed(true);
        setPages([]);
        return;
      }
      setPages(json.pages || []);
      setAuthed(true);
      sessionStorage.setItem("zt_admin", t);
    } catch (e) {
      setMsg("불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  }

  async function del(page, id) {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    const res = await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ page, id }),
    });
    if (res.ok) load(token);
    else setMsg("삭제 실패");
  }

  async function ban(h) {
    if (!confirm("이 작성자의 모든 댓글을 지우고 24시간 차단할까요?")) return;
    const res = await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ banHash: h }),
    });
    const json = await res.json();
    if (res.ok) {
      setMsg(`${json.removed}개 삭제하고 차단했어요.`);
      load(token);
    } else setMsg("차단 실패");
  }

  const total = pages.reduce((s, p) => s + p.items.length, 0);

  if (!authed) {
    return (
      <div className="doc">
        <p className="page-eyebrow">ADMIN</p>
        <h1 className="page-title">댓글 관리</h1>
        <p className="page-lead">관리자 토큰을 입력해주세요.</p>
        <div className="cmt-form">
          <input
            className="cmt-nick"
            type="password"
            placeholder="관리자 토큰"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(token)}
          />
          <div className="cmt-actions">
            <span />
            <button className="cmt-submit" onClick={() => load(token)}>
              {loading ? "확인 중..." : "확인"}
            </button>
          </div>
          {msg && <p className="cmt-error">{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="doc">
      <p className="page-eyebrow">ADMIN</p>
      <h1 className="page-title">댓글 관리</h1>
      <p className="page-lead">
        전체 {total}개 · {pages.length}개 페이지
        <button className="admin-reload" onClick={() => load(token)}>
          새로고침
        </button>
      </p>
      {msg && <p className="cmt-error">{msg}</p>}

      {pages.length === 0 && <p className="cmt-empty">아직 댓글이 없어요.</p>}

      {pages.map((p) => (
        <div key={p.page} className="admin-group">
          <h2 className="admin-page">
            {p.page} <span className="cmt-count">{p.items.length}</span>
          </h2>
          <ul className="cmt-list">
            {p.items.map((c) => (
              <li key={c.id} className="cmt-item">
                <div className="cmt-head">
                  <span className="cmt-author">{c.nick}</span>
                  <span className="cmt-time">
                    {new Date(c.at).toLocaleString("ko-KR")}
                  </span>
                </div>
                <p className="cmt-body">{c.text}</p>
                <div className="admin-btns">
                  <button className="admin-del" onClick={() => del(p.page, c.id)}>
                    삭제
                  </button>
                  <button className="admin-ban" onClick={() => ban(c.h)}>
                    작성자 차단
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
