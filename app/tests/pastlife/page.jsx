import PastLifeTest from "../../../components/PastLifeTest";

export const metadata = {
  title: "전생 테스트 - 전생에 나는 무엇이었을까? (무료)",
  description:
    "28문항 무료 전생 테스트. 왕, 장수, 학자, 자객, 무당, 상인, 광대, 농부, 수도자, 유랑객, 의원, 의적 12가지 전생 중 나는 누구였을까?",
  keywords: [
    "전생 테스트",
    "전생 심리테스트",
    "무료 전생테스트",
    "전생에 나는",
    "전생 직업 테스트",
    "재미있는 심리테스트",
  ],
  twitter: { card: "summary_large_image", images: ["/og/pastlife.png"] },
  alternates: { canonical: "/tests/pastlife" },
  openGraph: {
    title: "전생 테스트 - 전생에 나는 무엇이었을까?",
    description: "28문항으로 찾아가는 나의 전생. 12가지 인물 중 당신은 누구였을까요?",
    url: "https://zemitest.com/tests/pastlife",
    images: [{ url: "/og/pastlife.png", width: 1200, height: 630 }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "전생 테스트",
  description: "28문항으로 알아보는 나의 전생 무료 심리테스트",
  url: "https://zemitest.com/tests/pastlife",
  inLanguage: "ko-KR",
};

export default function PastLifePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <PastLifeTest />
    </>
  );
}
