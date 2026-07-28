import LifeSim from "../../../components/LifeSim";

export const metadata = {
  title: "인생 시뮬레이션 - 당신의 인생은 어떻게 끝날까? (무료)",
  description:
    "선택마다 다음 이야기가 갈리는 인생 시뮬레이션. 유년기부터 노년까지, 재력·행복·실력·인맥·건강·명성이 변하며 890가지 경로와 18가지 결말로 이어집니다.",
  keywords: ["인생 시뮬레이션", "인생 게임", "선택 게임", "텍스트 게임", "인생 엔딩", "무료 시뮬레이션"],
  alternates: { canonical: "/tests/lifesim" },
  openGraph: {
    title: "인생 시뮬레이션 - 당신의 인생은 어떻게 끝날까?",
    description: "선택마다 이야기가 갈립니다. 890가지 경로, 18가지 결말.",
    url: "https://zemitest.com/tests/lifesim",
    images: [{ url: "/og/lifesim.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/lifesim.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Game",
  name: "인생 시뮬레이션", url: "https://zemitest.com/tests/lifesim", inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <LifeSim />
    </>
  );
}
