import "./globals.css";
import Link from "next/link";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://zemitest.com"),
  title: {
    default: "제미테스트 - 심리 테스트 | 정치 성향 테스트 | 무료 성향 테스트",
    template: "%s | 제미테스트",
  },
  description:
    "인생 시뮬레이션, 눈치 테스트, 연애 세계관, 정치 성향까지 17가지 무료 심리 테스트. 결과는 상위 %와 함께 나오고 친구들과 바로 공유할 수 있습니다.",
  keywords: [
    "인생 시뮬레이션",
    "눈치 테스트",
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
  // 구글은 48의 배수 정사각형 파비콘을 권장합니다
  icons: {
    icon: [
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "제미테스트",
    locale: "ko_KR",
    title: "제미테스트 - 무료 심리 테스트 모음",
    description:
      "인생 시뮬레이션부터 눈치·연애·정치 성향까지 17가지 무료 심리 테스트. 지금 바로 시작해보세요!",
    url: "https://zemitest.com",
    images: [
      { url: "/og/default.png", width: 1200, height: 630, alt: "제미테스트" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "제미테스트 - 무료 심리 테스트 모음",
    description:
      "인생 시뮬레이션부터 눈치·연애·정치 성향까지 17가지 무료 심리 테스트.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // 구글 서치콘솔 / 네이버 서치어드바이저에서 받은 코드를 여기 넣으면 돼
    google: "OZHWRi-8ODrizBiMSvirCi-TGHeXRvrDFYzIYQAXFO8",
    other: {
      "naver-site-verification": "ba4efdcb325d36b84837f35f97dd1091867ac464",
    },
  },
};

// 애드센스 게시자 ID. Vercel 환경변수 NEXT_PUBLIC_ADSENSE_ID 에 넣으면 적용됩니다.
// 값이 없으면 광고 스크립트를 아예 넣지 않으므로 개발 중에도 문제가 없습니다.
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "";

// 검색엔진이 사이트 성격을 정확히 인식하도록 돕는 구조화 데이터
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "제미테스트",
  alternateName: "ZEMI TEST",
  url: "https://zemitest.com",
  description:
    "인생 시뮬레이션, 눈치, 연애, 정치 성향 등 17가지 무료 심리 테스트를 제공하는 사이트",
  inLanguage: "ko-KR",
  image: "https://zemitest.com/og/default.png",
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
        {/* 구글 애드센스. 심사와 광고 노출 모두 이 스크립트가 필요합니다. */}
        {ADSENSE_ID && (
          <meta name="google-adsense-account" content={ADSENSE_ID} />
        )}

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

        {/* 구글 애드센스 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8750108826783588"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <div className="site">
          <header>
            <nav className="nav">
              <Link href="/" className="nav-logo">
                <span className="nav-logo-mark">🧩</span>
                <span className="nav-logo-text">제미테스트</span>
              </Link>
              <div className="nav-links">
                <Link href="/tests">테스트</Link>
                <Link href="/articles">읽을거리</Link>
                <Link href="/about">소개</Link>
              </div>
            </nav>
          </header>

          <main className="main">{children}</main>

          <footer className="footer">
            <div className="footer-inner">
            <div className="footer-links">
              <Link href="/about">사이트 소개</Link>
              <Link href="/privacy">개인정보처리방침</Link>
              <Link href="/contact">문의하기</Link>
            </div>
            <div>© 2026 제미테스트 (zemitest.com). All rights reserved.</div>
            </div>
          </footer>
        </div>

        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
