import { ARTICLES } from "../lib/articles";

const BASE = "https://zemitest.com";

export default function sitemap() {
  const staticPages = ["", "/tests/love", "/tests/money", "/tests/politics", "/articles", "/about", "/privacy", "/contact"];
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
