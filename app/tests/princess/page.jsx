import PrincessTest from "../../../components/PrincessTest";

export const metadata = {
  title: "공주병 테스트 - 나는 공주병일까 자존감이 낮은 걸까? (무료)",
  description:
    "20문항으로 재는 자기애 지수. 공주병 말기부터 거울 앞에서 사과하는 사람까지 7단계 스펙트럼으로 알려드립니다.",
  keywords: [
    "공주병 테스트",
    "자기애 테스트",
    "자존감 테스트",
    "공주병 자가진단",
    "나르시시즘 테스트",
    "무료 심리테스트",
  ],
  alternates: { canonical: "/tests/princess" },
  openGraph: {
    title: "공주병 테스트 - 나는 어느 쪽일까?",
    description: "공주병 말기부터 자존감 바닥까지, 7단계로 알려드립니다.",
    url: "https://zemitest.com/tests/princess",
    images: [{ url: "/og/princess.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/princess.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "공주병 테스트",
  url: "https://zemitest.com/tests/princess",
  image: "https://zemitest.com/og/princess.png",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PrincessTest />
    </>
  );
}
