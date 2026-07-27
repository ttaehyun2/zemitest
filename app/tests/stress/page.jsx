import StressTest from "../../../components/StressTest";

export const metadata = {
  title: "스트레스 유형 테스트 - 나의 힐링 처방은? (무료)",
  description:
    "24문항 무료 스트레스 유형 테스트. 폭발형, 결빙형, 반추형, 회피형, 통제형, 연결형, 보상형, 가면형 8가지 유형과 나에게 맞는 힐링 처방을 확인해보세요.",
  keywords: [
    "스트레스 테스트",
    "스트레스 유형 테스트",
    "무료 스트레스 테스트",
    "스트레스 해소법",
    "힐링 테스트",
    "심리테스트 스트레스",
  ],
  twitter: { card: "summary_large_image", images: ["/og/stress.png"] },
  alternates: { canonical: "/tests/stress" },
  openGraph: {
    title: "스트레스 유형 테스트 - 나의 힐링 처방은?",
    description: "스트레스의 크기가 아니라 반응 방식을 봅니다. 8가지 유형과 맞춤 힐링 처방까지.",
    url: "https://zemitest.com/tests/stress",
    images: [{ url: "/og/stress.png", width: 1200, height: 630 }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "스트레스 유형과 힐링 처방 테스트",
  description: "24문항으로 알아보는 스트레스 반응 유형 무료 테스트",
  url: "https://zemitest.com/tests/stress",
  inLanguage: "ko-KR",
};

export default function StressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <StressTest />
    </>
  );
}
