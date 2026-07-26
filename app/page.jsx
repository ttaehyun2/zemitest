import Link from "next/link";
import { ARTICLES } from "../lib/articles";

export default function Home() {
  return (
    <>
      <p className="page-eyebrow">LOVE UNIVERSE</p>
      <h1 className="page-title">
        나를 알아야
        <br />
        연애가 보입니다
      </h1>
      <p className="page-lead">
        연애 유형 테스트로 나의 스타일을 알아보고, 그 뒤에 숨은 심리까지 함께
        읽어보세요. 테스트는 재미로, 해설은 진지하게.
      </p>

      <div className="section-head">
        <h2>심리 테스트</h2>
      </div>
      <div className="grid">
        <Link href="/tests/love" className="tile">
          <span className="tile-emoji">💘</span>
          <h3 className="tile-title">나의 연애 세계관 테스트</h3>
          <p className="tile-desc">
            10개의 질문으로 알아보는 나의 연애 유형. 6가지 세계관 중 나는 어디에?
          </p>
          <p className="tile-meta">10문항 · 약 1분</p>
        </Link>

        {/* 테스트를 더 만들면 여기에 추가하면 돼 */}
        <div className="tile soon">
          <span className="tile-emoji">🔮</span>
          <h3 className="tile-title">전생에 나는 뭐였을까</h3>
          <p className="tile-desc">준비 중입니다.</p>
          <p className="tile-meta">COMING SOON</p>
        </div>
        <div className="tile soon">
          <span className="tile-emoji">🌿</span>
          <h3 className="tile-title">스트레스 유형과 힐링 처방</h3>
          <p className="tile-desc">준비 중입니다.</p>
          <p className="tile-meta">COMING SOON</p>
        </div>
      </div>

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
