import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/nunchiTest";

export const metadata = {
  title: "눈치 등급 5단계",
  description: "상황 판단 점수에 따라 나뉘는 다섯 단계입니다. 눈치가 좋다는 건 남의 비위를 맞춘다는 뜻이 아니라, 상황을 정확히 읽는다는 뜻입니다.",
  keywords: ["눈치 등급", "눈치력 수준", "상황 판단력"],
  alternates: { canonical: "/tests/nunchi/types" },
  openGraph: { images: [{ url: "/og/nunchi.png", width: 1200, height: 630 }] },
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
      <h1 className="page-title">👀 눈치 등급 5단계</h1>
      <p className="page-lead">상황 판단 점수에 따라 나뉘는 다섯 단계입니다. 눈치가 좋다는 건 남의 비위를 맞춘다는 뜻이 아니라, 상황을 정확히 읽는다는 뜻입니다.</p>
      <TypeDirectory items={items} backHref="/tests/nunchi" backLabel="눈치 테스트 하러 가기" />
      <div className="section-head">
        <h2>함께 읽어보기</h2>
      </div>
      <div className="grid">
        <Link href="/articles/nunchi-nature" className="tile">
          <h3 className="tile-title">눈치 보는 성격, 정말 고쳐야 할까</h3>
        </Link>
      </div>

      <Comments pageId="test-nunchi" title="다들 뭐 나왔어요?" />
    </>
  );
}
