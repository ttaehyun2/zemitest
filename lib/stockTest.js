// 주식 생존력 테스트 — 22문항
//
// 수익률을 예측하지 않습니다. 대신 "버티는 능력"을 봅니다.
// 결과는 계좌 생존 기간 + 생존 확률 + 5가지 투자 심리 유형.
// 문항은 웃기게, 결과 설명은 쓸모 있게 썼습니다.
// 사기 판별 문항을 섞어 실제로 도움이 되도록 했습니다.

export const AREAS = {
  cool: { key: "cool", emoji: "🧊", label: "냉정함", desc: "물타기를 참는 힘" },
  study: { key: "study", emoji: "📊", label: "판단력", desc: "사기와 정보를 구분하는 힘" },
  rule: { key: "rule", emoji: "📏", label: "원칙", desc: "정한 걸 지키는 힘" },
  size: { key: "size", emoji: "⚖️", label: "분수", desc: "감당할 만큼만 하는 힘" },
};

export const TYPES = {
  hodl: { key: "hodl", emoji: "🧊", name: "존버형", desc: "안 팔면 손해가 아니라고 믿습니다. 실제로 그게 맞을 때도 있고, 회사가 사라질 때도 있습니다." },
  gambler: { key: "gambler", emoji: "🎰", name: "한방형", desc: "계좌가 롤러코스터입니다. 짜릿한 대신 오래 못 탑니다." },
  analyst: { key: "analyst", emoji: "📊", name: "분석형", desc: "사기 전에 찾아봅니다. 재미는 없지만 살아남습니다." },
  sheep: { key: "sheep", emoji: "🐑", name: "추종형", desc: "남이 사면 삽니다. 정보가 나에게 오는 순간은 대체로 늦은 시점입니다." },
  runner: { key: "runner", emoji: "🚪", name: "손절형", desc: "무서우면 바로 나옵니다. 크게 잃지도, 크게 벌지도 않습니다." },
};

export const QUESTIONS = [
  { area: "cool", q: "내가 산 주식이 하루 만에 -30%다. 나는?", a: [
    { t: "왜 떨어졌는지부터 찾아본다", p: 5, t2: "analyst" },
    { t: "손절한다", p: 3, t2: "runner" },
    { t: "물타기한다", p: 1, t2: "hodl" },
    { t: "앱을 지운다", p: 0, t2: "hodl" }]},

  { area: "study", q: "지인이 「이거 확실하다」며 종목을 알려준다.", a: [
    { t: "왜 확실한지 물어보고 직접 확인한다", p: 5, t2: "analyst" },
    { t: "소액만 넣어본다", p: 3, t2: "sheep" },
    { t: "그 사람 실적을 먼저 본다", p: 4, t2: "hodl" },
    { t: "일단 산다. 확실하다니까", p: 0, t2: "sheep" }]},

  { area: "study", q: "「원금 보장, 월 수익 10%」라는 제안을 받았다.", a: [
    { t: "사기다. 신고한다", p: 5, t2: "analyst" },
    { t: "말이 안 되니까 무시한다", p: 5, t2: "hodl" },
    { t: "일단 자세히 들어본다", p: 1, t2: "sheep" },
    { t: "조금만 넣어볼까 싶다", p: 0, t2: "gambler" }]},

  { area: "rule", q: "「10% 오르면 팔겠다」고 정했는데 12%가 됐다.", a: [
    { t: "정한 대로 판다", p: 5, t2: "runner" },
    { t: "절반만 판다", p: 4, t2: "runner" },
    { t: "더 오를 것 같아 놔둔다", p: 2, t2: "hodl" },
    { t: "오히려 더 산다", p: 0, t2: "gambler" }]},

  { area: "size", q: "투자에 쓰는 돈은?", a: [
    { t: "없어도 생활에 지장 없는 돈만", p: 5, t2: "hodl" },
    { t: "여유 자금 대부분", p: 3, t2: "hodl" },
    { t: "생활비까지 끌어다 쓴다", p: 1, t2: "gambler" },
    { t: "빚내서 한다", p: 0, t2: "gambler" }]},

  { area: "cool", q: "계좌를 하루에 몇 번 확인하나?", a: [
    { t: "한 달에 한두 번", p: 5, t2: "hodl" },
    { t: "하루 한 번", p: 4, t2: "analyst" },
    { t: "수시로 본다", p: 2, t2: "hodl" },
    { t: "화면을 안 끈다", p: 0, t2: "gambler" }]},

  { area: "study", q: "종목을 고르는 기준은?", a: [
    { t: "사업 내용과 실적을 본다", p: 5, t2: "analyst" },
    { t: "차트 모양을 본다", p: 2, t2: "sheep" },
    { t: "커뮤니티에서 많이 언급되는 것", p: 1, t2: "sheep" },
    { t: "이름이 멋있는 것", p: 0, t2: "gambler" }]},

  { area: "cool", q: "다 팔고 나왔는데 다음 날 급등했다.", a: [
    { t: "내 원칙대로 했으니 됐다", p: 5, t2: "runner" },
    { t: "아쉽지만 다음을 본다", p: 4, t2: "runner" },
    { t: "지금이라도 다시 산다", p: 1, t2: "sheep" },
    { t: "일주일 동안 잠이 안 온다", p: 1, t2: "runner" }]},

  { area: "rule", q: "손절선을 정해두는가?", a: [
    { t: "정하고 반드시 지킨다", p: 5, t2: "runner" },
    { t: "정하지만 가끔 어긴다", p: 3, t2: "runner" },
    { t: "정하긴 하는데 안 지킨다", p: 1, t2: "hodl" },
    { t: "손절이라는 말을 안 쓴다", p: 0, t2: "hodl" }]},

  { area: "size", q: "가진 돈을 몇 종목에 나누나?", a: [
    { t: "5개 이상으로 분산", p: 5, t2: "runner" },
    { t: "2~3개", p: 4, t2: "runner" },
    { t: "한 종목에 몰아넣는다", p: 1, t2: "gambler" },
    { t: "종목이라는 개념이 없다", p: 0, t2: "gambler" }]},

  { area: "study", q: "「이번엔 다르다」는 말을 들었을 때?", a: [
    { t: "그 말이 나오면 오히려 조심한다", p: 5, t2: "analyst" },
    { t: "근거를 확인한다", p: 4, t2: "analyst" },
    { t: "솔깃하다", p: 1, t2: "sheep" },
    { t: "이번엔 진짜 다른 것 같다", p: 0, t2: "gambler" }]},

  { area: "cool", q: "온 세상이 폭락 중이다. 뉴스마다 난리다.", a: [
    { t: "미리 정해둔 계획대로 한다", p: 5, t2: "runner" },
    { t: "아무것도 안 한다", p: 4, t2: "hodl" },
    { t: "무서워서 다 판다", p: 2, t2: "runner" },
    { t: "지금이 기회다 싶어 다 넣는다", p: 1, t2: "gambler" }]},

  { area: "rule", q: "수익이 나면 그 돈은?", a: [
    { t: "일부는 빼서 따로 둔다", p: 5, t2: "runner" },
    { t: "그대로 재투자한다", p: 3, t2: "hodl" },
    { t: "더 크게 베팅한다", p: 1, t2: "gambler" },
    { t: "그날 다 쓴다", p: 2, t2: "runner" }]},

  { area: "study", q: "리딩방에 초대받았다.", a: [
    { t: "바로 나온다", p: 5, t2: "analyst" },
    { t: "구경만 한다", p: 3, t2: "sheep" },
    { t: "무료면 들어본다", p: 1, t2: "sheep" },
    { t: "유료 결제한다", p: 0, t2: "gambler" }]},

  { area: "size", q: "주식 때문에 잠을 못 잔 적 있나?", a: [
    { t: "없다. 그럴 만큼 안 넣는다", p: 5, t2: "runner" },
    { t: "한두 번 있다", p: 3, t2: "hodl" },
    { t: "자주 있다", p: 1, t2: "gambler" },
    { t: "요즘 매일 그렇다", p: 0, t2: "gambler" }]},

  { area: "cool", q: "친구가 나보다 훨씬 많이 벌었다.", a: [
    { t: "축하하고 내 방식대로 간다", p: 5, t2: "analyst" },
    { t: "뭘 샀는지 물어본다", p: 3, t2: "sheep" },
    { t: "그거 따라 산다", p: 1, t2: "sheep" },
    { t: "더 위험한 걸 찾는다", p: 0, t2: "gambler" }]},

  { area: "study", q: "「상장 폐지」라는 말을 들으면?", a: [
    { t: "무슨 뜻인지 정확히 안다", p: 5, t2: "analyst" },
    { t: "대충 안다", p: 3, t2: "sheep" },
    { t: "들어본 적은 있다", p: 1, t2: "sheep" },
    { t: "처음 듣는다", p: 0, t2: "gambler" }]},

  { area: "rule", q: "투자를 시작한 이유는?", a: [
    { t: "장기적으로 자산을 늘리려고", p: 5, t2: "analyst" },
    { t: "예금 이자가 아쉬워서", p: 4, t2: "sheep" },
    { t: "남들이 다 벌었다니까", p: 1, t2: "sheep" },
    { t: "인생 한 방을 노리고", p: 0, t2: "gambler" }]},

  { area: "size", q: "-50%가 된 종목이 하나 있다.", a: [
    { t: "판단을 다시 하고 정리하거나 유지한다", p: 5, t2: "analyst" },
    { t: "본전 오면 팔겠다고 기다린다", p: 2, t2: "hodl" },
    { t: "쳐다보지 않는다", p: 1, t2: "hodl" },
    { t: "여기서 물타기로 살린다", p: 0, t2: "gambler" }]},

  { area: "cool", q: "수익률을 남에게 얼마나 말하나?", a: [
    { t: "말 안 한다", p: 5, t2: "analyst" },
    { t: "가까운 사람에게만", p: 4, t2: "sheep" },
    { t: "벌었을 때만 말한다", p: 2, t2: "sheep" },
    { t: "캡처해서 올린다", p: 1, t2: "gambler" }]},

  { area: "rule", q: "투자 공부에 쓰는 시간은?", a: [
    { t: "꾸준히 시간을 낸다", p: 5, t2: "analyst" },
    { t: "가끔 찾아본다", p: 3, t2: "sheep" },
    { t: "남 얘기 듣는 게 공부다", p: 1, t2: "sheep" },
    { t: "안 한다. 느낌으로 한다", p: 0, t2: "gambler" }]},

  { area: "size", q: "마지막. 지금 계좌가 반토막 나면 내 삶은?", a: [
    { t: "아무 문제 없다", p: 5, t2: "analyst" },
    { t: "속상하지만 괜찮다", p: 4, t2: "hodl" },
    { t: "생활이 많이 힘들어진다", p: 1, t2: "hodl" },
    { t: "끝난다", p: 0, t2: "gambler" }]},
];

export const MAX_SCORE = QUESTIONS.length * 5;
export const MAX_PER_AREA = (() => {
  const m = {};
  QUESTIONS.forEach((q) => (m[q.area] = (m[q.area] || 0) + 5));
  return m;
})();

/** 점수를 계좌 생존 기간(개월)으로 환산합니다. */
export function toMonths(score) {
  if (score >= 98) return 600; // 50년
  const m = Math.round(0.4 * Math.pow(10, score / 30));
  return Math.max(0, m);
}

/** 생존 기간을 읽기 좋게 표기 */
export function formatDuration(months) {
  if (months >= 600) return "평생";
  if (months >= 12) {
    const y = Math.floor(months / 12);
    const mm = months % 12;
    return mm ? `${y}년 ${mm}개월` : `${y}년`;
  }
  if (months >= 1) return `${months}개월`;
  return "3주";
}

/** 생존 확률(%) — 점수를 완만하게 환산 */
export function toSurvival(score) {
  const p = 100 / (1 + Math.exp(-(score - 52) / 13));
  return Math.max(2, Math.min(97, Math.round(p)));
}

export const LEVELS = [
  {
    min: 82, key: "master", emoji: "🏔️", name: "시장에 남는 사람",
    label: "이 정도면 안 죽습니다",
    grad: ["#5f67cc", "#2b2158"],
    desc: "감정보다 원칙이 앞서고, 감당할 만큼만 넣고, 사기를 즉시 알아봅니다. 큰돈을 빨리 벌지는 못하지만 시장에서 사라지지도 않습니다. 오래 살아남는 사람들의 공통점이 정확히 이겁니다.",
    tip: "지금 방식이 지루하다고 느껴질 때가 가장 위험한 순간입니다.",
  },
  {
    min: 66, key: "steady", emoji: "🧱", name: "버틸 만한 사람",
    label: "몇 년은 갑니다",
    grad: ["#4393d8", "#2f489c"],
    desc: "기본기는 있습니다. 대체로 침착하고 사기도 잘 걸러냅니다. 다만 한두 군데에서 원칙이 흔들려서, 큰 하락장을 한 번 만나면 시험에 들 겁니다.",
    tip: "가장 약한 영역 하나만 메우면 등급이 달라집니다.",
  },
  {
    min: 50, key: "average", emoji: "🎢", name: "롤러코스터 탑승자",
    label: "1~2년은 버팁니다",
    grad: ["#84fab0", "#4e8f2e"],
    desc: "오르면 신나고 떨어지면 잠이 안 옵니다. 대부분의 사람이 여기 있습니다. 크게 망하지는 않지만 계좌가 늘 흔들리고, 그 스트레스를 수익으로 보상받지는 못합니다.",
    tip: "금액을 줄이면 판단이 좋아집니다. 사실 이게 가장 효과가 큽니다.",
  },
  {
    min: 34, key: "risky", emoji: "🕳️", name: "위태로운 사람",
    label: "몇 달이 고비입니다",
    grad: ["#ffd76f", "#ff9a5c"],
    desc: "감으로 사고 감정으로 팝니다. 운이 좋으면 한 번 크게 벌 수도 있지만, 그 경험이 오히려 더 큰 손실로 이어지는 경우가 많습니다. 위험한 건 종목이 아니라 습관입니다.",
    tip: "손절선 하나만 정해서 지켜보세요. 그거 하나로 생존 기간이 두 배가 됩니다.",
  },
  {
    min: 18, key: "danger", emoji: "🚨", name: "지금 멈춰야 하는 사람",
    label: "몇 주가 위험합니다",
    grad: ["#ff6b6b", "#c9455e"],
    desc: "감당할 수 없는 금액을 넣고, 확인할 수 없는 정보로 결정하고 있습니다. 이건 투자가 아니라 도박에 가깝습니다. 지금 잠깐 멈추는 것이 가장 이득인 상태입니다.",
    tip: "잃어도 되는 금액이 아니라면 지금 규모를 먼저 줄이세요.",
  },
  {
    min: 0, key: "prey", emoji: "🎯", name: "사기꾼이 찾는 사람",
    label: "시작 전에 알아야 합니다",
    grad: ["#8f88a6", "#3c3548"],
    desc: "원금 보장에 고수익이라는 말을 의심하지 않고, 남이 알려준 정보를 확인 없이 따릅니다. 이 조합은 실제로 사기 피해자에게서 가장 흔하게 나타납니다. 시장에 들어가기 전에 이것부터 고쳐야 합니다.",
    tip: "수익이 높으면 위험도 높습니다. 예외는 없습니다. 이 한 줄만 기억하세요.",
  },
];

export function getLevel(score) {
  return LEVELS.find((l) => score >= l.min) || LEVELS[LEVELS.length - 1];
}

/** 응답에서 가장 많이 나온 투자 심리 유형 */
export function getType(picks) {
  const cnt = {};
  picks.forEach((idx, qi) => {
    const t = QUESTIONS[qi]?.a[idx]?.t2;
    if (t) cnt[t] = (cnt[t] || 0) + 1;
  });
  const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0];
  return top ? TYPES[top[0]] : TYPES.analyst;
}
