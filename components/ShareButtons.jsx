"use client";

import { useState } from "react";

/**
 * 결과 공유 버튼.
 *
 * navigator.share(네이티브 공유 시트)는 모바일에서만 대부분 지원되고
 * PC 브라우저에서는 거의 동작하지 않습니다. 그래서 PC에서는 각 서비스별
 * 공유 링크 버튼을 따로 보여줍니다.
 *
 * - X, 페이스북: 공식 공유 URL 로 새 창을 엽니다.
 * - 카카오톡: 공식 SDK 와 앱 키가 있어야 해서 기본은 링크 복사로 대체합니다.
 * - 인스타그램: 웹에서 직접 공유하는 방법을 제공하지 않습니다(캡처 공유가 일반적).
 */
export default function ShareButtons({ text, url = "https://zemitest.com", title = "제미테스트" }) {
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fullText = `${text}\n${url}`;

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch (e) {
        return true; // 사용자가 취소한 경우
      }
    }
    return false;
  }

  async function onMainClick() {
    const ok = await nativeShare();
    if (!ok) setShowAll(true); // PC 등 미지원 환경 → 개별 버튼 노출
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = fullText;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        /* 무시 */
      }
      document.body.removeChild(ta);
    }
  }

  function openWindow(href) {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=520");
  }

  const enc = encodeURIComponent;

  return (
    <div className="share-wrap">
      <button className="lu-btn lu-share" onClick={onMainClick}>
        결과 공유하기
      </button>

      {showAll && (
        <div className="share-grid">
          <button
            className="share-item share-x"
            onClick={() => openWindow(`https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`)}
          >
            <span className="share-icon">𝕏</span>
            <span>X</span>
          </button>

          <button
            className="share-item share-fb"
            onClick={() => openWindow(`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`)}
          >
            <span className="share-icon">f</span>
            <span>페이스북</span>
          </button>

          <button className="share-item share-copy" onClick={copyLink}>
            <span className="share-icon">🔗</span>
            <span>{copied ? "복사됨!" : "링크 복사"}</span>
          </button>
        </div>
      )}

      {showAll && (
        <div className="share-note">
          <p className="share-note-title">📱 인스타 · 틱톡에 올리려면</p>
          <p className="share-note-text">
            두 서비스는 웹에서 바로 올리는 기능을 제공하지 않아요. 아래
            <strong> 결과 이미지로 저장</strong> 버튼으로 이미지를 받은 뒤
            올려주세요. 휴대폰으로 접속하면 공유 버튼에서 바로 앱 선택이 뜹니다.
          </p>
          <p className="share-note-text">
            카카오톡은 링크를 복사해 붙여넣으면 미리보기가 뜹니다.
          </p>
        </div>
      )}
    </div>
  );
}
