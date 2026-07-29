import LoveTest from "../../../components/LoveTest";

export const metadata = {
  title: "연애 세계관 테스트 - 무료 연애 심리테스트",
  description:
    "20문항 무료 연애 심리테스트. 금사빠, 밀당의 신, 순애보, 철벽, 자유로운 나비, 전략가 중 나의 연애 유형은? 유형별 퍼센트와 궁합까지 확인해보세요.",
  keywords: [
    "연애테스트",
    "연애 심리테스트",
    "무료 연애테스트",
    "연애 유형 테스트",
    "썸 테스트",
    "연애 궁합 테스트",
  ],
  twitter: { card: "summary_large_image", images: ["/og/love.png"] },
  alternates: { canonical: "/tests/love" },
  openGraph: {
    title: "연애 세계관 테스트 - 나의 연애 유형은?",
    description: "20문항으로 알아보는 나의 연애 유형과 궁합. 지금 무료로 시작해보세요!",
    url: "https://zemitest.com/tests/love",
    images: [{ url: "/og/love.png", width: 1200, height: 630 }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "나의 연애 세계관 테스트",
  description: "20문항으로 알아보는 나의 연애 유형 무료 심리테스트",
  url: "https://zemitest.com/tests/love",
  image: "https://zemitest.com/og/love.png",
  inLanguage: "ko-KR",
};

export default function LoveTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <LoveTest />
    </>
  );
}
