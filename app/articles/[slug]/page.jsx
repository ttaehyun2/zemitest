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
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://zemitest.com/articles/${article.slug}`,
      publishedTime: article.date,
      images: [
        { url: `/og/${article.og || "articles"}.png`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/og/${article.og || "articles"}.png`],
    },
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
    case "faq":
      return (
        <div className="faq">
          {block.items.map((it, i) => (
            <div className="faq-item" key={i}>
              <p className="faq-q">Q. {it.q}</p>
              <p className="faq-a">{it.a}</p>
            </div>
          ))}
        </div>
      );
    case "note":
      return (
        <aside className="note">
          <p className="note-title">{block.title}</p>
          <p className="note-text">{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: "제미테스트" },
    publisher: { "@type": "Organization", name: "제미테스트" },
    mainEntityOfPage: `https://zemitest.com/articles/${article.slug}`,
  };

  return (
    <article className="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
