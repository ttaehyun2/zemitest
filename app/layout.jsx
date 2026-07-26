import "./globals.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://zemitest.com"),
  title: {
    default: "제미테스트 - 심리 테스트 | 정치 성향 테스트 | 무료 성향 테스트",
    template: "%s | 제미테스트",
  },
  description:
    "질문 몇 개로 나를 알아보는 재미있는 무료 심리 테스트 모음. 연애 세계관 테스트, 경제력 테스트, 정치 성향 좌표 테스트를 지금 무료로 시작해보세요!",
  keywords: [
    "심리테스트",
    "무료 심리테스트",
    "성향테스트",
    "연애테스트",
    "연애 심리테스트",
    "정치성향 테스트",
    "정치성향 좌표",
    "경제력 테스트",
    "무료 테스트",
    "테스트 모음",
    "제미테스트",
  ],
  applicationName: "제미테스트",
  authors: [{ name: "제미테스트" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "제미테스트",
    locale: "ko_KR",
    title: "제미테스트 - 무료 심리 테스트 모음",
    description:
      "연애 세계관, 경제력, 정치 성향까지. 질문 몇 개로 나를 알아보는 무료 심리 테스트를 지금 시작해보세요!",
    url: "https://zemitest.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "제미테스트 - 무료 심리 테스트 모음",
    description:
      "연애 세계관, 경제력, 정치 성향까지. 질문 몇 개로 나를 알아보는 무료 심리 테스트.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // 구글 서치콘솔 / 네이버 서치어드바이저에서 받은 코드를 여기 넣으면 돼
    google: "",
    other: {
      "naver-site-verification": "ba4efdcb325d36b84837f35f97dd1091867ac464",
    },
  },
};

// 검색엔진이 사이트 성격을 정확히 인식하도록 돕는 구조화 데이터
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "제미테스트",
  alternateName: "ZEMI TEST",
  url: "https://zemitest.com",
  description:
    "연애 세계관, 경제력, 정치 성향 등 무료 심리 테스트와 성향 테스트를 제공하는 사이트",
  inLanguage: "ko-KR",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zemitest.com/articles?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard: 한글 가독성이 좋은 웹폰트. 동적 서브셋이라 용량 부담이 적음 */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <div className="site">
          <header>
            <nav className="nav">
              <Link href="/" className="nav-logo">
                🧩 제미테스트
              </Link>
              <div className="nav-links">
                <Link href="/tests/love">테스트</Link>
                <Link href="/articles">읽을거리</Link>
                <Link href="/about">소개</Link>
              </div>
            </nav>
          </header>

          <main className="main">{children}</main>

          <footer className="footer">
            <div className="footer-links">
              <Link href="/about">사이트 소개</Link>
              <Link href="/privacy">개인정보처리방침</Link>
              <Link href="/contact">문의하기</Link>
            </div>
            <div>© 2026 제미테스트 (zemitest.com). All rights reserved.</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
