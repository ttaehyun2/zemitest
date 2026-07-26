import "./globals.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://zemitest.com"),
  title: {
    default: "제미테스트 — 나를 알아보는 성향 테스트 모음",
    template: "%s | 제미테스트",
  },
  description:
    "연애 스타일부터 정치 성향, 경제관까지. 재미있는 테스트로 나를 알아보고 결과를 친구들과 공유해보세요.",
  keywords: ["심리테스트", "성향테스트", "연애테스트", "정치성향테스트", "무료 심리테스트"],
  openGraph: {
    type: "website",
    siteName: "제미테스트",
    locale: "ko_KR",
  },
  verification: {
    // 구글 서치콘솔 / 네이버 서치어드바이저에서 받은 코드를 여기 넣으면 돼
    google: "",
    other: {
      "naver-site-verification": "",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
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
