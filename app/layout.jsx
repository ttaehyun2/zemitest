import "./globals.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://example.com"), // ← 도메인 사면 여기 바꾸기
  title: {
    default: "연애 세계관 — 심리 테스트와 연애 심리 이야기",
    template: "%s | 연애 세계관",
  },
  description:
    "연애 유형 테스트와 연애 심리 이야기를 다루는 공간입니다. 나의 연애 스타일을 알아보고, 그 뒤에 있는 심리를 함께 읽어보세요.",
  openGraph: {
    type: "website",
    siteName: "연애 세계관",
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
                💫 연애 세계관
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
            <div>© 2026 연애 세계관. All rights reserved.</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
