import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/islandTest";

export const metadata = {
  title: "무인도 생존 등급 5단계",
  description: "생존력 점수에 따라 나뉘는 다섯 단계와 예상 생존 일수입니다. 실제 생존에서 가장 중요한 순서는 물 → 체온 → 신호 → 식량입니다.",
  keywords: ["무인도 생존 등급", "생존력 수준", "생존 일수"],
  alternates: { canonical: "/tests/island/types" },
  openGraph: { images: [{ url: "/og/island.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = LEVELS.map((l) => ({
    key: l.key || l.name,
    emoji: l.emoji,
    name: l.name,
    tagline: l.label || `점수 ${l.min}점 이상`,
    grad: l.grad,
    desc: l.desc,
    lists: l.tip ? [{ title: "한마디", items: [l.tip] }] : [],
  }));

  return (
    <>
      <p className="page-eyebrow">LEVEL GUIDE</p>
      <h1 className="page-title">🏝️ 무인도 생존 등급 5단계</h1>
      <p className="page-lead">생존력 점수에 따라 나뉘는 다섯 단계와 예상 생존 일수입니다. 실제 생존에서 가장 중요한 순서는 물 → 체온 → 신호 → 식량입니다.</p>
      <TypeDirectory items={items} backHref="/tests/island" backLabel="무인도 생존력 테스트 하러 가기" />
      <Comments pageId="test-island" title="다들 뭐 나왔어요?" />
    </>
  );
}
