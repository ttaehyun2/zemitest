import SpendingTest from "../../../components/SpendingTest";

export const metadata = {
  title: "소비 성향 테스트 - 나는 어떤 소비 유형? (무료)",
  description:
    "22문항 무료 소비 성향 테스트. 플렉스형, 짠테크형, 계획형, 가치소비형, 충동형, 가성비형, 관계형, 브랜드형 중 나의 소비 유형은?",
  keywords: [
    "소비 성향 테스트",
    "소비 유형 테스트",
    "돈 쓰는 스타일",
    "플렉스 짠테크",
    "무료 소비테스트",
    "지출 성향",
  ],
  alternates: { canonical: "/tests/spending" },
  openGraph: {
    title: "소비 성향 테스트 - 나는 어떤 소비 유형?",
    description: "22문항으로 알아보는 나의 소비 성향. 8가지 유형 중 나는?",
    url: "https://zemitest.com/tests/spending",
    images: [{ url: "/og/spending.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/spending.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "소비 성향 테스트",
  description: "22문항으로 알아보는 소비 성향 무료 테스트",
  url: "https://zemitest.com/tests/spending", inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <SpendingTest />
    </>
  );
}
