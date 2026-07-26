import PoliticsTest from "../../../components/PoliticsTest";

export const metadata = {
  title: "정치 성향 테스트 - 나의 정치 좌표는? (무료)",
  description:
    "30문항 무료 정치 성향 테스트. 경제(분배↔시장)와 사회(권위↔자유) 두 축으로 나의 정치 좌표를 찍고 퍼센트로 확인해보세요.",
  keywords: [
    "정치성향 테스트",
    "정치 좌표 테스트",
    "폴리티컬 컴퍼스",
    "진보 보수 테스트",
    "무료 정치테스트",
    "이념 성향 테스트",
  ],
  alternates: { canonical: "/tests/politics" },
  openGraph: {
    title: "정치 성향 좌표 테스트 - 나의 정치 좌표는?",
    description: "30문항으로 찍어보는 나의 정치 성향 좌표. 경제축과 사회축 퍼센트까지 무료로 확인!",
    url: "https://zemitest.com/tests/politics",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "정치 성향 좌표 테스트",
  description: "30문항으로 알아보는 정치 성향 무료 테스트",
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
