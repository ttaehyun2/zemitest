import HumanTest from "../../../components/tests/HumanTest";

export const metadata = {
  title: "너는 상위 몇 프로의 인간인가? - 종합 능력치 테스트",
  description: "24문항으로 재는 인간 종합 능력치. 멘탈, 사회성, 자기관리, 판단력, 체력, 공감력 6개 영역과 실제 참여자 기준 등수.",
  keywords: ["상위 몇 퍼센트", "인간 능력치", "종합 스탯 테스트", "자기평가 테스트", "능력치 테스트"],
  alternates: { canonical: "/tests/human" },
  openGraph: {
    title: "너는 상위 몇 프로의 인간인가? - 종합 능력치 테스트",
    description: "24문항으로 재는 인간 종합 능력치. 멘탈, 사회성, 자기관리, 판단력, 체력, 공감력 6개 영역과 실제 참여자 기준 등수.",
    url: "https://zemitest.com/tests/human",
    images: [{ url: "/og/human.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/human.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "너는 상위 몇 프로의 인간인가? - 종합 능력치 테스트",
  url: "https://zemitest.com/tests/human",
  image: "https://zemitest.com/og/human.png",
  inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <HumanTest />
    </>
  );
}
