import LegacyTest from "../../../components/LegacyTest";

export const metadata = {
  title: "죽기 직전 어떤 사람으로 기억될까? (무료)",
  description: "당신의 묘비에 새겨질 한 문장은 무엇일까? 22개의 질문으로 알아보는, 사람들이 기억할 나의 모습 8가지.",
  keywords: ["묘비명 테스트", "인생 테스트", "어떻게 기억될까", "유산 테스트", "감성 심리테스트"],
  alternates: { canonical: "/tests/legacy" },
  openGraph: {
    title: "죽기 직전 어떤 사람으로 기억될까? (무료)",
    description: "당신의 묘비에 새겨질 한 문장은 무엇일까? 22개의 질문으로 알아보는, 사람들이 기억할 나의 모습 8가지.",
    url: "https://zemitest.com/tests/legacy",
    images: [{ url: "/og/legacy.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/legacy.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "죽기 직전 어떤 사람으로 기억될까? (무료)", url: "https://zemitest.com/tests/legacy", inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <LegacyTest />
    </>
  );
}
