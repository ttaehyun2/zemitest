import Link from "next/link";
import { ARTICLES } from "../../lib/articles";

export const metadata = {
  title: "읽을거리",
  description: "연애 심리에 대한 글 모음. 유형별 심리와 관계의 작동 원리를 다룹니다.",
};

export default function ArticlesPage() {
  return (
    <>
      <p className="page-eyebrow">ARTICLES</p>
      <h1 className="page-title">읽을거리</h1>
      <p className="page-lead">
        테스트 결과 뒤에 있는 심리를 조금 더 깊이 들여다봅니다.
      </p>
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
