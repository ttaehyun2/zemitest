import Link from "next/link";
import { ARTICLES } from "../lib/articles";
import { TESTS } from "../lib/tests";

// 카테고리별로 묶어서 보여줌. 테스트 추가는 lib/tests.js 에서만 하면 돼.
const CATEGORIES = [
  { key: "psych", label: "심리 테스트" },
  { key: "value", label: "성향·가치관 테스트" },
];

export default function Home() {
  return (
    <>
      <p className="page-eyebrow">ZEMI TEST</p>
      <h1 className="page-title">
        질문 몇 개로
        <br />
        나를 알아봅니다
      </h1>
      <p className="page-lead">
        연애 스타일부터 정치 성향, 경제관까지. 가볍게 테스트하고 결과는 친구들과
        공유해보세요. 테스트는 재미로, 해설은 진지하게.
      </p>

      {CATEGORIES.map((cat) => {
        const items = TESTS.filter((t) => t.category === cat.key);
        if (items.length === 0) return null;
        return (
          <div key={cat.key}>
            <div className="section-head">
              <h2>{cat.label}</h2>
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

      <div className="section-head">
        <h2>읽을거리</h2>
        <Link href="/articles">전체 보기 →</Link>
      </div>
      <div className="grid">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="tile">
            <h3 className="tile-title">{a.title}</h3>
            <p className="tile-desc">{a.excerpt}</p>
            <p className="tile-meta">
              {a.date} · {a.readMin}분 읽기
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
