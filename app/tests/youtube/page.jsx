import YoutubeTest from "../../../components/tests/YoutubeTest";

export const metadata = {
  title: "당신이 유튜버라면 예상 구독자는? (무료 테스트)",
  description:
    "20문항으로 알아보는 나의 유튜버 지수. 예상 구독자 수, 실버·골드·다이아 버튼 등급, 어울리는 채널 유형까지 무료로 확인해보세요.",
  keywords: [
    "유튜버 테스트",
    "예상 구독자",
    "유튜버 적성 테스트",
    "스트리머 테스트",
    "유튜브 시작",
    "채널 유형 테스트",
  ],
  alternates: { canonical: "/tests/youtube" },
  openGraph: {
    title: "당신이 유튜버라면 예상 구독자는?",
    description: "20문항으로 알아보는 예상 구독자 수와 버튼 등급.",
    url: "https://zemitest.com/tests/youtube",
    images: [{ url: "/og/youtube.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/youtube.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "당신이 유튜버라면 예상 구독자는?",
  url: "https://zemitest.com/tests/youtube",
  image: "https://zemitest.com/og/youtube.png",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <YoutubeTest />
    </>
  );
}
