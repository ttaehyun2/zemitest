import MoneyTest from "../../../components/MoneyTest";

export const metadata = {
  title: "경제력 테스트 - 나의 금융 습관 점수는?",
  description:
    "24문항 무료 경제력 테스트. 저축력, 소비 관리, 금융 이해, 위험 대비 4개 영역을 100점 만점으로 진단하고 S~D 등급을 확인해보세요.",
  keywords: [
    "경제력 테스트",
    "금융 이해력 테스트",
    "돈 관리 테스트",
    "재테크 테스트",
    "무료 경제 테스트",
    "소비 성향 테스트",
  ],
  twitter: { card: "summary_large_image", images: ["/og/money.png"] },
  alternates: { canonical: "/tests/money" },
  openGraph: {
    title: "경제력 테스트 - 나의 금융 습관 점수는?",
    description: "24문항으로 진단하는 나의 경제력 100점 만점 점수. 지금 무료로 확인해보세요!",
    url: "https://zemitest.com/tests/money",
    images: [{ url: "/og/money.png", width: 1200, height: 630 }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "나의 경제력 테스트",
  description: "24문항으로 진단하는 금융 습관 무료 테스트",
  url: "https://zemitest.com/tests/money",
  inLanguage: "ko-KR",
};

export default function MoneyTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <MoneyTest />
    </>
  );
}
