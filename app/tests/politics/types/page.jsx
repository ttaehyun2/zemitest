import Link from "next/link";
import Comments from "../../../../components/Comments";
import TypeDirectory from "../../../../components/TypeDirectory";
import { QUADRANTS } from "../../../../lib/politicsTest";

export const metadata = {
  title: "정치 성향 5가지 유형 전체 설명",
  description:
    "진보적 자유주의, 공동체 중심주의, 자유지상주의, 전통적 보수주의, 중도 실용주의. 두 축 좌표가 만드는 다섯 가지 정치 성향을 설명합니다.",
  keywords: ["정치 성향 종류", "정치 좌표 유형", "자유지상주의", "사회민주주의", "정치 성향 뜻"],
  alternates: { canonical: "/tests/politics/types" },
  openGraph: { images: [{ url: "/og/politics.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const order = ["libLeft", "authLeft", "libRight", "authRight", "center"];
  const items = order.map((k) => {
    const t = QUADRANTS[k];
    return {
      key: t.key,
      emoji: t.emoji,
      name: t.name,
      tagline: t.tagline,
      grad: t.grad,
      desc: t.desc,
      lists: [{ title: "주요 특징", items: t.traits }],
    };
  });

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">정치 성향 5가지 유형</h1>
      <p className="page-lead">
        진보↔보수 축과 자유↔사회 축이 만드는 네 개의 사분면, 그리고
        중앙에 가까운 중도까지 다섯 가지를 설명합니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/politics" backLabel="정치 성향 테스트 하러 가기" />
      <div className="section-head">
        <h2>함께 읽어보기</h2>
      </div>
      <div className="grid">
        <Link href="/articles/left-right-origin" className="tile">
          <h3 className="tile-title">좌파와 우파, 그 말은 어디서 왔을까</h3>
        </Link>
        <Link href="/articles/korea-political-axis" className="tile">
          <h3 className="tile-title">한국의 진보와 보수는 왜 서구와 다를까</h3>
        </Link>
        <Link href="/articles/political-nature-nurture" className="tile">
          <h3 className="tile-title">정치 성향은 타고나는 걸까, 만들어지는 걸까</h3>
        </Link>
        <Link href="/articles/political-conversation" className="tile">
          <h3 className="tile-title">정치 이야기로 싸우지 않는 법</h3>
        </Link>
      </div>

      <p className="disclaimer">
        이 분류는 성향을 대략적으로 살펴보기 위한 것으로, 특정 정당이나 입장을
        지지하거나 권유하지 않습니다.
      </p>
      <Comments pageId="test-politics" title="다들 뭐 나왔어요?" />
    </>
  );
}
