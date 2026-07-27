import TypeDirectory from "../../../../components/TypeDirectory";
import { TYPES } from "../../../../lib/careerTest";

export const metadata = {
  title: "직업 가치관 8가지 전체 설명",
  description:
    "성취, 안정, 보상, 자율, 관계, 의미, 균형, 전문성. 직업 가치관 8가지 유형별 특징과 잘 맞는 환경을 설명합니다.",
  keywords: ["직업 가치관 종류", "일 가치관 유형", "커리어 앵커", "직업 선택 기준"],
  alternates: { canonical: "/tests/career/types" },
  openGraph: { images: [{ url: "/og/career.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = Object.values(TYPES).map((t) => ({
    key: t.key, emoji: t.emoji, name: t.name, tagline: t.tagline,
    grad: t.grad, desc: t.desc,
    lists: [
      { title: "잘 맞는 환경", items: t.fits },
      { title: "주의할 점", items: t.cautions },
      { title: "기억할 것", items: [t.tip] },
    ],
    footer: `함께 나타나기 쉬운 가치: ${TYPES[t.best].emoji} ${TYPES[t.best].name}`,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">직업 가치관 8가지</h1>
      <p className="page-lead">
        일에서 무엇을 중요하게 여기는지에 따라 나뉘는 여덟 가지 가치관입니다.
        어떤 가치관도 더 낫거나 못하지 않으며, 자기 가치관과 맞는 환경을 찾는
        것이 중요합니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/career" backLabel="직업 가치관 테스트 하러 가기" />
      <p className="disclaimer">
        이 분류는 가치관을 돌아보기 위한 참고 자료이며, 적성 검사나 진로 상담을
        대신하지 않습니다.
      </p>
    </>
  );
}
