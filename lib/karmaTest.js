// 인성 테스트 — 최후의 심판 / 24문항
//
// 선행(good)과 악행(evil) 점수를 따로 쌓아 저울에 올립니다.
// 결과: 천국 1~9층 / 연옥 / 지옥 1~9층 (총 19단계)
//   - 천국은 1층이 가장 높은 곳, 지옥은 9층이 가장 깊은 곳입니다.
//   - 판결문과 대표 죄목이 함께 나옵니다.
//
// 종교 교리를 흉내내지 않고, 만화나 게임에 나오는 관용적인 저울·층수 설정으로만 다룹니다.

export const SINS = {
  petty: { key: "petty", emoji: "🚪", label: "소심한 악행", desc: "엘리베이터, 새치기, 못 본 척" },
  gossip: { key: "gossip", emoji: "🗣️", label: "뒷담화", desc: "남 얘기로 분위기 살리기" },
  greed: { key: "greed", emoji: "🪙", label: "얌체 짓", desc: "슬쩍 챙기고 모른 척" },
  lazy: { key: "lazy", emoji: "🛋️", label: "책임 회피", desc: "내 몫을 남에게 밀기" },
  cruel: { key: "cruel", emoji: "🔪", label: "무정함", desc: "약한 쪽을 그냥 두기" },
};

// good: 선행 점수 / evil: 악행 점수 / sin: 악행일 때 죄목
export const QUESTIONS = [
  {
    q: "엘리베이터 문이 닫히는데 누가 저 멀리서 뛰어온다.",
    a: [
      { t: "버튼 누르고 기다린다", good: 5, evil: 0 },
      { t: "문 잡아주려다 실패한다", good: 3, evil: 0 },
      { t: "닫히는 척 눈만 마주친다", good: 0, evil: 3, sin: "petty" },
      { t: "닫힘 버튼을 누른다", good: 0, evil: 5, sin: "petty" },
    ],
  },
  {
    q: "편의점에서 거스름돈을 5천 원 더 받았다. 이미 나왔다.",
    a: [
      { t: "다시 들어가서 돌려준다", good: 5, evil: 0 },
      { t: "다음에 갈 때 말한다", good: 3, evil: 0 },
      { t: "직원 실수니까 그냥 간다", good: 0, evil: 3, sin: "greed" },
      { t: "오늘 운이 좋다고 생각한다", good: 0, evil: 4, sin: "greed" },
    ],
  },
  {
    q: "단톡방에 친구 흑역사 사진이 올라왔다.",
    a: [
      { t: "지우라고 말린다", good: 5, evil: 0 },
      { t: "아무 반응 안 한다", good: 1, evil: 1, sin: "lazy" },
      { t: "조용히 저장한다", good: 0, evil: 3, sin: "gossip" },
      { t: "짤로 만들어 퍼뜨린다", good: 0, evil: 5, sin: "gossip" },
    ],
  },
  {
    q: "길에 지갑이 떨어져 있다. 주변에 CCTV도 사람도 없다.",
    a: [
      { t: "경찰서에 가져간다", good: 5, evil: 0 },
      { t: "신분증 보고 연락해준다", good: 5, evil: 0 },
      { t: "그냥 지나친다", good: 0, evil: 2, sin: "lazy" },
      { t: "현금만 빼고 놔둔다", good: 0, evil: 6, sin: "greed" },
    ],
  },
  {
    q: "조별 과제에서 나만 일하고 있다.",
    a: [
      { t: "다 하고 이름은 같이 올린다", good: 4, evil: 0 },
      { t: "역할을 다시 나누자고 말한다", good: 5, evil: 0 },
      { t: "다 하고 교수님께 조용히 알린다", good: 3, evil: 1 },
      { t: "나도 안 한다. 같이 망하자", good: 0, evil: 4, sin: "lazy" },
    ],
  },
  {
    q: "지하철에 노약자가 탔는데 내 자리가 마지막이다.",
    a: [
      { t: "바로 일어난다", good: 5, evil: 0 },
      { t: "자는 척한다", good: 0, evil: 4, sin: "cruel" },
      { t: "휴대폰만 본다", good: 0, evil: 3, sin: "cruel" },
      { t: "다른 사람이 양보하길 기다린다", good: 0, evil: 2, sin: "lazy" },
    ],
  },
  {
    q: "친구가 나에게만 비밀을 말했다.",
    a: [
      { t: "무덤까지 가져간다", good: 5, evil: 0 },
      { t: "아무한테도 안 말한다", good: 4, evil: 0 },
      { t: "딱 한 명에게만 말한다", good: 0, evil: 4, sin: "gossip" },
      { t: "재밌어서 여기저기 말한다", good: 0, evil: 6, sin: "gossip" },
    ],
  },
  {
    q: "줄이 길다. 앞에 아는 사람이 있다.",
    a: [
      { t: "인사만 하고 뒤로 간다", good: 4, evil: 0 },
      { t: "모른 척하고 줄 선다", good: 2, evil: 0 },
      { t: "잠깐 얘기하는 척 끼어든다", good: 0, evil: 4, sin: "petty" },
      { t: "당당하게 새치기한다", good: 0, evil: 5, sin: "petty" },
    ],
  },
  {
    q: "내가 실수해서 팀이 손해를 봤다. 아직 아무도 모른다.",
    a: [
      { t: "바로 밝히고 수습한다", good: 5, evil: 0 },
      { t: "조용히 혼자 고친다", good: 3, evil: 0 },
      { t: "가만히 있는다", good: 0, evil: 3, sin: "lazy" },
      { t: "다른 사람 탓으로 흘린다", good: 0, evil: 7, sin: "cruel" },
    ],
  },
  {
    q: "누가 길에서 넘어졌다. 사람이 많다.",
    a: [
      { t: "바로 달려가 일으킨다", good: 5, evil: 0 },
      { t: "괜찮은지 물어본다", good: 4, evil: 0 },
      { t: "누가 도와주는지 보고 판단한다", good: 1, evil: 1 },
      { t: "웃겨서 찍는다", good: 0, evil: 6, sin: "cruel" },
    ],
  },
  {
    q: "친구가 다이어트 중인데 케이크를 사왔다.",
    a: [
      { t: "같이 안 먹는다", good: 4, evil: 0 },
      { t: "친구 없을 때 먹는다", good: 2, evil: 1 },
      { t: "앞에서 맛있게 먹는다", good: 0, evil: 3, sin: "petty" },
      { t: "먹으라고 계속 권한다", good: 0, evil: 4, sin: "petty" },
    ],
  },
  {
    q: "무인 가게에서 계산이 안 됐는데 그냥 나갈 수 있다.",
    a: [
      { t: "다시 시도해서 결제한다", good: 5, evil: 0 },
      { t: "나중에 계좌로 보낸다", good: 4, evil: 0 },
      { t: "기계 잘못이라 생각한다", good: 0, evil: 4, sin: "greed" },
      { t: "빨리 나간다", good: 0, evil: 5, sin: "greed" },
    ],
  },
  {
    q: "친구 애인이 바람피우는 걸 봤다.",
    a: [
      { t: "친구에게 바로 말한다", good: 5, evil: 0 },
      { t: "당사자에게 먼저 경고한다", good: 4, evil: 0 },
      { t: "괜히 끼어들기 싫어 넘긴다", good: 0, evil: 3, sin: "lazy" },
      { t: "다른 친구들에게 먼저 말한다", good: 0, evil: 5, sin: "gossip" },
    ],
  },
  {
    q: "배달 음식이 하나 더 왔다.",
    a: [
      { t: "연락해서 알린다", good: 5, evil: 0 },
      { t: "다음에 갈 때 말한다", good: 3, evil: 0 },
      { t: "잘 먹었다고 생각한다", good: 0, evil: 2, sin: "greed" },
      { t: "또 오길 바란다", good: 0, evil: 3, sin: "greed" },
    ],
  },
  {
    q: "싫어하는 사람이 잘못됐다는 소식을 들었다.",
    a: [
      { t: "그래도 안타깝다", good: 4, evil: 0 },
      { t: "별 감정 없다", good: 2, evil: 0 },
      { t: "속으로 좀 통쾌하다", good: 0, evil: 2, sin: "cruel" },
      { t: "주변에 소문낸다", good: 0, evil: 5, sin: "gossip" },
    ],
  },
  {
    q: "주차 중에 옆 차를 살짝 긁었다. 아무도 못 봤다.",
    a: [
      { t: "연락처를 남긴다", good: 5, evil: 0 },
      { t: "기다려서 직접 말한다", good: 5, evil: 0 },
      { t: "티 안 나니 그냥 간다", good: 0, evil: 5, sin: "greed" },
      { t: "먼저 있던 흠집이라 생각한다", good: 0, evil: 4, sin: "greed" },
    ],
  },
  {
    q: "동생이나 후배가 내 물건을 망가뜨렸다.",
    a: [
      { t: "괜찮다고 하고 넘어간다", good: 4, evil: 0 },
      { t: "다음엔 조심하라고 말한다", good: 4, evil: 0 },
      { t: "며칠 동안 눈치 준다", good: 0, evil: 3, sin: "petty" },
      { t: "두 배로 갚게 한다", good: 0, evil: 4, sin: "cruel" },
    ],
  },
  {
    q: "친구가 힘들다고 새벽에 연락했다. 나는 졸리다.",
    a: [
      { t: "일어나서 들어준다", good: 5, evil: 0 },
      { t: "짧게 통화하고 내일 만나자 한다", good: 4, evil: 0 },
      { t: "아침에 답한다", good: 1, evil: 1, sin: "lazy" },
      { t: "읽고 무시한다", good: 0, evil: 4, sin: "cruel" },
    ],
  },
  {
    q: "식당에서 직원이 실수로 음료를 쏟았다.",
    a: [
      { t: "괜찮다고 하고 같이 치운다", good: 5, evil: 0 },
      { t: "괜찮다고만 한다", good: 4, evil: 0 },
      { t: "표정으로 불만을 표현한다", good: 0, evil: 3, sin: "cruel" },
      { t: "따지고 서비스를 요구한다", good: 0, evil: 4, sin: "greed" },
    ],
  },
  {
    q: "내가 아는 정보로 친구가 손해를 볼 수 있다. 말하면 내가 불편해진다.",
    a: [
      { t: "불편해도 말한다", good: 5, evil: 0 },
      { t: "돌려서 힌트를 준다", good: 3, evil: 0 },
      { t: "말 안 한다", good: 0, evil: 3, sin: "lazy" },
      { t: "나만 이득 보는 쪽으로 쓴다", good: 0, evil: 7, sin: "greed" },
    ],
  },
  {
    q: "길고양이가 다쳐 있다.",
    a: [
      { t: "구조 요청하거나 병원에 데려간다", good: 5, evil: 0 },
      { t: "사료와 물을 놔준다", good: 4, evil: 0 },
      { t: "안타깝지만 지나간다", good: 1, evil: 1 },
      { t: "관심 없다", good: 0, evil: 3, sin: "cruel" },
    ],
  },
  {
    q: "친구가 나보다 잘된 걸 알았을 때 첫 감정은?",
    a: [
      { t: "진심으로 기쁘다", good: 5, evil: 0 },
      { t: "부럽지만 축하한다", good: 3, evil: 0 },
      { t: "솔직히 배가 아프다", good: 0, evil: 2, sin: "petty" },
      { t: "깎아내릴 말을 찾는다", good: 0, evil: 5, sin: "gossip" },
    ],
  },
  {
    q: "익명이면 아무 말이나 할 수 있는 곳에서 나는?",
    a: [
      { t: "실명일 때와 똑같이 쓴다", good: 5, evil: 0 },
      { t: "그런 데는 안 간다", good: 4, evil: 0 },
      { t: "좀 더 세게 말한다", good: 0, evil: 3, sin: "gossip" },
      { t: "평소 못 할 말을 한다", good: 0, evil: 6, sin: "cruel" },
    ],
  },
  {
    q: "마지막. 아무도 안 볼 때의 나는 평소와 같은가?",
    a: [
      { t: "거의 똑같다", good: 5, evil: 0 },
      { t: "조금 느슨해진다", good: 3, evil: 1 },
      { t: "많이 다르다", good: 0, evil: 4, sin: "petty" },
      { t: "완전히 다른 사람이다", good: 0, evil: 6, sin: "cruel" },
    ],
  },
];

export const MAX_GOOD = QUESTIONS.reduce(
  (s, q) => s + Math.max(...q.a.map((o) => o.good || 0)), 0
);
export const MAX_EVIL = QUESTIONS.reduce(
  (s, q) => s + Math.max(...q.a.map((o) => o.evil || 0)), 0
);

/**
 * 저울 결과로 층을 정합니다.
 * ratio = 선행 / (선행 + 악행) 을 0~1 로 두고,
 *   0.62 초과 → 천국 (1~9층, 높을수록 위)
 *   0.44 ~ 0.62 → 연옥
 *   0.44 미만 → 지옥 (1~9층, 낮을수록 깊음)
 */
export function judge(good, evil) {
  const total = good + evil || 1;
  const ratio = good / total;

  // 무작위 응답의 비율 분포(중앙 0.51, 하위25% 0.44, 상위25% 0.59)를 기준으로
  // 연옥 구간을 좁게 잡고, 천국·지옥이 넓게 퍼지도록 배분했습니다.
  const LIMBO_LO = 0.49;
  const LIMBO_HI = 0.55;

  if (ratio > LIMBO_HI) {
    // 0.55 → 9층, 1.0 → 1층 (위로 갈수록 어려움)
    const t = (ratio - LIMBO_HI) / (1 - LIMBO_HI);
    // 상층일수록 도달하기 어렵게 곡선을 씌웁니다
    const curved = Math.pow(t, 0.75);
    const floor = Math.max(1, Math.min(9, 10 - Math.round(curved * 9)));
    return { place: "heaven", floor, ratio };
  }
  if (ratio >= LIMBO_LO) {
    return { place: "limbo", floor: null, ratio };
  }
  // 0.49 → 1층, 0 → 9층 (아래로 갈수록 깊음)
  const t = (LIMBO_LO - ratio) / LIMBO_LO;
  const curved = Math.pow(t, 0.75);
  const floor = Math.max(1, Math.min(9, 1 + Math.round(curved * 8)));
  return { place: "hell", floor, ratio };
}

export const PLACES = {
  heaven: {
    key: "heaven", emoji: "☁️", name: "천국",
    grad: ["#ffd76f", "#8fd3f4"],
    floors: {
      1: { title: "천국 1층 · 최상층", desc: "심판관이 서류를 두 번 확인했습니다. 이 결과는 실제로 거의 나오지 않습니다. 아무도 안 볼 때도 똑같이 행동했고, 손해를 보면서도 옳은 쪽을 택했습니다." },
      2: { title: "천국 2층", desc: "거의 흠이 없습니다. 아주 사소한 순간에만 잠깐 흔들렸고, 그마저도 곧 바로잡았습니다." },
      3: { title: "천국 3층", desc: "확실히 좋은 사람입니다. 몇 번 못 본 척한 일이 기록에 남았지만, 심판관이 웃으며 넘겼습니다." },
      4: { title: "천국 4층", desc: "선행이 분명히 많습니다. 다만 귀찮음에 밀려 넘긴 일들이 조금 있어 위층까지는 못 갔습니다." },
      5: { title: "천국 5층 · 중간층", desc: "합격입니다. 성인은 아니지만 나쁜 사람도 아닙니다. 이 정도면 대부분의 사람보다 낫습니다." },
      6: { title: "천국 6층", desc: "간신히 위층 명단에 들었습니다. 선행과 악행이 팽팽했는데 마지막에 선행이 이겼습니다." },
      7: { title: "천국 7층", desc: "턱걸이 통과입니다. 심판관이 서류를 몇 번 다시 봤습니다. 운이 좋았던 항목이 몇 개 있습니다." },
      8: { title: "천국 8층", desc: "거의 연옥이었습니다. 마지막 한 문항에서 갈렸습니다. 본인도 아마 알고 있을 겁니다." },
      9: { title: "천국 9층 · 최하층", desc: "천국에서 가장 낮은 자리입니다. 화장실 옆이라는 소문이 있습니다. 그래도 천국은 천국입니다." },
    },
  },
  limbo: {
    key: "limbo", emoji: "🚪", name: "연옥",
    grad: ["#b8c6db", "#7f8c9b"],
    floors: {
      null: { title: "연옥 · 재심 대기", desc: "선행과 악행이 거의 같습니다. 심판관이 판단을 미루고 서류를 옆으로 밀어뒀습니다. 대기실에서 번호표를 받고 앉아 있는 상태입니다. 사실 대부분의 인간이 여기 있습니다." },
    },
  },
  hell: {
    key: "hell", emoji: "🔥", name: "지옥",
    grad: ["#ff6b6b", "#8e0e00"],
    floors: {
      1: { title: "지옥 1층", desc: "간신히 떨어졌습니다. 큰 잘못은 없었지만 사소한 얌체 짓이 꾸준히 기록됐습니다. 항소하면 연옥까지는 갈 수도 있습니다." },
      2: { title: "지옥 2층", desc: "생활형 악행이 쌓였습니다. 하나하나는 작았는데 합치니 무게가 됐습니다." },
      3: { title: "지옥 3층", desc: "가장 흔한 층입니다. 특별히 악하진 않지만 편한 쪽을 자주 택했습니다. 엘리베이터 건이 반복적으로 확인됐습니다." },
      4: { title: "지옥 4층", desc: "남 얘기로 분위기를 살린 기록이 여러 건입니다. 재밌었던 만큼 누군가는 그날을 기억하고 있습니다." },
      5: { title: "지옥 5층 · 중간층", desc: "확실히 아래쪽입니다. 손해 볼 상황에서 늘 다른 사람이 손해 보는 쪽을 택했습니다." },
      6: { title: "지옥 6층", desc: "고의성이 보입니다. 몰라서 그런 게 아니라 알고도 그랬다는 기록이 여럿 있습니다." },
      7: { title: "지옥 7층", desc: "아무도 안 볼 때의 모습이 문제가 됐습니다. 심판관이 「이 사람은 두 사람 같다」고 적었습니다." },
      8: { title: "지옥 8층", desc: "약한 쪽을 그냥 두거나 이용한 기록이 확인됐습니다. 이 층부터는 항소가 받아들여지지 않습니다." },
      9: { title: "지옥 9층 · 최하층", desc: "가장 깊은 곳입니다. 이 결과가 나왔다면 문항을 일부러 최악으로 골랐거나, 정말로 그런 사람입니다. 심판관이 별도 서류함을 꺼냈습니다." },
    },
  },
};

/** 가장 많이 쌓인 죄목 */
export function topSin(counts) {
  const e = Object.entries(counts).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  return e.length ? SINS[e[0][0]] : null;
}

/** 판결문 */
export function verdict(place, floor, sin, good, evil) {
  const gap = good - evil;
  if (place === "heaven") {
    if (floor <= 3) return "피고의 행적에 특별한 흠이 없어 상층 배정을 명한다.";
    if (floor <= 6) return `피고는 대체로 선량하나 ${sin ? `${sin.label} 항목이 확인되어` : "몇 건의 태만이 확인되어"} 천국 ${floor}층에 배정한다.`;
    return `피고는 아슬아슬하게 통과하였다. ${sin ? `다만 ${sin.label}에 대한 반성이 필요하다.` : "다만 스스로 알고 있을 것이다."}`;
  }
  if (place === "limbo") {
    return "선행과 악행의 무게가 같아 판단을 보류한다. 대기실에서 번호표를 받으라.";
  }
  if (floor >= 7) return `피고는 ${sin ? `${sin.label}이 반복적·의도적으로 확인되어` : "중대한 사유로"} 지옥 ${floor}층에 배정한다. 항소는 받지 않는다.`;
  if (floor >= 4) return `피고는 ${sin ? `${sin.label}이 다수 확인되어` : "여러 사유로"} 지옥 ${floor}층에 배정한다.`;
  return `피고는 큰 죄는 없으나 ${sin ? `${sin.label}이 꾸준히 누적되어` : "습관적 태만으로"} 지옥 ${floor}층에 배정한다.`;
}
