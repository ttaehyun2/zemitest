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
        <p className="share-hint">
          카카오톡·인스타그램은 링크를 복사해서 붙여넣거나, 결과 화면을 캡처해서
          공유해주세요.
        </p>
      )}
    </div>
  );
}
