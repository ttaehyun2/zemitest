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
    key: "child", title: "유년기", age: "7세 — 13세", deathAge: "어린 나이에", aging: 0, emoji: "🧒",
    scenes: [
      { id: "c0", text: "눈을 떴다. 여덟 살이다. 지금까지의 기억은 전부 지워졌고, 앞으로의 인생은 당신이 정한다.\n\n첫 번째 갈림길은 오늘 아침이다. 엄마가 오늘 하루 뭘 하고 싶냐고 묻는다.",
        choices: [
          { t: "밖에서 하루 종일 뛰어논다", e: { health: 7, social: 5, skill: -2 }, r: "무릎이 다 까졌다. 그날 밤 처음으로 뻗어서 잤다." },
          { t: "책이나 화면 앞에 붙어 있는다", e: { skill: 7, health: -4, happy: 2 }, r: "그날 본 게 평생 머리에 남았다." },
          { t: "친구를 불러 모은다", e: { social: 9, fame: 3, health: 2 }, r: "우리 집이 아지트가 됐다." },
          { t: "혼자 있고 싶다고 한다", e: { happy: 5, skill: 4, social: -4 }, r: "그때부터 혼자 노는 법을 알았다.", f: "loner" },
        ]},

      { id: "c1", text: "반에서 발표를 시킨다. 손을 들면 주목받지만 망하면 1년 내내 놀림거리가 된다.",
        choices: [
          { t: "손을 든다", e: { fame: 5, social: 3, happy: -2 }, r: "떨렸지만 해냈다. 그날부터 애들이 이름을 외웠다.", next: "c1a" },
          { t: "조용히 있는다", e: { happy: 2, skill: 2 }, r: "편했다. 대신 아무도 나를 모른다.", next: "c1b" },
          { t: "친구를 대신 밀어 넣는다", e: { social: -5, fame: 2 }, r: "웃겼다. 그 친구는 아직도 기억한다.", f: "jerk", next: "c1a" },
          { t: "웃겨서 분위기를 바꾼다", e: { social: 6, happy: 4, skill: -1 }, r: "반 전체가 뒤집혔다. 그날부터 인기가 생겼다.", next: "c1a" },
        ]},

      { id: "c1a", branch: true, text: "이름이 알려지자 애들이 자꾸 뭔가를 시킨다. 반장 후보로 밀어 넣겠다고 한다.",
        choices: [
          { t: "해본다", e: { fame: 7, social: 6, happy: -3, skill: 2 }, r: "생각보다 할 만했다. 앞에 서는 게 익숙해졌다.", f: "leader" },
          { t: "거절한다", e: { happy: 5, social: -2 }, r: "부담을 내려놓으니 편했다." },
          { t: "다른 애를 추천한다", e: { social: 6, fame: -2 }, r: "그 애는 지금도 나를 좋아한다." },
          { t: "장난처럼 받아친다", e: { fame: 4, social: 4, skill: -2 }, r: "웃기고 넘어갔다. 그게 내 방식이었다." },
        ]},

      { id: "c1b", branch: true, text: "조용히 지내다 보니 아무도 나를 찾지 않는다. 쉬는 시간이 길게 느껴진다.",
        choices: [
          { t: "먼저 말을 걸어본다", e: { social: 7, happy: 5, health: 1 }, r: "생각보다 쉬웠다. 왜 진작 안 했을까." },
          { t: "혼자 할 걸 찾는다", e: { skill: 9, happy: 4, social: -2 }, r: "그때 시작한 게 평생 갔다.", f: "hobby" },
          { t: "그냥 견딘다", e: { happy: -5, skill: 2 }, r: "그 시절은 통째로 흐릿하다." },
          { t: "책 속으로 도망친다", e: { skill: 10, happy: 3, health: -3 }, r: "현실보다 이야기가 재밌었다.", f: "reader" },
        ]},
      { id: "c2", text: "부모님이 학원을 하나 더 다니라고 한다.",
        choices: [
          { t: "다닌다", e: { skill: 6, happy: -5, health: -2 }, r: "실력은 늘었다. 대신 놀 시간이 사라졌다." },
          { t: "울면서 버틴다", e: { happy: 4, skill: -2, social: 2 }, r: "결국 안 다녔다. 대신 친구들과 놀았다." },
          { t: "다니는 척하고 빠진다", e: { happy: 3, skill: -4, social: 3 }, r: "들키기 전까지는 최고의 시절이었다.", f: "sly" },
          { t: "다니되 몰래 딴짓도 한다", e: { skill: 3, happy: 1, health: -1 }, r: "적당히 요령이 생겼다." },
        ]},
      { id: "c3", text: "친한 친구가 이사를 간다고 한다.",
        choices: [
          { t: "매일 연락하겠다고 약속한다", e: { social: 4, happy: 2 }, r: "몇 년은 지켰다. 그게 어디냐." },
          { t: "쿨하게 잘 가라고 한다", e: { happy: -2, skill: 2 }, r: "그날 밤 혼자 울었다." },
          { t: "이사 가지 말라고 붙잡는다", e: { happy: -4, social: 2 }, r: "소용없었지만 진심이었다." },
          { t: "이미 다른 친구를 찾는다", e: { social: 3, happy: 1 }, r: "관계는 원래 바뀌는 거라고 배웠다." },
        ]},
    ],
  },
  {
    key: "teen", title: "학창시절", age: "14세 — 19세", deathAge: "십 대에", aging: 0, emoji: "🎒",
    scenes: [
      { id: "t1", text: "성적이 애매하다. 남은 1년을 어떻게 쓸지 정해야 한다.",
        choices: [
          { t: "죽어라 공부한다", e: { skill: 11, health: -6, happy: -5 }, r: "성적은 올랐다. 몸은 축났다.", f: "grind" },
          { t: "적당히 하고 하고 싶은 걸 한다", e: { skill: 4, happy: 6, social: 2 }, r: "성적은 그저 그랬지만 후회는 없었다." },
          { t: "공부는 접고 다른 길을 판다", e: { skill: 6, fame: 4, money: -3, happy: 3 }, r: "남들과 다른 길로 들어섰다.", f: "outsider" },
          { t: "아무것도 안 한다", e: { happy: 2, skill: -4, health: 2 }, r: "그 시간은 다시 오지 않았다." },
        ]},
      { id: "t2", text: "친구들이 위험한 짓을 하자고 한다. 안 가면 겁쟁이 소리를 듣는다.",
        choices: [
          { t: "따라간다", e: { social: 5, health: -5, happy: 3 }, r: "재밌었다. 크게 다칠 뻔했다.", f: "risky", next: "t2a" },
          { t: "거절한다", e: { social: -4, skill: 2, happy: -2 }, r: "한동안 어색했다.", next: "t2b" },
          { t: "말리다가 같이 욕먹는다", e: { social: -2, fame: 2, happy: -1 }, r: "아무도 고마워하지 않았다.", f: "brave", next: "t2b" },
          { t: "가는 척하고 몰래 빠진다", e: { social: 1, happy: 1 }, r: "요령만 늘었다.", f: "sly", next: "t2a" },
        ]},

      { id: "t2a", branch: true, text: "그날 일이 학교에 알려졌다. 누가 주동자였냐고 묻는다.",
        choices: [
          { t: "내가 그랬다고 한다", e: { fame: 5, social: 6, happy: -4 }, r: "혼났지만 친구들이 기억한다.", f: "standup" },
          { t: "아무도 말 안 한다", e: { social: 4, happy: -2 }, r: "다 같이 벌을 받았다." },
          { t: "친구 이름을 댄다", e: { social: -10, happy: -5 }, r: "그 뒤로 아무도 나를 부르지 않았다.", f: "jerk" },
          { t: "모른다고 잡아뗀다", e: { skill: 2, happy: -1 }, r: "넘어갔다. 찝찝함은 남았다.", f: "sly" },
        ]},

      { id: "t2b", branch: true, text: "혼자 있는 시간이 늘었다. 그 시간을 뭘로 채울지 정해야 한다.",
        choices: [
          { t: "몰두할 걸 하나 찾는다", e: { skill: 9, happy: 5 }, r: "그때 시작한 게 오래갔다.", f: "hobby" },
          { t: "책과 영상으로 시간을 보낸다", e: { skill: 5, happy: 3, health: -2 }, r: "머릿속이 넓어졌다." },
          { t: "새로운 무리를 찾는다", e: { social: 7, happy: 4 }, r: "나랑 더 맞는 사람들이 있었다." },
          { t: "아무것도 안 한다", e: { happy: -4, health: 2 }, r: "그 시절이 통째로 비어 있다." },
        ]},
      { id: "t3", text: "좋아하는 사람이 생겼다.",
        choices: [
          { t: "고백한다", e: { happy: 7, social: 3, skill: -2 }, r: "결과가 어떻든 그 순간은 선명하게 남았다.", f: "loved" },
          { t: "혼자 마음만 키운다", e: { happy: -3, skill: 3 }, r: "말 못 한 게 오래 남았다." },
          { t: "친구에게 대신 물어보게 한다", e: { social: -2, happy: 1 }, r: "소문만 났다." },
          { t: "공부에 집중한다", e: { skill: 6, happy: -4 }, r: "그때는 그게 맞다고 생각했다.", f: "grind" },
        ]},
      { id: "t5", text: "SNS에 올린 글이 갑자기 퍼졌다. 모르는 사람들이 계속 찾아온다.",
        choices: [
          { t: "계속 올려서 키운다", e: { fame: 11, social: 5, health: -4, happy: 2 }, r: "처음으로 세상이 나를 봤다.", f: "influencer", next: "t5a" },
          { t: "무서워서 지운다", e: { happy: -2, fame: -2, skill: 2 }, r: "관심이 이렇게 무거운 줄 몰랐다.", next: "t5b" },
          { t: "계정을 비공개로 돌린다", e: { happy: 4, social: -2 }, r: "내 공간을 지켰다.", next: "t5b" },
          { t: "이걸로 뭘 해볼지 고민한다", e: { skill: 6, fame: 5, money: 2 }, r: "장난이 진짜가 될 수도 있다는 걸 알았다.", f: "influencer", next: "t5a" },
        ]},

      { id: "t5a", branch: true, branchOnly: true, text: "사람이 몰리니 악플도 같이 왔다. 밤마다 알림이 울린다.",
        choices: [
          { t: "신경 안 쓰고 계속한다", e: { fame: 7, health: -6, happy: -4 }, r: "무뎌졌다. 그게 좋은 건지는 모르겠다.", f: "thickskin" },
          { t: "알림을 끄고 거리를 둔다", e: { happy: 7, health: 5, fame: -2 }, r: "숨통이 트였다." },
          { t: "일일이 대응한다", e: { fame: 4, happy: -9, health: -5 }, r: "이길 수 없는 싸움이었다." },
          { t: "그만둔다", e: { fame: -9, happy: 6, health: 4 }, r: "내려놓으니 잠이 왔다." },
        ]},

      { id: "t5b", branch: true, branchOnly: true, text: "조용해지고 나니 오히려 허전하다. 그때 그 관심이 가끔 생각난다.",
        choices: [
          { t: "다시 시작해본다", e: { fame: 6, happy: 4, health: -2 }, r: "이번엔 내 속도로 했다.", f: "influencer" },
          { t: "가까운 사람들에게만 보여준다", e: { social: 7, happy: 6 }, r: "소수가 더 좋았다." },
          { t: "완전히 접는다", e: { happy: 4, skill: 5 }, r: "다른 데 쓸 시간이 생겼다." },
          { t: "다른 걸 해본다", e: { skill: 7, fame: 2, happy: 3 }, r: "관심은 목적이 아니라 결과였다." },
        ]},

      { id: "t4", text: "알바 자리가 생겼다. 시간은 뺏기지만 내 돈이 생긴다.",
        choices: [
          { t: "한다", e: { money: 7, skill: 3, health: -4, happy: 2 }, r: "처음 번 돈의 감각은 잊히지 않는다.", f: "worker" },
          { t: "안 한다", e: { skill: 2, health: 2 }, r: "대신 다른 걸 할 시간이 있었다." },
          { t: "짧게 해보고 그만둔다", e: { money: 2, skill: 2, happy: 1 }, r: "세상이 만만치 않다는 건 배웠다." },
          { t: "친구까지 끌어들여 같이 한다", e: { money: 6, social: 4, health: -3 }, r: "힘들었지만 그때 얘기를 아직도 한다." },
        ]},
    ],
  },
  {
    key: "twenties", title: "20대", age: "20세 — 29세", deathAge: "이십 대에", aging: -3, emoji: "🔥",
    scenes: [
      { id: "w1", text: "진로를 정해야 한다. 각자 대가가 다르다.",
        choices: [
          { t: "안정적인 길을 간다", e: { money: 9, health: 3, happy: -2, fame: 1 }, r: "부모님이 웃었다. 나는 조금 답답했다.", f: "safe", next: "w1a" },
          { t: "하고 싶은 일에 뛰어든다", e: { happy: 9, money: -6, skill: 6, fame: 3 }, r: "통장은 비었지만 눈은 살아 있었다.", f: "passion", next: "w1b" },
          { t: "돈이 되는 쪽으로 간다", e: { money: 14, happy: -5, health: -4 }, r: "빨리 벌었다.", f: "greedy", next: "w1c" },
          { t: "일단 아무거나 한다", e: { money: 4, skill: 2, happy: -1 }, r: "방향은 나중에 찾기로 했다.", next: "w1d" },
        ]},

      { id: "w1a", branch: true, text: "안정된 자리에 앉은 지 3년. 매일이 똑같다. 후배가 하나 들어왔다.",
        choices: [
          { t: "여기서 최고가 되기로 한다", e: { skill: 9, money: 6, fame: 4 }, r: "안정 속에서도 올라갈 길은 있었다." },
          { t: "몰래 다른 걸 준비한다", e: { skill: 7, happy: 5, health: -4 }, r: "퇴근 후의 시간이 진짜 내 시간이었다.", f: "sidehustle" },
          { t: "후배를 잘 키운다", e: { social: 9, happy: 5 }, r: "그 후배는 나중에 나를 찾아왔다.", f: "mentor" },
          { t: "이대로도 괜찮다고 받아들인다", e: { happy: 6, health: 5, skill: -2 }, r: "욕심을 내려놓자 편해졌다." },
        ]},

      { id: "w1b", branch: true, text: "하고 싶은 일을 시작한 지 2년. 수입이 거의 없다. 주변에서 언제까지 할 거냐고 묻는다.",
        choices: [
          { t: "1년만 더 버틴다", e: { skill: 10, money: -7, happy: 4, health: -5 }, r: "그 1년이 갈림길이었다.", f: "persist" },
          { t: "알바를 병행한다", e: { money: 6, skill: 4, health: -6 }, r: "잠을 줄여 둘 다 했다.", f: "worker" },
          { t: "접고 안정적인 길로 간다", e: { money: 10, happy: -7 }, r: "현실을 택했다. 가끔 그 시절이 떠오른다.", f: "gaveup" },
          { t: "방식을 완전히 바꿔본다", e: { skill: 6, fame: 6, money: 2 }, r: "고집을 버리자 길이 보였다." },
        ]},

      { id: "w1c", branch: true, text: "통장에 숫자가 쌓인다. 그런데 요즘 무슨 요일인지 자주 헷갈린다.",
        choices: [
          { t: "속도를 유지한다", e: { money: 12, health: -9, happy: -5 }, r: "더 벌었다. 더 비었다.", f: "burnout" },
          { t: "쉬는 날을 만든다", e: { health: 7, happy: 7, money: -4 }, r: "쉬어보니 알겠더라." },
          { t: "번 돈으로 다른 걸 시작한다", e: { money: -7, skill: 7, fame: 5 }, r: "돈이 나를 자유롭게 했다.", f: "founder" },
          { t: "다 그만두고 여행을 떠난다", e: { money: -11, happy: 12, health: 6 }, r: "미쳤다는 소리를 들었다. 웃겼다.", f: "reborn" },
        ]},

      { id: "w1d", branch: true, text: "몇 년째 정하지 못했다. 동창회에 나갔더니 다들 자리를 잡았다.",
        choices: [
          { t: "조급해져서 아무거나 붙잡는다", e: { money: 6, happy: -5, skill: 2 }, r: "그래도 시작은 했다." },
          { t: "이제라도 제대로 정한다", e: { skill: 9, happy: 5, money: -4 }, r: "늦게 시작한 만큼 진심이었다.", f: "latestart" },
          { t: "남과 비교하지 않기로 한다", e: { happy: 9, health: 4 }, r: "내 속도라는 게 있었다." },
          { t: "동창회를 나오지 않는다", e: { social: -6, happy: 2 }, r: "비교할 대상이 없으니 편했다." },
        ]},
      { id: "w2", text: "친구가 사업을 같이 하자고 한다. 될 것도 같고 망할 것도 같다.",
        cond: (s) => s.money >= 20,
        choices: [
          { t: "전 재산을 넣는다", e: { money: -16, skill: 9, fame: 7, health: -6 }, r: "인생을 걸었다.", f: "founder" },
          { t: "일부만 넣는다", e: { money: -5, skill: 5, social: 3 }, r: "잃어도 죽지 않을 만큼만 걸었다." },
          { t: "거절한다", e: { money: 3, social: -3 }, r: "친구와는 멀어졌다. 돈은 지켰다." },
          { t: "투자 대신 도와만 준다", e: { social: 6, skill: 3 }, r: "사람은 남았다." },
        ]},
      { id: "w3", text: "몸에서 신호가 온다. 병원에 가라는 말을 들었다.",
        cond: (s) => s.health <= 60,
        choices: [
          { t: "바로 간다", e: { health: 9, money: -4 }, r: "일찍 잡아서 다행이었다." },
          { t: "바빠서 미룬다", e: { health: -9, money: 4, skill: 2 }, r: "그때 갔어야 했다.", f: "ignoredbody" },
          { t: "운동을 시작한다", e: { health: 6, happy: 3, money: -2 }, r: "몸이 달라지자 다른 것도 달라졌다." },
          { t: "무시하고 더 몰아붙인다", e: { health: -11, money: 7, skill: 5 }, r: "성과는 냈다. 대가는 나중에 왔다.", f: "ignoredbody" },
        ]},
      { id: "w4", text: "누군가 사랑에 빠질 만한 사람을 만났다. 다만 지금 하는 일과 양립하기 어렵다.",
        choices: [
          { t: "사랑을 택한다", e: { happy: 11, social: 6, money: -5, skill: -3 }, r: "후회한 적은 없다.", f: "loved" },
          { t: "일을 택한다", e: { money: 7, skill: 6, happy: -7 }, r: "가끔 그 사람이 떠오른다.", f: "chosework" },
          { t: "둘 다 잡으려 한다", e: { happy: 2, health: -6, money: 2 }, r: "둘 다 어중간해졌다." },
          { t: "결정을 미룬다", e: { happy: -4, social: -2 }, r: "상대가 먼저 떠났다." },
        ]},
      { id: "w6", text: "오랜만에 만난 친구가 완전히 달라져 있다. 나만 제자리인 것 같다.",
        choices: [
          { t: "자극받아 뭔가 시작한다", e: { skill: 7, money: 2, happy: -2 }, r: "비교가 연료가 될 때도 있다." },
          { t: "내 속도를 믿는다", e: { happy: 9, health: 4 }, r: "흔들리지 않는 게 실력이었다." },
          { t: "그 친구를 멀리한다", e: { social: -6, happy: -2 }, r: "편해졌지만 하나를 잃었다." },
          { t: "어떻게 했는지 물어본다", e: { skill: 6, social: 6, money: 4 }, r: "묻는 데 자존심을 걸지 않았다.", f: "humble" },
        ]},

      { id: "w7", text: "부모님이 아프시다는 연락이 왔다. 지금 하는 일을 놓아야 할 수도 있다.",
        cond: (s) => s.money >= 15,
        choices: [
          { t: "당장 내려간다", e: { social: 10, happy: 5, money: -9, skill: -4 }, r: "일은 다시 구할 수 있었다.", f: "family" },
          { t: "돈을 보내고 일은 계속한다", e: { money: -6, happy: -5, skill: 4 }, r: "실용적이었다. 마음은 안 그랬다." },
          { t: "일을 줄이고 오간다", e: { health: -7, happy: 2, social: 6 }, r: "몸이 두 개였으면 했다." },
          { t: "형제나 다른 가족에게 맡긴다", e: { money: 2, social: -7, happy: -6 }, r: "그 일은 오래 남았다.", f: "regret" },
        ]},

      { id: "w5", text: "빠르게 큰돈을 벌 수 있다는 제안이 왔다. 합법인지는 애매하다.",
        choices: [
          { t: "한다", e: { money: 19, fame: -6, happy: -5, health: -3 }, r: "돈은 들어왔다. 밤에 잠이 잘 안 왔다.", f: "dirty" },
          { t: "거절한다", e: { happy: 4, fame: 2 }, r: "가난했지만 떳떳했다." },
          { t: "알아보다가 발을 뺀다", e: { skill: 4, money: -2 }, r: "세상 돌아가는 걸 알게 됐다." },
          { t: "신고한다", e: { fame: 7, social: -7, happy: 2 }, r: "옳은 일이었지만 편은 줄었다.", f: "brave" },
        ]},
    ],
  },
  {
    key: "thirties", title: "30대", age: "30세 — 39세", deathAge: "삼십 대에", aging: -7, emoji: "💼",
    scenes: [
      { id: "h1", text: "지금까지 쌓아온 걸 걸고 크게 도약할 기회가 왔다.",
        cond: (s) => s.skill >= 40 || s.fame >= 25,
        choices: [
          { t: "전부 건다", e: { money: 17, fame: 12, health: -7, happy: -3 }, r: "이름이 알려지기 시작했다.", f: "bigshot" },
          { t: "안전하게 간다", e: { money: 6, happy: 3, health: 2 }, r: "크게 오르진 않았지만 무너지지도 않았다." },
          { t: "동료와 나눠 간다", e: { money: 9, social: 9, fame: 5 }, r: "혼자였으면 못 했을 일이었다." },
          { t: "이 기회를 남에게 넘긴다", e: { social: 7, happy: 4, money: -2 }, r: "그 사람은 아직도 고마워한다." },
        ]},
      { id: "h2", text: "가정을 꾸릴지 결정할 시점이다.",
        choices: [
          { t: "가정을 꾸린다", e: { happy: 10, social: 7, money: -9, health: -2 }, r: "돈은 줄었고 이유는 늘었다.", f: "family", next: "h2a" },
          { t: "혼자 살기로 한다", e: { money: 7, happy: 2, social: -5 }, r: "자유로웠다. 가끔 조용했다.", f: "solo", next: "h2b" },
          { t: "아직 미룬다", e: { money: 4, skill: 4, happy: -1 }, r: "언젠가라는 말을 오래 썼다.", next: "h2b" },
          { t: "일에 모든 걸 쏟는다", e: { money: 11, skill: 7, happy: -7, health: -5 }, r: "성공했다는 말은 들었다.", f: "chosework", next: "h2c" },
        ]},

      { id: "h2a", branch: true, text: "가족이 생기고 나니 결정 하나하나가 무거워졌다. 좋은 기회가 왔는데 위험이 크다.",
        choices: [
          { t: "가족을 위해 안전하게 간다", e: { money: 5, happy: 5, health: 4 }, r: "지킬 게 생기니 겁이 늘었다. 그게 나쁘지만은 않았다." },
          { t: "가족을 위해서라도 도전한다", e: { money: 10, health: -6, happy: -2 }, r: "잘 되면 영웅, 아니면 죄인이었다.", f: "gambler" },
          { t: "가족과 상의해서 정한다", e: { social: 7, happy: 7, money: 4 }, r: "혼자 지고 있던 걸 나눴다." },
          { t: "일을 줄이고 시간을 준다", e: { happy: 10, money: -6, social: 5 }, r: "돈보다 남는 게 있었다." },
        ]},

      { id: "h2b", branch: true, text: "명절이나 모임에서 매번 같은 질문을 받는다. 슬슬 지친다.",
        choices: [
          { t: "당당하게 내 방식이라고 말한다", e: { happy: 7, fame: 2, social: -2 }, r: "몇 번 말하니 아무도 안 물었다.", f: "confident" },
          { t: "적당히 웃어넘긴다", e: { social: 3, happy: -2 }, r: "매번 조금씩 닳았다." },
          { t: "그 자리를 아예 안 나간다", e: { social: -7, happy: 5 }, r: "편해졌다. 멀어지기도 했다." },
          { t: "비슷한 사람들을 찾는다", e: { social: 9, happy: 7 }, r: "혼자가 아니었다는 걸 알았다." },
        ]},

      { id: "h2c", branch: true, text: "일에 다 쏟은 지 몇 년. 성과는 났는데 어느 날 아침 몸이 안 움직인다.",
        choices: [
          { t: "병원에 가고 속도를 줄인다", e: { health: 10, money: -5, happy: 5 }, r: "몸이 먼저 신호를 보냈다." },
          { t: "약 먹고 계속한다", e: { money: 10, health: -12, fame: 5 }, r: "버텼다. 대가는 뒤에 왔다.", f: "ignoredbody" },
          { t: "잠깐 멈추고 생각한다", e: { happy: 6, skill: 4, money: -2 }, r: "멈춰야 보이는 게 있었다." },
          { t: "일을 넘기고 물러난다", e: { money: -6, happy: 9, health: 7, fame: -4 }, r: "내려놓는 것도 용기였다." },
        ]},
      { id: "h3", text: "돈이 좀 모였다. 어디에 쓸지 정해야 한다.",
        cond: (s) => s.money >= 45,
        choices: [
          { t: "위험하지만 크게 불릴 곳에 넣는다", e: { money: 15, health: -4, happy: -2 }, r: "운이 따라줬다.", f: "gambler" },
          { t: "안전하게 굴린다", e: { money: 7, happy: 2 }, r: "천천히, 확실하게 늘었다." },
          { t: "나를 위해 쓴다", e: { happy: 10, health: 5, money: -9 }, r: "그때 산 기억은 아직 남아 있다." },
          { t: "필요한 사람에게 나눈다", e: { social: 10, fame: 6, money: -10, happy: 6 }, r: "돈은 줄었는데 이상하게 든든했다.", f: "giver" },
        ]},
      { id: "h5", text: "내가 만든 것이 처음으로 세상에 제대로 알려졌다.",
        cond: (s) => s.fame >= 30 || s.skill >= 50,
        choices: [
          { t: "이 기세를 몰아 크게 벌인다", e: { fame: 14, money: 11, health: -9 }, r: "정신없이 1년이 지나갔다.", f: "bigshot" },
          { t: "속도를 지키며 간다", e: { fame: 6, money: 6, health: 2, happy: 5 }, r: "오래 갈 수 있는 속도를 찾았다." },
          { t: "함께한 사람들과 나눈다", e: { social: 12, fame: 7, money: 2 }, r: "혼자 한 게 아니었으니까.", f: "giver" },
          { t: "부담스러워 뒤로 물러난다", e: { fame: -5, happy: 6, health: 5 }, r: "주목은 나에게 안 맞았다." },
        ]},

      { id: "h6", text: "거울을 봤는데 낯설다. 20대의 나라면 지금의 나를 뭐라고 할까.",
        choices: [
          { t: "잘 살고 있다고 할 것 같다", e: { happy: 9, health: 3 }, r: "그 대답을 오래 기다렸다." },
          { t: "왜 이렇게 됐냐고 할 것 같다", e: { happy: -6, skill: 4 }, r: "그 목소리가 나를 다시 움직이게 했다." },
          { t: "지금부터 바꿔보기로 한다", e: { skill: 7, health: 6, money: -4, happy: 5 }, r: "늦었다는 말은 안 하기로 했다.", f: "restart" },
          { t: "그런 생각 안 하기로 한다", e: { happy: 4, health: 2 }, r: "지금을 사는 것도 방법이었다." },
        ]},

      { id: "h4", text: "믿었던 사람에게 크게 배신당했다.",
        choices: [
          { t: "끝까지 따져 되돌려받는다", e: { money: 7, social: -6, health: -4 }, r: "이겼다. 아무도 축하해주지 않았다." },
          { t: "손해를 감수하고 정리한다", e: { money: -7, happy: 5, health: 2 }, r: "잃은 만큼 가벼워졌다." },
          { t: "복수한다", e: { fame: -7, happy: -5, social: -7 }, r: "속은 시원했다. 잠깐이었다.", f: "revenge" },
          { t: "아무 일 없던 척한다", e: { happy: -6, health: -4, social: 2 }, r: "삼킨 건 사라지지 않았다." },
        ]},
    ],
  },
  {
    key: "midlife", title: "중년", age: "40세 — 59세", deathAge: "한창때에", aging: -13, emoji: "🌆",
    scenes: [
      { id: "m1", text: "몸이 예전 같지 않다. 여기서 방향을 정해야 한다.",
        choices: [
          { t: "건강을 최우선으로 바꾼다", e: { health: 12, happy: 6, money: -5 }, r: "늦지 않았다." },
          { t: "지금 속도를 유지한다", e: { money: 9, health: -10, fame: 4 }, r: "더 올라갔다. 대가도 커졌다." },
          { t: "일을 줄이고 사람들과 지낸다", e: { social: 10, happy: 9, money: -6 }, r: "이제야 사는 것 같았다." },
          { t: "새로운 걸 배우기 시작한다", e: { skill: 9, happy: 6, money: -3 }, r: "늦게 시작한 게 더 재밌었다." },
        ]},
      { id: "m2", text: "젊은 사람이 조언을 구하러 왔다.",
        cond: (s) => s.skill >= 45 || s.fame >= 30,
        choices: [
          { t: "아낌없이 알려준다", e: { social: 9, fame: 6, happy: 5 }, r: "그 사람은 나중에 나를 언급했다.", f: "mentor" },
          { t: "적당히만 알려준다", e: { fame: 1, money: 2 }, r: "내 자리를 지켰다." },
          { t: "같이 일해보자고 한다", e: { money: 7, social: 6, skill: 4 }, r: "새 판이 열렸다." },
          { t: "귀찮아서 넘긴다", e: { happy: 1, social: -4 }, r: "그런 기회는 다시 오지 않았다." },
        ]},
      { id: "m3", text: "모든 걸 정리하고 완전히 다른 삶으로 갈 기회가 있다.",
        choices: [
          { t: "전부 정리하고 떠난다", e: { happy: 14, money: -14, health: 7, fame: -5 }, r: "미친 짓이라고들 했다. 나는 웃었다.", f: "reborn", next: "m3a" },
          { t: "남는다", e: { money: 6, happy: -2 }, r: "안정을 택했다.", next: "m3b" },
          { t: "절반만 바꾼다", e: { happy: 6, money: -4, health: 3 }, r: "다 버리지 않고도 달라질 수 있었다.", next: "m3a" },
          { t: "때를 기다린다", e: { money: 4, happy: -4 }, r: "그 때는 오지 않았다.", next: "m3b" },
        ]},

      { id: "m3a", branch: true, text: "새로 시작한 곳에서 아무도 나를 모른다. 다시 바닥부터다.",
        choices: [
          { t: "처음부터 배운다", e: { skill: 10, happy: 7, money: -5 }, r: "나이는 숫자였다.", f: "humble" },
          { t: "예전 경력을 살린다", e: { money: 9, fame: 5, skill: 3 }, r: "쌓아둔 게 어디 가지 않았다." },
          { t: "여기서는 그냥 쉰다", e: { health: 10, happy: 10, money: -6 }, r: "쉬려고 온 거였다." },
          { t: "비슷한 사람들을 모은다", e: { social: 11, fame: 5, happy: 6 }, r: "혼자 떠났는데 여럿이 됐다.", f: "mentor" },
        ]},

      { id: "m3b", branch: true, text: "남기로 했다. 그런데 후배들이 하나둘 떠나고 자리가 비어간다.",
        choices: [
          { t: "끝까지 자리를 지킨다", e: { money: 7, fame: 4, happy: -2 }, r: "누군가는 남아야 했다.", f: "loyal" },
          { t: "떠나는 사람들을 응원한다", e: { social: 9, happy: 6 }, r: "붙잡지 않는 것도 방법이었다.", f: "mentor" },
          { t: "나도 준비를 시작한다", e: { skill: 7, money: -2, happy: 5 }, r: "늦었지만 시작은 했다." },
          { t: "변화를 직접 만든다", e: { fame: 9, skill: 6, health: -5 }, r: "떠나는 대신 바꾸기로 했다.", f: "bigshot" },
        ]},
      { id: "m4", text: "지금까지의 삶이 뉴스에 오를 만한 일에 휘말렸다.",
        cond: (s, f) => f.has("dirty") || f.has("bigshot") || f.has("gambler"),
        choices: [
          { t: "정면으로 해명한다", e: { fame: 6, happy: -4, health: -4 }, r: "믿어준 사람이 절반은 됐다." },
          { t: "조용히 물러난다", e: { fame: -10, happy: 4, money: -5 }, r: "잊히는 데 몇 년 걸렸다." },
          { t: "전부 인정하고 사과한다", e: { fame: 2, happy: 6, money: -9 }, r: "잃을 건 잃고, 남을 건 남았다.", f: "atoned" },
          { t: "끝까지 부인한다", e: { fame: -14, happy: -7, money: 4 }, r: "아무도 믿지 않았다.", f: "disgraced" },
        ]},
    ],
  },
  {
    key: "late", title: "노년", age: "60세 —", deathAge: "노년에", aging: -18, emoji: "🌇",
    scenes: [
      { id: "l1", text: "이제 남은 시간을 어떻게 쓸지 정한다.",
        choices: [
          { t: "가족·친구와 보낸다", e: { happy: 11, social: 7, health: 3 }, r: "제일 잘한 선택이었다." },
          { t: "끝까지 일한다", e: { money: 7, fame: 5, health: -9 }, r: "멈추면 죽는다고 믿었다." },
          { t: "여행을 떠난다", e: { happy: 10, health: 4, money: -9 }, r: "사진이 많이 남았다." },
          { t: "기록을 남긴다", e: { fame: 9, skill: 5, happy: 5 }, r: "누군가는 그걸 읽을 것이다.", f: "legacywork" },
        ]},
      { id: "l3", text: "오래 연락이 끊겼던 사람에게서 연락이 왔다.",
        choices: [
          { t: "반갑게 만난다", e: { social: 10, happy: 11 }, r: "시간은 생각보다 많은 걸 씻어냈다." },
          { t: "정중히 거절한다", e: { happy: 2, social: -2 }, r: "굳이 열지 않은 문도 있다." },
          { t: "먼저 사과한다", e: { happy: 12, social: 9 }, r: "그 말을 하는 데 30년이 걸렸다.", f: "atoned" },
          { t: "답을 미룬다", e: { happy: -5 }, r: "결국 답하지 못했다.", f: "regret" },
        ]},

      { id: "l4", text: "이제 정말 마지막이다. 남길 말을 한 문장만 고른다면.",
        choices: [
          { t: "「후회 없이 살았다」", e: { happy: 10, fame: 4 }, r: "그렇게 말할 수 있어서 다행이었다." },
          { t: "「미안하다, 그리고 고맙다」", e: { social: 11, happy: 9 }, r: "듣는 사람들이 울었다." },
          { t: "「다들 잘 살아라」", e: { social: 9, happy: 7, fame: 2 }, r: "끝까지 남 걱정이었다." },
          { t: "「한 번만 더 살고 싶다」", e: { happy: 4, fame: 5 }, r: "그만큼 재밌었다는 뜻이기도 했다.", f: "nofear" },
        ]},

      { id: "l2", text: "젊은 시절 못다 한 일이 하나 떠오른다.",
        choices: [
          { t: "지금이라도 한다", e: { happy: 12, health: -4, money: -5 }, r: "늦었지만 안 한 것보다 낫다.", f: "nofear" },
          { t: "이제 와서 무슨 소용인가", e: { happy: -5 }, r: "그 생각은 끝까지 남았다." },
          { t: "다른 사람이 하도록 돕는다", e: { social: 9, happy: 7, fame: 4 }, r: "내가 못 한 걸 누군가는 해냈다.", f: "mentor" },
          { t: "이미 충분하다고 여긴다", e: { happy: 7, health: 2 }, r: "만족을 아는 것도 능력이다." },
        ]},
    ],
  },
];

// ── 엔딩 ──
// 위에서부터 순서대로 조건을 검사해 처음 맞는 것이 최종 엔딩이 됩니다.
export const ENDINGS = [
  // ── 한계를 넘은 엔딩 (스탯 100 초과) ──
  { key: "godmode", emoji: "🌟", title: "인간의 한계를 넘은 사람",
    grad: ["#ffd76f", "#f7913a"],
    cond: (s) => Object.values(s).filter((v) => v > 110).length >= 3,
    text: "세 가지 이상에서 보통 사람의 한계를 넘었다. 이런 인생은 통계에 잡히지 않는다. 사람들은 당신을 설명하려다 결국 포기하고, 그냥 그런 사람이 있었다고만 말한다.",
    line: "설명할 수 없는 인생이 있다." },

  { key: "monster", emoji: "🔱", title: "한 분야의 괴물",
    grad: ["#5f67cc", "#2b2158"],
    cond: (s) => Math.max(...Object.values(s)) > 155,
    text: "하나에 모든 것을 쏟아부었다. 그 분야에서 당신을 넘는 사람은 없었다. 대신 다른 모든 것을 포기해야 했고, 당신은 그 거래를 후회하지 않는다.",
    line: "하나를 위해 전부를 걸었다." },

  { key: "ruined", emoji: "⚫", title: "바닥을 뚫고 간 삶",
    grad: ["#3c4552", "#15181d"],
    cond: (s) => Object.values(s).some((v) => v < 0),
    text: "무언가가 0 아래로 내려갔다. 회복이라는 말이 사치처럼 느껴지는 지점이 있다. 그래도 여기까지 온 것 자체가 버틴 것이다.",
    line: "바닥에도 아래가 있었다." },

  { key: "collapse", emoji: "🏥", title: "몸이 먼저 무너진 삶",
    grad: ["#c9455e", "#7a1f30"],
    cond: (s) => s.health <= 5,
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
    cond: (s) => s.happy <= 32 && s.social <= 38,
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

// 스탯은 100을 넘을 수도, 마이너스로 떨어질 수도 있습니다.
// 다만 무한히 벌어지면 밸런스가 깨지므로 -50 ~ 200 으로만 제한합니다.
export const STAT_MIN = -50;
export const STAT_MAX = 200;

export function clamp(v) {
  return Math.max(STAT_MIN, Math.min(STAT_MAX, v));
}

/** 막대 표시용 비율(0~1). 100 초과분은 별도로 표시합니다. */
export function barRatio(v) {
  return Math.max(0, Math.min(1, v / 100));
}
export function overRatio(v) {
  return v > 100 ? Math.max(0, Math.min(1, (v - 100) / 100)) : 0;
}


// ══ 건강 붕괴 시스템 ══
// 건강이 이 값 아래로 떨어지면 인생이 도중에 끝납니다.
export const DEATH_LINE = -10;
// 재력이 이 값 아래로 떨어지면 굶어 죽습니다.
export const STARVE_LINE = -15;

export const DEATHS = [
  {
    key: "starve", emoji: "🥀", title: "굶어 죽은 삶",
    grad: ["#7a6a4f", "#332b1f"],
    byMoney: true,
    text: "돈이 떨어졌다. 처음엔 며칠만 버티면 될 줄 알았다. 도와줄 사람을 찾기엔 이미 늦었고, 도와달라고 말하는 법도 잊은 지 오래였다.",
    line: "돈이 없다는 건 시간이 없다는 뜻이었다.",
  },
  {
    key: "prison", emoji: "⛓️", title: "차가운 바닥에서 끝난 삶",
    grad: ["#4a4550", "#1a171f"],
    cond: (s, f) =>
      (f.has("dirty") && (f.has("disgraced") || f.has("revenge"))) ||
      (f.has("disgraced") && f.has("revenge")),
    text: "한 번의 선택이 다음 선택을 좁혔고, 어느 순간부터는 돌아갈 길이 없었다. 마지막으로 본 하늘은 창살 사이로 잘려 있었다. 면회는 오지 않았다.",
    line: "돌아갈 수 있는 지점이 분명히 있었다.",
  },
  {
    key: "forgotten", emoji: "🕸️", title: "아무도 모르게 끝난 삶",
    grad: ["#5a5470", "#25212f"],
    cond: (s) => s.social <= 35,
    text: "며칠이 지나서야 알려졌다. 연락이 끊긴 지 오래였고, 이상하다고 느낀 사람이 없었다. 방 안의 물건들은 어제까지 쓰던 그대로였다.",
    line: "혼자 사는 것과 혼자 남는 것은 다르다.",
  },
  {
    key: "burnedout", emoji: "🕯️", title: "다 타버린 삶",
    grad: ["#8f88a6", "#3c3548"],
    cond: (s) => s.happy <= 30,
    text: "몸이 먼저 멈췄지만 사실은 그 전에 다른 것이 멈춰 있었다. 오랫동안 버티기만 했고, 버티는 것도 체력이 있어야 가능한 일이었다.",
    line: "버티는 것도 체력이 필요했다.",
  },
  {
    key: "accident", emoji: "🌑", title: "예고 없이 끊긴 삶",
    grad: ["#37506b", "#121a24"],
    cond: (s, f) =>
      (f.has("risky") && f.has("gambler")) || (f.has("gambler") && f.has("founder")),
    text: "그날 아침도 평범했다. 계획이 있었고, 만나기로 한 사람이 있었고, 하다 만 일이 있었다. 전부 그대로 남았다.",
    line: "끝은 예고하고 오지 않는다.",
  },
  {
    key: "overwork", emoji: "💼", title: "과로사",
    grad: ["#5f67cc", "#2b2158"],
    // 몸을 실제로 갈아 넣었고, 그 대가로 뭔가를 얻은 경우
    cond: (s, f) => (f.has("ignoredbody") || f.has("burnout")) && (s.money >= 55 || s.skill >= 65),
    text: "쓰러지기 전까지 아무도 몰랐다. 본인도 몰랐다. 통장에는 숫자가 남았지만 쓸 사람이 없다. 병원에서 마지막으로 확인한 것은 읽지 못한 메시지 수십 개였다.",
    line: "가장 비싼 대가는 언제나 마지막에 청구된다.",
  },
  {
    key: "gaveout", emoji: "💀", title: "몸이 먼저 포기한 삶",
    grad: ["#6b5a6e", "#2a2129"],
    cond: () => true,
    text: "크게 잘못한 것도, 무리한 것도 없었다. 다만 몸을 챙기는 일이 늘 다음 순서였고, 그 다음은 끝내 오지 않았다. 마지막까지 계획은 남아 있었다.",
    line: "몸은 예고 없이 손을 놓는다.",
  },
];

/** 사망 원인을 고릅니다. 재력이 바닥나면 아사가 우선합니다. */
export function pickDeath(stats, flags) {
  if (stats.money <= STARVE_LINE) {
    return DEATHS.find((d) => d.byMoney);
  }
  return (
    DEATHS.filter((d) => !d.byMoney).find((d) => d.cond(stats, flags)) ||
    DEATHS[DEATHS.length - 1]
  );
}

/** 지금 죽었는지 판정합니다. */
export function isDead(stats) {
  return stats.health <= DEATH_LINE || stats.money <= STARVE_LINE;
}

/** 새 챕터에 들어설 때 나이로 인해 깎이는 건강. */
export function agingCost(chapter) {
  return chapter?.aging || 0;
}
