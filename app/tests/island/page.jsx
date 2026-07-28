import IslandTest from "../../../components/tests/IslandTest";

export const metadata = {
  title: "무인도 생존력 테스트 - 나는 며칠 버틸까? (무료)",
  description:
    "20문항으로 알아보는 나의 무인도 생존 일수. 물, 불, 식량, 신호까지. 나는 무인도에서 며칠이나 버틸 수 있을까?",
  keywords: ["무인도 생존", "생존력 테스트", "무인도 테스트", "생존 일수", "무료 심리테스트"],
  alternates: { canonical: "/tests/island" },
  openGraph: {
    title: "무인도 생존력 테스트 - 나는 며칠 버틸까?",
    description: "20문항으로 알아보는 나의 무인도 생존 일수.",
    url: "https://zemitest.com/tests/island",
    images: [{ url: "/og/island.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/island.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "IslandTest",
  url: "https://zemitest.com/tests/island",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <IslandTest />
    </>
  );
}
