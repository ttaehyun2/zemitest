import PoliticsTest from "../../../components/PoliticsTest";

export const metadata = {
  title: "정치 성향 테스트 - 나의 정치 좌표는? (무료)",
  description:
    "20문항 무료 정치 성향 테스트. 진보↔보수, 자유↔사회 두 축으로 나의 정치 좌표를 찍고 퍼센트로 확인해보세요.",
  keywords: [
    "정치성향 테스트",
    "정치 좌표 테스트",
    "폴리티컬 컴퍼스",
    "진보 보수 테스트",
    "무료 정치테스트",
    "이념 성향 테스트",
  ],
  twitter: { card: "summary_large_image", images: ["/og/politics.png"] },
  alternates: { canonical: "/tests/politics" },
  openGraph: {
    title: "정치 성향 좌표 테스트 - 나의 정치 좌표는?",
    description: "20문항으로 찍어보는 나의 정치 성향 좌표. 경제축과 사회축 퍼센트까지 무료로 확인!",
    url: "https://zemitest.com/tests/politics",
    images: [{ url: "/og/politics.png", width: 1200, height: 630 }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "정치 성향 좌표 테스트",
  description: "20문항으로 알아보는 정치 성향 무료 테스트",
  url: "https://zemitest.com/tests/politics",
  inLanguage: "ko-KR",
};

export default function PoliticsTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <PoliticsTest />
    </>
  );
}
