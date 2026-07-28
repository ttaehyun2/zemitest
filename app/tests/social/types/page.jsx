import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/socialTest";

export const metadata = {
  title: "사회생활 생존 등급 5단계",
  description: "처세 점수에 따라 나뉘는 다섯 단계입니다. 사회생활을 잘한다는 건 비위를 맞춘다는 뜻이 아니라, 선을 지키면서 나도 지킨다는 뜻입니다.",
  alternates: { canonical: "/tests/social/types" },
  openGraph: { images: [{ url: "/og/social.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = LEVELS.map((l) => ({
    key: l.key || l.name,
    emoji: l.emoji,
    name: l.name,
    tagline: `${l.min}점 이상`,
    grad: l.grad,
    desc: l.desc,
    lists: l.tip ? [{ title: "한마디", items: [l.tip] }] : [],
  }));

  return (
    <>
      <p className="page-eyebrow">LEVEL GUIDE</p>
      <h1 className="page-title">🎖️ 사회생활 생존 등급 5단계</h1>
      <p className="page-lead">처세 점수에 따라 나뉘는 다섯 단계입니다. 사회생활을 잘한다는 건 비위를 맞춘다는 뜻이 아니라, 선을 지키면서 나도 지킨다는 뜻입니다.</p>
      <TypeDirectory items={items} backHref="/tests/social" backLabel="사회생활 테스트 하러 가기" />
      <Comments pageId="test-social" title="다들 뭐 나왔어요?" />
    </>
  );
}
