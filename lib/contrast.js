// 배경 밝기에 따라 글자색을 자동으로 고릅니다.
// 밝은 그라데이션 위에 흰 글씨를 쓰면 대비가 크게 떨어져 읽기 어렵습니다.

const DARK = "#231343";
const LIGHT = "#ffffff";

function toRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance(hex) {
  const c = toRgb(hex)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** 그라데이션 두 색의 중간값을 기준으로 판단합니다. */
export function midColor(grad) {
  const [a, b] = grad.map(toRgb);
  return (
    "#" +
    [0, 1, 2]
      .map((i) => Math.round((a[i] + b[i]) / 2).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** 배경 위에서 대비가 더 좋은 글자색이 어두운 색이면 true */
export function needsDarkText(grad) {
  const mid = midColor(grad);
  return contrast(DARK, mid) > contrast(LIGHT, mid);
}

/** 카드에 붙일 클래스명 */
export function cardToneClass(grad) {
  return needsDarkText(grad) ? " on-light" : "";
}
