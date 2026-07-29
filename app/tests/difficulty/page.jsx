import DifficultyTest from "../../../components/tests/DifficultyTest";

export const metadata = {
  title: "너의 인생 난이도는? - EASY부터 NIGHTMARE까지 (무료)",
  description:
    "20문항으로 알아보는 나의 인생 난이도. EASY, NORMAL, HARD, VERY HARD, NIGHTMARE 중 지금 내 하루는 어떤 난이도일까?",
  keywords: ["인생 난이도", "인생 난이도 테스트", "하드모드 테스트", "일상 난이도", "무료 심리테스트"],
  alternates: { canonical: "/tests/difficulty" },
  openGraph: {
    title: "너의 인생 난이도는?",
    description: "EASY부터 NIGHTMARE까지. 지금 내 하루는 어떤 난이도일까?",
    url: "https://zemitest.com/tests/difficulty",
    images: [{ url: "/og/difficulty.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/difficulty.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "DifficultyTest",
  url: "https://zemitest.com/tests/difficulty",
  image: "https://zemitest.com/og/difficulty.png",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <DifficultyTest />
    </>
  );
}
