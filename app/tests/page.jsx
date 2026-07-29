import { TESTS } from "../../lib/tests";
import TestGrid from "../../components/TestGrid";

export const metadata = {
  title: "전체 테스트 - 무료 심리테스트 모음",
  description:
    "제미테스트의 모든 심리 테스트를 한곳에서. 연애 세계관, 전생, 동물, 스트레스, 정치 성향, 직업 가치관, 소비 성향, 경제력 테스트를 무료로 즐겨보세요.",
  keywords: ["심리테스트 모음", "무료 테스트", "성향 테스트", "테스트 모음 사이트"],
  alternates: { canonical: "/tests" },
  openGraph: {
    title: "무료 심리 테스트 모음 - 제미테스트",
    description: "가입 없이 바로 할 수 있는 성향 테스트 모음.",
    url: "https://zemitest.com/tests",
    images: [{ url: "/og/tests.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/tests.png"] },
};

const CATEGORIES = [
  { key: "sim", label: "인생 시뮬레이션", sub: "선택이 쌓여 결말이 갈리는 게임" },
  { key: "score", label: "점수·랭킹 테스트", sub: "점수와 등수가 나오는 테스트" },
  { key: "psych", label: "심리 테스트", sub: "성격과 마음을 들여다보는 테스트" },
  { key: "value", label: "성향·가치관 테스트", sub: "생각과 판단의 기준을 확인하는 테스트" },
];

export default function TestsPage() {
  const ready = TESTS.filter((t) => t.ready).length;

  return (
    <>
      <p className="page-eyebrow">ALL TESTS</p>
      <h1 className="page-title">전체 테스트</h1>
      <p className="page-lead">
        현재 {ready}개의 테스트가 준비되어 있습니다. 모두 무료이고 가입 없이 바로
        할 수 있습니다.
      </p>

      {CATEGORIES.map((cat) => {
        const items = TESTS.filter((t) => t.category === cat.key);
        if (!items.length) return null;
        return (
          <div key={cat.key}>
            <div className="section-head section-head-stack">
              <h2>{cat.label}</h2>
              <p className="section-sub">{cat.sub}</p>
            </div>
            <TestGrid tests={items} initial={3} />
          </div>
        );
      })}
    </>
  );
}
