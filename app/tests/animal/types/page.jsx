import TypeDirectory from "../../../../components/TypeDirectory";
import { TYPES } from "../../../../lib/animalTest";

export const metadata = {
  title: "동물 성격 유형 16가지 전체 설명",
  description:
    "골든리트리버, 고양이, 여우, 늑대, 곰, 토끼, 사자, 판다, 부엉이, 돌고래, 펭귄, 사슴, 호랑이, 수달, 다람쥐, 독수리. 16가지 동물 성격을 하나씩 설명합니다.",
  keywords: ["동물 성격 유형", "동물 테스트 종류", "동물별 성격", "나와 닮은 동물 종류"],
  alternates: { canonical: "/tests/animal/types" },
  openGraph: { images: [{ url: "/og/animal.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = Object.values(TYPES).map((t) => ({
    key: t.key,
    emoji: t.emoji,
    name: t.name,
    tagline: t.tagline,
    grad: t.grad,
    desc: t.desc,
    lists: [
      { title: "이 동물의 강점", items: t.strengths },
      { title: "주의할 점", items: t.cautions },
      { title: "한마디", items: [t.tip] },
    ],
    footer: `환상의 짝꿍: ${TYPES[t.best].emoji} ${TYPES[t.best].name}`,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">동물 성격 16가지</h1>
      <p className="page-lead">
        나와 닮은 동물 테스트에 나오는 열여섯 가지 동물을 하나씩 설명합니다.
        사람은 대개 여러 동물이 섞여 있으니, 1위뿐 아니라 그다음 동물도 함께
        읽어보면 더 잘 맞습니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/animal" backLabel="동물 테스트 하러 가기" />
    </>
  );
}
