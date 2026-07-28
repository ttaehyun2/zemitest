import Link from "next/link";
import Comments from "../../../../components/Comments";
import TypeDirectory from "../../../../components/TypeDirectory";
import { TYPES } from "../../../../lib/spendingTest";

export const metadata = {
  title: "소비 성향 8가지 전체 설명",
  description:
    "플렉스형, 짠테크형, 계획형, 가치소비형, 충동형, 가성비형, 관계형, 브랜드형. 8가지 소비 유형의 습관과 관리법을 설명합니다.",
  keywords: ["소비 유형 종류", "소비 성향 분류", "돈 쓰는 유형", "지출 습관"],
  alternates: { canonical: "/tests/spending/types" },
  openGraph: { images: [{ url: "/og/spending.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = Object.values(TYPES).map((t) => ({
    key: t.key, emoji: t.emoji, name: t.name, tagline: t.tagline,
    grad: t.grad, desc: t.desc,
    lists: [
      { title: "🛒 소비 습관", items: [t.habit] },
      { title: "🚨 점검 신호", items: [t.warning] },
      { title: "💡 관리법", items: t.tips },
    ],
    footer: `균형을 맞춰줄 유형: ${TYPES[t.best].emoji} ${TYPES[t.best].name}`,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">소비 성향 8가지</h1>
      <p className="page-lead">
        돈을 쓰는 방식에 따라 나뉘는 여덟 가지 유형입니다. 어떤 유형이든 장점과
        약점이 함께 있으며, 자기 방식을 알고 있는 것만으로도 관리가 훨씬 쉬워집니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/spending" backLabel="소비 성향 테스트 하러 가기" />

      <div className="section-head">
        <h2>함께 해보기</h2>
      </div>
      <div className="grid">
        <Link href="/tests/money" className="tile">
          <span className="tile-emoji">💰</span>
          <h3 className="tile-title">경제력 테스트</h3>
          <p className="tile-desc">소비 성향이 &lsquo;방식&rsquo;이라면, 경제력 테스트는 &lsquo;점수&rsquo;입니다. 4개 영역을 100점 만점으로 진단합니다.</p>
        </Link>
        <Link href="/articles/compound-interest" className="tile">
          <h3 className="tile-title">복리는 왜 대부분 체감되지 않을까</h3>
        </Link>
      </div>

      <p className="disclaimer">
        이 분류는 소비 습관을 돌아보기 위한 참고 자료이며, 재무 상담을 대신하지
        않습니다.
      </p>
      <Comments pageId="test-spending" title="다들 뭐 나왔어요?" />
    </>
  );
}
