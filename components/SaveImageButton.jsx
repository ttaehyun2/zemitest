"use client";

import { useState } from "react";

/**
 * 결과 카드를 PNG 이미지로 저장합니다.
 *
 * 인스타그램은 웹에서 직접 공유하는 방법을 제공하지 않기 때문에,
 * 실질적으로 캡처가 유일한 공유 수단입니다. 이 버튼은 그 과정을 대신합니다.
 *
 * 주의: 웹폰트를 외부 CDN 에서 불러오는 경우 이미지에 폰트가 제대로 반영되지
 * 않을 수 있어, 캡처 직전에 폰트 로딩 완료를 기다립니다.
 */
export default function SaveImageButton({ targetId, filename = "zemitest-result" }) {
  const [state, setState] = useState("idle"); // idle | working | done | error

  async function save() {
    const node = document.getElementById(targetId);
    if (!node) {
      setState("error");
      return;
    }

    setState("working");
    try {
      // 폰트가 다 로딩된 뒤에 캡처해야 글자가 깨지지 않습니다
      if (document.fonts?.ready) await document.fonts.ready;

      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(node, {
        pixelRatio: 2, // 고해상도로 저장
        cacheBust: true,
        backgroundColor: "#322659",
        skipFonts: false,
      });

      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();

      setState("done");
      setTimeout(() => setState("idle"), 2500);
    } catch (e) {
      console.error("이미지 저장 실패:", e);
      setState("error");
      setTimeout(() => setState("idle"), 4000);
    }
  }

  const label = {
    idle: "결과 이미지로 저장",
    working: "만드는 중...",
    done: "저장 완료!",
    error: "저장 실패 — 화면 캡처를 이용해주세요",
  }[state];

  return (
    <button
      className="lu-btn lu-save"
      onClick={save}
      disabled={state === "working"}
    >
      {state === "idle" && <span className="save-icon">🖼️</span>}
      {label}
    </button>
  );
}
