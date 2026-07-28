import SocialTest from "../../../components/tests/SocialTest";

export const metadata = {
  title: "사회생활 생존력 테스트 - 나는 상위 몇 %? (무료)",
  description: "20문항 무료 사회생활 생존력 테스트. 거절, 실수 대응, 부당한 요구까지. 조직에서 나를 지키는 처세력을 점수로 확인해보세요.",
  keywords: ["사회생활 테스트", "처세력 테스트", "직장생활 테스트", "사회성 테스트", "눈치 사회생활"],
  alternates: { canonical: "/tests/social" },
  openGraph: {
    title: "사회생활 생존력 테스트 - 나는 상위 몇 %? (무료)",
    description: "20문항 무료 사회생활 생존력 테스트. 거절, 실수 대응, 부당한 요구까지. 조직에서 나를 지키는 처세력을 점수로 확인해보세요.",
    url: "https://zemitest.com/tests/social",
    images: [{ url: "/og/social.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/social.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "사회생활 생존력 테스트 - 나는 상위 몇 %? (무료)",
  url: "https://zemitest.com/tests/social",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <SocialTest />
    </>
  );
}
