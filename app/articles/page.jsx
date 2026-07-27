import { ARTICLES } from "../../lib/articles";
import ArticleList from "../../components/ArticleList";

export const metadata = {
  title: "읽을거리 - 심리와 성향에 대한 이야기",
  description:
    "연애 심리, 스트레스 대처, 정치 성향, 돈 관리까지. 테스트 결과 뒤에 있는 이야기를 정리한 글 모음입니다.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "읽을거리 - 제미테스트",
    description: "테스트 결과 뒤에 있는 심리와 성향 이야기.",
    url: "https://zemitest.com/articles",
    images: [{ url: "/og/articles.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/articles.png"] },
};

export default function ArticlesPage() {
  return (
    <>
      <p className="page-eyebrow">ARTICLES</p>
      <h1 className="page-title">읽을거리</h1>
      <p className="page-lead">
        테스트 결과 뒤에 있는 심리를 조금 더 깊이 들여다봅니다. 현재 총{" "}
        {ARTICLES.length}편.
      </p>
      <ArticleList articles={ARTICLES} initial={3} />
    </>
  );
}
