import StockTest from "../../../components/StockTest";

export const metadata = {
  title: "주식 생존력 테스트 - 나는 얼마나 버틸까? (무료)",
  description:
    "22개 상황으로 알아보는 계좌 생존 기간과 생존 확률. 존버형·한방형·분석형 등 투자 심리 유형과 사기 판별력까지 확인해보세요.",
  keywords: [
    "주식 테스트",
    "투자 성향 테스트",
    "주식 생존",
    "투자 심리 테스트",
    "존버 테스트",
    "리딩방 사기",
  ],
  alternates: { canonical: "/tests/stock" },
  openGraph: {
    title: "주식 생존력 테스트 - 나는 얼마나 버틸까?",
    description: "계좌 예상 수명과 생존 확률을 계산해드립니다.",
    url: "https://zemitest.com/tests/stock",
    images: [{ url: "/og/stock.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/stock.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "주식 생존력 테스트",
  url: "https://zemitest.com/tests/stock",
  image: "https://zemitest.com/og/stock.png",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <StockTest />
    </>
  );
}
