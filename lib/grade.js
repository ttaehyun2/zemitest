// 점수 → 등급 변환
//
// 내신처럼 고정된 분포를 기준으로 1~9등급을 매깁니다.
// 참여자 수와 무관하게 첫날부터 일관된 결과가 나오고,
// "3명 중 1등" 같은 민망한 상황이 생기지 않습니다.
//
// 경계는 내신 등급 비율(상위 4/11/23/40/60/77/89/96%)을
// 평균 58점·표준편차 16점 분포에 대입해 계산했습니다.

export const GRADES = [
  { g: 1, min: 86, top: 4,  label: "최상위",   color: "#ffd76f" },
  { g: 2, min: 78, top: 11, label: "상위권",   color: "#ffc078" },
  { g: 3, min: 70, top: 23, label: "상위권",   color: "#ffa8a8" },
  { g: 4, min: 62, top: 40, label: "중상위",   color: "#e599f7" },
  { g: 5, min: 54, top: 60, label: "중위",     color: "#b197fc" },
  { g: 6, min: 46, top: 77, label: "중하위",   color: "#91a7ff" },
  { g: 7, min: 38, top: 89, label: "하위권",   color: "#74c0fc" },
  { g: 8, min: 30, top: 96, label: "하위권",   color: "#66d9e8" },
  { g: 9, min: 0,  top: 100, label: "최하위",  color: "#8f88a6" },
];

export function getGrade(score) {
  return GRADES.find((g) => score >= g.min) || GRADES[GRADES.length - 1];
}

// 기준 분포 (등급 경계를 계산할 때 쓴 것과 같은 값)
export const REF_MEAN = 58;
export const REF_SD = 16;

/** 표준정규분포 누적확률 */
function normalCdf(z) {
  // Abramowitz & Stegun 근사식
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let p =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

/**
 * 상위 몇 %인지 계산합니다.
 * 등급 구간으로 뭉뚱그리지 않고 점수 1점 차이도 반영되도록
 * 기준 분포에 그대로 대입합니다.
 */
export function estimateTop(score) {
  const z = (score - REF_MEAN) / REF_SD;
  const top = (1 - normalCdf(z)) * 100;
  if (top < 1) return Math.max(0.1, Math.round(top * 10) / 10); // 상위 0.3% 처럼 소수점까지
  return Math.max(1, Math.min(99, Math.round(top)));
}

/** 화면 표시용 문자열 */
export function formatTop(score) {
  const t = estimateTop(score);
  return t < 1 ? `상위 ${t}%` : `상위 ${t}%`;
}
