import NunchiTest from "../../../components/tests/NunchiTest";

export const metadata = {
  title: "눈치 테스트 - 나는 상위 몇 %일까? (무료)",
  description:
    "20가지 상황에서 가장 적절한 행동을 고르는 무료 눈치 테스트. 실제 참여자 기준으로 내가 상위 몇 %인지 확인해보세요.",
  keywords: ["눈치 테스트", "눈치력 테스트", "상황 판단 테스트", "사회성 테스트", "무료 눈치테스트"],
  alternates: { canonical: "/tests/nunchi" },
  openGraph: {
    title: "눈치 테스트 - 나는 상위 몇 %일까?",
    description: "20가지 상황에서 가장 적절한 행동은? 실제 참여자 기준 등수까지.",
    url: "https://zemitest.com/tests/nunchi",
    images: [{ url: "/og/nunchi.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/nunchi.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "NunchiTest",
  url: "https://zemitest.com/tests/nunchi",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <NunchiTest />
    </>
  );
}
