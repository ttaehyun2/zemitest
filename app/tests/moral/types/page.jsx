import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { TYPES } from "../../../../lib/moralTest";

export const metadata = {
  title: "도덕관 6가지 전체 설명",
  description: "다수와 소수, 행동과 방관, 원칙과 결과. 서로 부딪히는 가치 앞에서 나뉘는 여섯 가지 관점입니다. 어떤 관점도 정답이나 오답이 아닙니다.",
  alternates: { canonical: "/tests/moral/types" },
  openGraph: { images: [{ url: "/og/moral.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = Object.values(TYPES).map((t) => ({
    key: t.key, emoji: t.emoji, name: t.name, tagline: t.tagline,
    grad: t.grad, desc: t.desc,
    meta: t.school ? `📖 ${t.school}` : (t.epitaph ? `「${t.epitaph}」` : null),
    lists: t.strengths
      ? [
          { title: "이 관점의 강점", items: t.strengths },
          { title: "놓치기 쉬운 것", items: t.cautions },
        ]
      : [
          { title: "사람들이 기억할 장면", items: [t.scene] },
          { title: "지금 해두면 좋을 것", items: [t.now] },
        ],
    footer: t.quote || null,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">도덕관 6가지 전체 설명</h1>
      <p className="page-lead">다수와 소수, 행동과 방관, 원칙과 결과. 서로 부딪히는 가치 앞에서 나뉘는 여섯 가지 관점입니다. 어떤 관점도 정답이나 오답이 아닙니다.</p>
      <TypeDirectory items={items} backHref="/tests/moral" backLabel="테스트 하러 가기" />
      <Comments pageId="test-moral" title="다들 뭐 나왔어요?" />
    </>
  );
}
