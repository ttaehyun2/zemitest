import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "../../../lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "list":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "mine":
      // 배포 전에 실제 내용으로 바꿔야 하는 자리
      return (
        <div className="mine">
          <p className="mine-title">{block.title}</p>
          <p className="mine-text">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <article className="article">
      <div className="article-head">
        <p className="page-eyebrow">연애 심리</p>
        <h1>{article.title}</h1>
        <p className="article-meta">
          {article.date} · 약 {article.readMin}분 읽기
        </p>
      </div>

      {article.blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}

      <Link href="/tests/love" className="article-cta">
        나의 연애 유형이 궁금하다면? 테스트 하러 가기 →
      </Link>
    </article>
  );
}
