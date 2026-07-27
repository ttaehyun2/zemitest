import AnimalTest from "../../../components/AnimalTest";

export const metadata = {
  title: "나와 닮은 동물 테스트 - 무료 성격 동물 테스트",
  description:
    "27문항 무료 동물 성격 테스트. 강아지, 고양이, 여우, 늑대, 곰, 토끼, 사자, 판다 등 16가지 동물 중 나와 닮은 동물은? 일치도와 짝꿍까지 확인해보세요.",
  keywords: [
    "동물 테스트",
    "나와 닮은 동물",
    "동물 성격 테스트",
    "무료 동물테스트",
    "성격 동물 유형",
    "동물상 테스트",
  ],
  alternates: { canonical: "/tests/animal" },
  openGraph: {
    title: "나와 닮은 동물 테스트",
    description: "27문항으로 찾는 나의 동물. 16가지 중 나는 누구를 닮았을까?",
    url: "https://zemitest.com/tests/animal",
    images: [{ url: "/og/animal.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/animal.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "나와 닮은 동물 테스트",
  description: "27문항으로 알아보는 동물 성격 무료 테스트",
  url: "https://zemitest.com/tests/animal",
  inLanguage: "ko-KR",
};

export default function AnimalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <AnimalTest />
    </>
  );
}
