import { ARTICLES } from "../lib/articles";

const BASE = "https://zemitest.com";

export default function sitemap() {
  const staticPages = [
  "",
  "/tests",
  "/articles",
  "/about",
  "/privacy",
  "/contact",
  "/tests/love",
  "/tests/pastlife",
  "/tests/stress",
  "/tests/money",
  "/tests/politics",
  "/tests/love/types",
  "/tests/pastlife/types",
  "/tests/stress/types",
  "/tests/money/types",
  "/tests/politics/types",
];
  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
    })),
    ...ARTICLES.map((a) => ({
      url: `${BASE}/articles/${a.slug}`,
      lastModified: new Date(a.date),
    })),
  ];
}
