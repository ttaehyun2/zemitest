import CareerTest from "../../../components/CareerTest";

export const metadata = {
  title: "직업 가치관 테스트 - 나는 일에서 뭘 원할까? (무료)",
  description:
    "24문항 무료 직업 가치관 테스트. 성취, 안정, 보상, 자율, 관계, 의미, 균형, 전문성 8가지 중 내가 일에서 가장 중요하게 여기는 것은?",
  keywords: [
    "직업 가치관 테스트",
    "진로 적성 테스트",
    "직업 가치관 검사",
    "무료 진로 테스트",
    "커리어 성향 테스트",
    "일 가치관",
  ],
  alternates: { canonical: "/tests/career" },
  openGraph: {
    title: "직업 가치관 테스트 - 나는 일에서 뭘 원할까?",
    description: "24문항으로 알아보는 나의 직업 가치관. 8가지 유형 중 나는?",
    url: "https://zemitest.com/tests/career",
    images: [{ url: "/og/career.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/career.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "직업 가치관 테스트",
  description: "24문항으로 알아보는 직업 가치관 무료 테스트",
  url: "https://zemitest.com/tests/career", image: "https://zemitest.com/og/career.png", inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <CareerTest />
    </>
  );
}
