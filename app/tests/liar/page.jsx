import LiarTest from "../../../components/tests/LiarTest";

export const metadata = {
  title: "거짓말 탐지력 테스트 - 나는 알아챌 수 있을까? (무료)",
  description: "20가지 상황으로 알아보는 거짓말 탐지 정확도. 사람의 평균 정확도는 54%입니다. 나는 몇 %일까?",
  keywords: ["거짓말 탐지", "거짓말 테스트", "거짓말 알아채기", "심리 탐지 테스트", "무료 심리테스트"],
  alternates: { canonical: "/tests/liar" },
  openGraph: {
    title: "거짓말 탐지력 테스트 - 나는 알아챌 수 있을까? (무료)",
    description: "20가지 상황으로 알아보는 거짓말 탐지 정확도. 사람의 평균 정확도는 54%입니다. 나는 몇 %일까?",
    url: "https://zemitest.com/tests/liar",
    images: [{ url: "/og/liar.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/liar.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "거짓말 탐지력 테스트 - 나는 알아챌 수 있을까? (무료)",
  url: "https://zemitest.com/tests/liar",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <LiarTest />
    </>
  );
}
