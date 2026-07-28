import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { TYPES } from "../../../../lib/legacyTest";

export const metadata = {
  title: "기억되는 모습 8가지",
  description: "사람들이 나를 떠올릴 때 남는 모습 여덟 가지입니다. 더 나은 삶도 못한 삶도 없으며, 각자 다른 방식으로 남습니다.",
  alternates: { canonical: "/tests/legacy/types" },
  openGraph: { images: [{ url: "/og/legacy.png", width: 1200, height: 630 }] },
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
      <h1 className="page-title">기억되는 모습 8가지</h1>
      <p className="page-lead">사람들이 나를 떠올릴 때 남는 모습 여덟 가지입니다. 더 나은 삶도 못한 삶도 없으며, 각자 다른 방식으로 남습니다.</p>
      <TypeDirectory items={items} backHref="/tests/legacy" backLabel="테스트 하러 가기" />
      <Comments pageId="test-legacy" title="다들 뭐 나왔어요?" />
    </>
  );
}
