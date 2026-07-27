import Link from "next/link";
import { TESTS } from "../../lib/tests";

export const metadata = {
  title: "전체 테스트 - 무료 심리테스트 모음",
  description:
    "제미테스트의 모든 심리 테스트를 한곳에서. 연애 세계관, 전생, 스트레스 유형, 정치 성향, 경제력 테스트를 무료로 즐겨보세요.",
  keywords: ["심리테스트 모음", "무료 테스트", "성향 테스트", "테스트 모음 사이트"],
  alternates: { canonical: "/tests" },
  openGraph: {
    title: "무료 심리 테스트 모음 - 제미테스트",
    description: "가입 없이 바로 할 수 있는 5가지 성향 테스트.",
    url: "https://zemitest.com/tests",
    images: [{ url: "/og/tests.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/tests.png"] },
};

const CATEGORIES = [
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
            <div className="section-head">
              <h2>{cat.label}</h2>
              <span className="section-sub">{cat.sub}</span>
            </div>
            <div className="grid">
              {items.map((t) =>
                t.ready ? (
                  <Link key={t.slug} href={t.href} className="tile">
                    <span className="tile-emoji">{t.emoji}</span>
                    <h3 className="tile-title">{t.title}</h3>
                    <p className="tile-desc">{t.desc}</p>
                    <p className="tile-meta">{t.meta}</p>
                  </Link>
                ) : (
                  <div key={t.slug} className="tile soon">
                    <span className="tile-emoji">{t.emoji}</span>
                    <h3 className="tile-title">{t.title}</h3>
                    <p className="tile-desc">준비 중입니다.</p>
                    <p className="tile-meta">COMING SOON</p>
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
