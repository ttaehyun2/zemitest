import MoralTest from "../../../components/MoralTest";

export const metadata = {
  title: "누구를 살릴래? - 도덕관 테스트 (무료)",
  description: "기차, 침몰하는 배, 불타는 건물. 20번의 선택 앞에서 드러나는 나의 도덕관. 6가지 유형 중 나는 누구일까?",
  keywords: ["도덕관 테스트", "트롤리 딜레마", "윤리 성향 테스트", "공리주의 의무론", "철학 테스트"],
  alternates: { canonical: "/tests/moral" },
  openGraph: {
    title: "누구를 살릴래? - 도덕관 테스트 (무료)",
    description: "기차, 침몰하는 배, 불타는 건물. 20번의 선택 앞에서 드러나는 나의 도덕관. 6가지 유형 중 나는 누구일까?",
    url: "https://zemitest.com/tests/moral",
    images: [{ url: "/og/moral.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/moral.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "Quiz",
  name: "누구를 살릴래? - 도덕관 테스트 (무료)", url: "https://zemitest.com/tests/moral", inLanguage: "ko-KR",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <MoralTest />
    </>
  );
}
