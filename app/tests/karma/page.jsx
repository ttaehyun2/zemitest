import KarmaTest from "../../../components/KarmaTest";

export const metadata = {
  title: "인성 테스트 - 당신은 천국에 갈까 지옥에 갈까? (무료)",
  description:
    "24개의 일상 상황으로 받는 최후의 심판. 선행과 악행을 저울에 올려 천국 9층부터 지옥 9층까지 배정해드립니다. 판결문과 주요 죄목까지.",
  keywords: [
    "인성 테스트",
    "천국 지옥 테스트",
    "인성 검사",
    "선악 테스트",
    "심판 테스트",
    "무료 심리테스트",
  ],
  alternates: { canonical: "/tests/karma" },
  openGraph: {
    title: "인성 테스트 - 천국에 갈까 지옥에 갈까?",
    description: "선행과 악행을 저울에 올려 19단계로 배정해드립니다.",
    url: "https://zemitest.com/tests/karma",
    images: [{ url: "/og/karma.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/karma.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "인성 테스트 - 천국 지옥 심판",
  url: "https://zemitest.com/tests/karma",
  image: "https://zemitest.com/og/karma.png",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <KarmaTest />
    </>
  );
}
