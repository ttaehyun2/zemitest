// 댓글 검증 및 필터
// 목적: 스팸 차단, 연락처 유출 방지, 과도한 비방 차단

export const MAX_LEN = 300;
export const MAX_NICK = 12;

// 연락처·외부 유도 패턴.
// 미성년 이용자가 많은 사이트에서 개인 연락처가 오가는 것을 막고,
// 동시에 스팸 링크도 함께 차단합니다.
const CONTACT_PATTERNS = [
  /01[016789][-.\s]?\d{3,4}[-.\s]?\d{4}/,          // 휴대폰 번호
  /\d{2,4}[-.\s]\d{3,4}[-.\s]\d{4}/,               // 일반 전화번호
  /(https?:\/\/|www\.)/i,                           // URL
  /[a-z0-9.-]+\.(com|net|kr|org|co|io|me|xyz|shop|link)\b/i, // 도메인
  /(카톡|카카오톡|kakao|오픈?채팅|오카|디코|디스코드|discord|텔레|telegram|라인|line)\s*(아이디|id|주소|방|링크|추가|해|하실|하자|ㄱ)/i,
  /(아이디|id)\s*[:：]\s*\S+/i,
  /@[a-z0-9._]{3,}/i,                               // SNS 핸들
];

// 명백한 욕설·비방 위주 (일반 대화까지 막지 않도록 최소한으로)
const BAD_WORDS = [
  "시발","씨발","씨빨","ㅅㅂ","시1발","병신","ㅂㅅ","좆","존나","ㅈ같",
  "개새끼","새끼","니미","엠창","지랄","꺼져","닥쳐","미친놈","미친년",
  "창녀","걸레","보지","자지","섹스","야동","도박","토토","먹튀","카지노",
];

const REPEAT = /(.)\1{9,}/;         // 같은 글자 10회 이상
const ONLY_SYMBOL = /^[^가-힣a-zA-Z0-9]+$/;

export function validateComment({ nick, text }) {
  const n = (nick || "").trim();
  const t = (text || "").trim();

  if (!t) return { ok: false, reason: "내용을 입력해주세요." };
  if (t.length > MAX_LEN) return { ok: false, reason: `${MAX_LEN}자까지 쓸 수 있어요.` };
  if (n.length > MAX_NICK) return { ok: false, reason: `닉네임은 ${MAX_NICK}자까지예요.` };
  if (t.length < 2) return { ok: false, reason: "너무 짧아요." };
  if (ONLY_SYMBOL.test(t)) return { ok: false, reason: "내용을 입력해주세요." };
  if (REPEAT.test(t)) return { ok: false, reason: "같은 글자를 너무 많이 반복했어요." };

  const joined = `${n} ${t}`.replace(/\s+/g, " ");

  for (const re of CONTACT_PATTERNS) {
    if (re.test(joined)) {
      return {
        ok: false,
        reason: "연락처나 링크는 남길 수 없어요. 안전을 위한 제한이에요.",
      };
    }
  }

  const compact = joined.replace(/[\s.,!?~^]/g, "").toLowerCase();
  for (const w of BAD_WORDS) {
    if (compact.includes(w)) {
      return { ok: false, reason: "부적절한 표현이 포함되어 있어요." };
    }
  }

  return { ok: true, nick: n || "익명", text: t };
}
