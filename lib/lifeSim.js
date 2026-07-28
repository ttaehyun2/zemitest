// 인생 시뮬레이션
//
// 다른 테스트와 달리 "선택이 누적되는" 구조입니다.
//  - 6개 챕터를 지나며 스탯이 변합니다
//  - 일부 장면은 스탯이나 이전 선택(flag)에 따라서만 등장합니다
//  - 엔딩은 최종 스탯과 flag 조합으로 결정됩니다
// 같은 사람이 다시 해도 다른 인생이 나오도록 설계했습니다.

export const STATS = {
  money: { key: "money", emoji: "💰", label: "재력" },
  happy: { key: "happy", emoji: "😊", label: "행복" },
  skill: { key: "skill", emoji: "🧠", label: "실력" },
  social: { key: "social", emoji: "🤝", label: "인맥" },
  health: { key: "health", emoji: "💪", label: "건강" },
  fame: { key: "fame", emoji: "⭐", label: "명성" },
};

export const START = { money: 30, happy: 50, skill: 20, social: 30, health: 70, fame: 5 };

// cond(s, f) : s = 현재 스탯, f = 지금까지 얻은 flag 집합
export const CHAPTERS = [
  {
    key: "child", title: "유년기", age: "7세 — 13세", emoji: "🧒",
    scenes: [
      { id: "c1", text: "반에서 발표를 시켜준다. 손을 들면 주목받지만 망하면 놀림받는다.",
        choices: [
          { t: "손을 든다", e: { fame: 6, social: 5, happy: -3 }, r: "떨렸지만 해냈다. 애들이 이름을 외웠다." },
          { t: "조용히 있는다", e: { happy: 4, skill: 2 }, r: "편했다. 대신 아무도 나를 모른다." },
          { t: "친구를 대신 밀어 넣는다", e: { social: -6, fame: 3 }, r: "웃겼지만 그 친구는 아직 기억한다.", f: "jerk" },
          { t: "웃겨서 분위기를 바꾼다", e: { social: 8, happy: 5, skill: -2 }, r: "반 전체가 웃었다. 그날부터 인기가 생겼다." },
        ]},
      { id: "c2", text: "부모님이 학원을 하나 더 다니라고 한다.",
        choices: [
          { t: "다닌다", e: { skill: 10, happy: -8, health: -4 }, r: "실력은 늘었다. 대신 놀 시간이 사라졌다." },
          { t: "울면서 버틴다", e: { happy: 6, skill: -4, social: 3 }, r: "결국 안 다녔다. 대신 친구들과 놀았다." },
          { t: "다니는 척하고 빠진다", e: { happy: 5, skill: -6, social: 5 }, r: "들키기 전까지는 최고의 시절이었다.", f: "sly" },
          { t: "다니되 몰래 딴짓도 한다", e: { skill: 5, happy: 2, health: -2 }, r: "적당히 요령이 생겼다." },
        ]},
      { id: "c3", text: "친한 친구가 이사를 간다고 한다.",
        choices: [
          { t: "매일 연락하겠다고 약속한다", e: { social: 6, happy: 4 }, r: "몇 년은 지켰다. 그게 어디냐." },
          { t: "쿨하게 잘 가라고 한다", e: { happy: -4, skill: 3 }, r: "그날 밤 혼자 울었다." },
          { t: "이사 가지 말라고 붙잡는다", e: { happy: -6, social: 4 }, r: "소용없었지만 진심이었다." },
          { t: "이미 다른 친구를 찾는다", e: { social: 5, happy: 2 }, r: "관계는 원래 바뀌는 거라고 배웠다." },
        ]},
    ],
  },
  {
    key: "teen", title: "학창시절", age: "14세 — 19세", emoji: "🎒",
    scenes: [
      { id: "t1", text: "성적이 애매하다. 남은 1년을 어떻게 쓸지 정해야 한다.",
        choices: [
          { t: "죽어라 공부한다", e: { skill: 18, health: -10, happy: -8 }, r: "성적은 올랐다. 몸은 축났다.", f: "grind" },
          { t: "적당히 하고 하고 싶은 걸 한다", e: { skill: 6, happy: 10, social: 4 }, r: "성적은 그저 그랬지만 후회는 없었다." },
          { t: "공부는 접고 다른 길을 판다", e: { skill: 10, fame: 6, money: -5, happy: 5 }, r: "남들과 다른 길로 들어섰다.", f: "outsider" },
          { t: "아무것도 안 한다", e: { happy: 4, skill: -6, health: 4 }, r: "그 시간은 다시 오지 않았다." },
        ]},
      { id: "t2", text: "친구들이 위험한 짓을 하자고 한다. 안 가면 겁쟁이 소리를 듣는다.",
        choices: [
          { t: "따라간다", e: { social: 8, health: -8, happy: 5 }, r: "재밌었다. 크게 다칠 뻔했다.", f: "risky" },
          { t: "거절한다", e: { social: -6, skill: 4, happy: -3 }, r: "한동안 어색했다. 나중에 잘한 선택이었다." },
          { t: "말리다가 같이 욕먹는다", e: { social: -4, fame: 3, happy: -2 }, r: "아무도 고마워하지 않았다.", f: "brave" },
          { t: "가는 척하고 몰래 빠진다", e: { social: 2, happy: 2 }, r: "요령만 늘었다.", f: "sly" },
        ]},
      { id: "t3", text: "좋아하는 사람이 생겼다.",
        choices: [
          { t: "고백한다", e: { happy: 12, social: 5, skill: -4 }, r: "결과가 어떻든 그 순간은 선명하게 남았다.", f: "loved" },
          { t: "혼자 마음만 키운다", e: { happy: -5, skill: 5 }, r: "말 못 한 게 오래 남았다." },
          { t: "친구에게 대신 물어보게 한다", e: { social: -3, happy: 2 }, r: "소문만 났다." },
          { t: "공부에 집중한다", e: { skill: 10, happy: -6 }, r: "그때는 그게 맞다고 생각했다.", f: "grind" },
        ]},
      { id: "t4", text: "알바 자리가 생겼다. 시간은 뺏기지만 내 돈이 생긴다.",
        choices: [
          { t: "한다", e: { money: 12, skill: 5, health: -6, happy: 3 }, r: "처음 번 돈의 감각은 잊히지 않는다.", f: "worker" },
          { t: "안 한다", e: { skill: 4, health: 3 }, r: "대신 다른 걸 할 시간이 있었다." },
          { t: "짧게 해보고 그만둔다", e: { money: 4, skill: 3, happy: 2 }, r: "세상이 만만치 않다는 건 배웠다." },
          { t: "친구까지 끌어들여 같이 한다", e: { money: 9, social: 7, health: -5 }, r: "힘들었지만 그때 얘기를 아직도 한다." },
        ]},
    ],
  },
  {
    key: "twenties", title: "20대", age: "20세 — 29세", emoji: "🔥",
    scenes: [
      { id: "w1", text: "진로를 정해야 한다. 각자 대가가 다르다.",
        choices: [
          { t: "안정적인 길을 간다", e: { money: 15, health: 5, happy: -4, fame: 2 }, r: "부모님이 웃었다. 나는 조금 답답했다.", f: "safe" },
          { t: "하고 싶은 일에 뛰어든다", e: { happy: 14, money: -10, skill: 10, fame: 5 }, r: "통장은 비었지만 눈은 살아 있었다.", f: "passion" },
          { t: "돈이 되는 쪽으로 간다", e: { money: 22, happy: -8, health: -6 }, r: "빨리 벌었다. 대신 뭘 위해 버는지는 미뤄뒀다.", f: "greedy" },
          { t: "일단 아무거나 한다", e: { money: 6, skill: 4, happy: -2 }, r: "시간이 흐른 뒤에야 방향을 찾았다." },
        ]},
      { id: "w2", text: "친구가 사업을 같이 하자고 한다. 될 것도 같고 망할 것도 같다.",
        cond: (s) => s.money >= 20,
        choices: [
          { t: "전 재산을 넣는다", e: { money: -25, skill: 15, fame: 12, health: -10 }, r: "인생을 걸었다.", f: "founder" },
          { t: "일부만 넣는다", e: { money: -8, skill: 8, social: 5 }, r: "잃어도 죽지 않을 만큼만 걸었다." },
          { t: "거절한다", e: { money: 5, social: -5 }, r: "친구와는 멀어졌다. 돈은 지켰다." },
          { t: "투자 대신 도와만 준다", e: { social: 10, skill: 5 }, r: "사람은 남았다." },
        ]},
      { id: "w3", text: "몸에서 신호가 온다. 병원에 가라는 말을 들었다.",
        cond: (s) => s.health <= 60,
        choices: [
          { t: "바로 간다", e: { health: 14, money: -6 }, r: "일찍 잡아서 다행이었다." },
          { t: "바빠서 미룬다", e: { health: -14, money: 6, skill: 4 }, r: "그때 갔어야 했다.", f: "ignoredbody" },
          { t: "운동을 시작한다", e: { health: 10, happy: 5, money: -3 }, r: "몸이 달라지자 다른 것도 달라졌다." },
          { t: "무시하고 더 몰아붙인다", e: { health: -18, money: 12, skill: 8 }, r: "성과는 냈다. 대가는 나중에 왔다.", f: "ignoredbody" },
        ]},
      { id: "w4", text: "누군가 사랑에 빠질 만한 사람을 만났다. 다만 지금 하는 일과 양립하기 어렵다.",
        choices: [
          { t: "사랑을 택한다", e: { happy: 18, social: 10, money: -8, skill: -5 }, r: "후회한 적은 없다.", f: "loved" },
          { t: "일을 택한다", e: { money: 12, skill: 10, happy: -12 }, r: "가끔 그 사람이 떠오른다.", f: "chosework" },
          { t: "둘 다 잡으려 한다", e: { happy: 4, health: -10, money: 4 }, r: "둘 다 어중간해졌다." },
          { t: "결정을 미룬다", e: { happy: -6, social: -4 }, r: "상대가 먼저 떠났다." },
        ]},
      { id: "w5", text: "빠르게 큰돈을 벌 수 있다는 제안이 왔다. 합법인지는 애매하다.",
        choices: [
          { t: "한다", e: { money: 30, fame: -10, happy: -8, health: -5 }, r: "돈은 들어왔다. 밤에 잠이 잘 안 왔다.", f: "dirty" },
          { t: "거절한다", e: { happy: 6, fame: 4 }, r: "가난했지만 떳떳했다." },
          { t: "알아보다가 발을 뺀다", e: { skill: 6, money: -3 }, r: "세상 돌아가는 걸 알게 됐다." },
          { t: "신고한다", e: { fame: 12, social: -12, happy: 4 }, r: "옳은 일이었지만 편은 줄었다.", f: "brave" },
        ]},
    ],
  },
  {
    key: "thirties", title: "30대", age: "30세 — 39세", emoji: "💼",
    scenes: [
      { id: "h1", text: "지금까지 쌓아온 걸 걸고 크게 도약할 기회가 왔다.",
        cond: (s) => s.skill >= 40 || s.fame >= 25,
        choices: [
          { t: "전부 건다", e: { money: 28, fame: 20, health: -12, happy: -5 }, r: "이름이 알려지기 시작했다.", f: "bigshot" },
          { t: "안전하게 간다", e: { money: 10, happy: 5, health: 4 }, r: "크게 오르진 않았지만 무너지지도 않았다." },
          { t: "동료와 나눠 간다", e: { money: 14, social: 14, fame: 8 }, r: "혼자였으면 못 했을 일이었다." },
          { t: "이 기회를 남에게 넘긴다", e: { social: 12, happy: 6, money: -4 }, r: "그 사람은 아직도 고마워한다." },
        ]},
      { id: "h2", text: "가정을 꾸릴지 결정할 시점이다.",
        choices: [
          { t: "가정을 꾸린다", e: { happy: 16, social: 12, money: -14, health: -4 }, r: "돈은 줄었고 이유는 늘었다.", f: "family" },
          { t: "혼자 살기로 한다", e: { money: 12, happy: 4, social: -8 }, r: "자유로웠다. 가끔 조용했다.", f: "solo" },
          { t: "아직 미룬다", e: { money: 6, skill: 6, happy: -2 }, r: "언젠가라는 말을 오래 썼다." },
          { t: "일에 모든 걸 쏟는다", e: { money: 18, skill: 12, happy: -12, health: -8 }, r: "성공했다는 말은 들었다.", f: "chosework" },
        ]},
      { id: "h3", text: "돈이 좀 모였다. 어디에 쓸지 정해야 한다.",
        cond: (s) => s.money >= 45,
        choices: [
          { t: "위험하지만 크게 불릴 곳에 넣는다", e: { money: 24, health: -6, happy: -4 }, r: "운이 따라줬다.", f: "gambler" },
          { t: "안전하게 굴린다", e: { money: 12, happy: 4 }, r: "천천히, 확실하게 늘었다." },
          { t: "나를 위해 쓴다", e: { happy: 16, health: 8, money: -14 }, r: "그때 산 기억은 아직 남아 있다." },
          { t: "필요한 사람에게 나눈다", e: { social: 16, fame: 10, money: -16, happy: 10 }, r: "돈은 줄었는데 이상하게 든든했다.", f: "giver" },
        ]},
      { id: "h4", text: "믿었던 사람에게 크게 배신당했다.",
        choices: [
          { t: "끝까지 따져 되돌려받는다", e: { money: 12, social: -10, health: -6 }, r: "이겼다. 아무도 축하해주지 않았다." },
          { t: "손해를 감수하고 정리한다", e: { money: -12, happy: 8, health: 4 }, r: "잃은 만큼 가벼워졌다." },
          { t: "복수한다", e: { fame: -12, happy: -8, social: -12 }, r: "속은 시원했다. 잠깐이었다.", f: "revenge" },
          { t: "아무 일 없던 척한다", e: { happy: -10, health: -6, social: 4 }, r: "삼킨 건 사라지지 않았다." },
        ]},
    ],
  },
  {
    key: "midlife", title: "중년", age: "40세 — 59세", emoji: "🌆",
    scenes: [
      { id: "m1", text: "몸이 예전 같지 않다. 여기서 방향을 정해야 한다.",
        choices: [
          { t: "건강을 최우선으로 바꾼다", e: { health: 20, happy: 10, money: -8 }, r: "늦지 않았다." },
          { t: "지금 속도를 유지한다", e: { money: 14, health: -16, fame: 6 }, r: "더 올라갔다. 대가도 커졌다." },
          { t: "일을 줄이고 사람들과 지낸다", e: { social: 16, happy: 14, money: -10 }, r: "이제야 사는 것 같았다." },
          { t: "새로운 걸 배우기 시작한다", e: { skill: 14, happy: 10, money: -5 }, r: "늦게 시작한 게 더 재밌었다." },
        ]},
      { id: "m2", text: "젊은 사람이 조언을 구하러 왔다.",
        cond: (s) => s.skill >= 45 || s.fame >= 30,
        choices: [
          { t: "아낌없이 알려준다", e: { social: 14, fame: 10, happy: 8 }, r: "그 사람은 나중에 나를 언급했다.", f: "mentor" },
          { t: "적당히만 알려준다", e: { fame: 2, money: 4 }, r: "내 자리를 지켰다." },
          { t: "같이 일해보자고 한다", e: { money: 12, social: 10, skill: 6 }, r: "새 판이 열렸다." },
          { t: "귀찮아서 넘긴다", e: { happy: 2, social: -6 }, r: "그런 기회는 다시 오지 않았다." },
        ]},
      { id: "m3", text: "모든 걸 정리하고 완전히 다른 삶으로 갈 기회가 있다.",
        choices: [
          { t: "전부 정리하고 떠난다", e: { happy: 22, money: -22, health: 12, fame: -8 }, r: "미친 짓이라고들 했다. 나는 웃었다.", f: "reborn" },
          { t: "남는다", e: { money: 10, happy: -4 }, r: "안정을 택했다. 가끔 그 길이 궁금하다." },
          { t: "절반만 바꾼다", e: { happy: 10, money: -6, health: 5 }, r: "다 버리지 않고도 달라질 수 있었다." },
          { t: "때를 기다린다", e: { money: 6, happy: -6 }, r: "그 때는 오지 않았다." },
        ]},
      { id: "m4", text: "지금까지의 삶이 뉴스에 오를 만한 일에 휘말렸다.",
        cond: (s, f) => f.has("dirty") || f.has("bigshot") || f.has("gambler"),
        choices: [
          { t: "정면으로 해명한다", e: { fame: 10, happy: -6, health: -6 }, r: "믿어준 사람이 절반은 됐다." },
          { t: "조용히 물러난다", e: { fame: -16, happy: 6, money: -8 }, r: "잊히는 데 몇 년 걸렸다." },
          { t: "전부 인정하고 사과한다", e: { fame: 4, happy: 10, money: -14 }, r: "잃을 건 잃고, 남을 건 남았다.", f: "atoned" },
          { t: "끝까지 부인한다", e: { fame: -22, happy: -12, money: 6 }, r: "아무도 믿지 않았다.", f: "disgraced" },
        ]},
    ],
  },
  {
    key: "late", title: "노년", age: "60세 —", emoji: "🌇",
    scenes: [
      { id: "l1", text: "이제 남은 시간을 어떻게 쓸지 정한다.",
        choices: [
          { t: "가족·친구와 보낸다", e: { happy: 18, social: 12, health: 5 }, r: "제일 잘한 선택이었다." },
          { t: "끝까지 일한다", e: { money: 12, fame: 8, health: -14 }, r: "멈추면 죽는다고 믿었다." },
          { t: "여행을 떠난다", e: { happy: 16, health: 6, money: -14 }, r: "사진이 많이 남았다." },
          { t: "기록을 남긴다", e: { fame: 14, skill: 8, happy: 8 }, r: "누군가는 그걸 읽을 것이다.", f: "legacywork" },
        ]},
      { id: "l2", text: "젊은 시절 못다 한 일이 하나 떠오른다.",
        choices: [
          { t: "지금이라도 한다", e: { happy: 20, health: -6, money: -8 }, r: "늦었지만 안 한 것보다 낫다.", f: "nofear" },
          { t: "이제 와서 무슨 소용인가", e: { happy: -8 }, r: "그 생각은 끝까지 남았다." },
          { t: "다른 사람이 하도록 돕는다", e: { social: 14, happy: 12, fame: 6 }, r: "내가 못 한 걸 누군가는 해냈다.", f: "mentor" },
          { t: "이미 충분하다고 여긴다", e: { happy: 12, health: 4 }, r: "만족을 아는 것도 능력이다." },
        ]},
    ],
  },
];

// ── 엔딩 ──
// 위에서부터 순서대로 조건을 검사해 처음 맞는 것이 최종 엔딩이 됩니다.
export const ENDINGS = [
  { key: "collapse", emoji: "🏥", title: "몸이 먼저 무너진 삶",
    grad: ["#c9455e", "#7a1f30"],
    cond: (s) => s.health <= 15,
    text: "많은 걸 이뤘을지 몰라도, 몸은 그 속도를 따라오지 못했다. 마지막에 가장 사고 싶었던 것은 시간이었다.",
    line: "가진 걸 다 줘도 살 수 없는 게 하나 있었다." },

  { key: "broke", emoji: "🕳️", title: "전부 잃은 삶",
    grad: ["#5f67cc", "#2b2158"],
    cond: (s) => s.money <= 10,
    text: "손에 쥔 것은 거의 남지 않았다. 다만 무엇이 중요한지는 확실히 알게 됐다. 그걸 알기까지 너무 비싼 값을 치렀다.",
    line: "다 잃고 나서야 보이는 것들이 있었다." },

  { key: "disgraced", emoji: "📉", title: "이름이 무너진 삶",
    grad: ["#8f88a6", "#4a445c"],
    cond: (s, f) => f.has("disgraced"),
    text: "한때 모두가 이름을 알았다. 지금은 다들 그 이름을 다르게 기억한다. 무너지는 건 쌓는 것보다 훨씬 빨랐다.",
    line: "쌓는 데 30년, 무너지는 데 하루." },

  { key: "hollow", emoji: "🌫️", title: "빈손으로 돌아간 사람",
    grad: ["#7f8c9b", "#3c4552"],
    cond: (s) => s.happy <= 25 && s.social <= 30,
    text: "특별히 잘못한 것도 없었다. 다만 아무것도 붙잡지 않았고, 그래서 아무것도 남지 않았다.",
    line: "붙잡은 게 없어서 남은 것도 없었다." },

  { key: "workhorse", emoji: "💼", title: "일만 하다 끝난 사람",
    grad: ["#8f88a6", "#5a5470"],
    cond: (s) => s.money >= 50 && s.happy <= 30,
    text: "쉬는 법을 배우지 못했다. 통장은 채웠지만 기억할 장면은 많지 않다. 마지막에 떠오른 건 회의실 천장이었다.",
    line: "쉬는 법을 끝내 배우지 못했다." },

  { key: "lonelytop", emoji: "👑", title: "정상에서 혼자인 사람",
    grad: ["#7a6fd8", "#3b3070"],
    cond: (s) => (s.money >= 65 || s.fame >= 55) && s.social <= 25,
    text: "원하던 것은 거의 다 가졌다. 축하해줄 사람만 없었다. 가장 높은 자리는 언제나 좁았다.",
    line: "다 가졌는데 나눌 사람이 없었다." },

  { key: "legend", emoji: "🏆", title: "전설이 된 사람",
    grad: ["#ffd76f", "#f7913a"],
    cond: (s) => s.fame >= 65 && s.money >= 60 && s.skill >= 60,
    text: "이름이 곧 하나의 단어가 됐다. 사람들은 당신의 이야기를 예시로 든다. 다만 그 자리까지 오는 길은 아무도 궁금해하지 않았다.",
    line: "당신의 이름은 사람들이 쓰는 단어가 됐다." },

  { key: "reborn", emoji: "🦋", title: "두 번째 인생을 산 사람",
    grad: ["#84fab0", "#4facfe"],
    cond: (s, f) => f.has("reborn") && s.happy >= 60,
    text: "남들이 다 말릴 때 전부 정리하고 떠났다. 그 뒤의 삶은 앞의 삶보다 짧았지만, 훨씬 선명했다.",
    line: "한 번뿐인 인생을 두 번 살았다." },

  { key: "quietrich", emoji: "💎", title: "조용한 부자",
    grad: ["#4facfe", "#3b58bb"],
    cond: (s) => s.money >= 65 && s.fame < 40,
    text: "아무도 당신이 얼마를 가졌는지 모른다. 그게 당신이 원한 것이었다. 요란하지 않게, 확실하게 쌓았다.",
    line: "아무도 모르게, 확실하게." },

  { key: "giver", emoji: "🤲", title: "나누다 간 사람",
    grad: ["#a8e063", "#4e8f2e"],
    cond: (s, f) => f.has("giver") && s.social >= 55,
    text: "가진 것보다 준 것이 많았다. 통장은 가벼웠지만 장례식장은 좁았다. 당신 덕분에 인생이 바뀐 사람이 여럿이다.",
    line: "준 게 더 많은 사람이었다." },

  { key: "mentor", emoji: "🕊️", title: "다음 사람을 키운 사람",
    grad: ["#8fd3f4", "#5b86e5"],
    cond: (s, f) => f.has("mentor") && s.skill >= 45,
    text: "당신이 이룬 것보다, 당신이 키운 사람들이 이룬 게 더 컸다. 그게 억울하지 않았다면 거짓말이겠지만, 자랑스럽기도 했다.",
    line: "내 이름 대신 그들의 이름이 남았다." },

  { key: "creator", emoji: "📚", title: "작품이 더 오래 남은 사람",
    grad: ["#5f67cc", "#855bb0"],
    cond: (s, f) => f.has("legacywork") || (s.skill >= 60 && s.fame >= 40),
    text: "당신은 사라졌지만 당신이 만든 것은 남았다. 당신을 만난 적 없는 사람들이 그것을 통해 당신을 안다.",
    line: "나보다 오래 남을 것을 만들었다." },

  { key: "family", emoji: "🏡", title: "가족이 전부였던 사람",
    grad: ["#ff9a9e", "#ff6b9d"],
    cond: (s, f) => f.has("family") && s.happy >= 55,
    text: "크게 성공하진 않았다. 다만 매일 돌아갈 곳이 있었고, 마지막에 손을 잡아준 사람이 있었다. 그거면 충분한 인생이었다.",
    line: "돌아갈 곳이 있는 삶이었다." },

  { key: "freesoul", emoji: "🎒", title: "묶이지 않고 산 사람",
    grad: ["#43cea2", "#185a9d"],
    cond: (s, f) => f.has("solo") && s.happy >= 55,
    text: "남들이 정한 순서를 따르지 않았다. 그래서 설명하기 어려운 삶이었지만, 당신은 한 번도 남의 인생을 부러워하지 않았다.",
    line: "누구의 순서도 따르지 않았다." },

  { key: "comeback", emoji: "🔥", title: "무너졌다 다시 일어난 사람",
    grad: ["#ff6b6b", "#ff9a5c"],
    cond: (s, f) => (f.has("atoned") || f.has("revenge")) && s.happy >= 50,
    text: "한 번 크게 무너졌다. 그 뒤에 다시 세운 삶은 이전보다 작았지만 훨씬 단단했다.",
    line: "무너져본 사람만 아는 단단함이 있다." },

  { key: "gambler", emoji: "🎲", title: "판을 걸었던 사람",
    grad: ["#f7b733", "#c9455e"],
    cond: (s, f) => f.has("gambler") || f.has("founder"),
    text: "안전한 길이 늘 눈에 보였다. 한 번도 그쪽으로 가지 않았다. 그래서 이야깃거리가 많은 인생이 됐다.",
    line: "안전한 길은 늘 알고 있었다. 안 갔을 뿐." },

  { key: "healthy", emoji: "🌿", title: "끝까지 건강했던 사람",
    grad: ["#84fab0", "#56ab2f"],
    cond: (s) => s.health >= 70 && s.happy >= 50,
    text: "화려하진 않았다. 대신 마지막까지 두 발로 걸었고, 밥이 맛있었고, 아침이 기다려졌다. 이걸 이룬 사람은 생각보다 적다.",
    line: "마지막까지 두 발로 걸었다." },

  { key: "ordinary", emoji: "🏠", title: "평범하게 잘 산 사람",
    grad: ["#a18cd1", "#fbc2eb"],
    cond: () => true,
    text: "대단한 성공도, 큰 실패도 없었다. 뉴스에 나올 일은 없었지만 매일이 그럭저럭 굴러갔다. 이게 얼마나 어려운 일인지는 해본 사람만 안다.",
    line: "평범하게 사는 게 제일 어렵다." },
];

export function pickEnding(stats, flags) {
  return ENDINGS.find((e) => e.cond(stats, flags)) || ENDINGS[ENDINGS.length - 1];
}

export function clamp(v) {
  return Math.max(0, Math.min(100, v));
}
