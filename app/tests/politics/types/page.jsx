import TypeDirectory from "../../../../components/TypeDirectory";
import { QUADRANTS } from "../../../../lib/politicsTest";

export const metadata = {
  title: "정치 성향 5가지 유형 전체 설명",
  description:
    "진보적 자유주의, 공동체 중심주의, 자유지상주의, 전통적 보수주의, 중도 실용주의. 두 축 좌표가 만드는 다섯 가지 정치 성향을 설명합니다.",
  keywords: ["정치 성향 종류", "정치 좌표 유형", "자유지상주의", "사회민주주의", "정치 성향 뜻"],
  alternates: { canonical: "/tests/politics/types" },
  openGraph: { images: [{ url: "/og/politics.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const order = ["libLeft", "authLeft", "libRight", "authRight", "center"];
  const items = order.map((k) => {
    const t = QUADRANTS[k];
    return {
      key: t.key,
      emoji: t.emoji,
      name: t.name,
      tagline: t.tagline,
      grad: t.grad,
      desc: t.desc,
      lists: [{ title: "주요 특징", items: t.traits }],
    };
  });

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">정치 성향 5가지 유형</h1>
      <p className="page-lead">
        경제축(분배↔시장)과 사회축(권위↔자유)이 만드는 네 개의 사분면, 그리고
        중앙에 가까운 중도까지 다섯 가지를 설명합니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/politics" backLabel="정치 성향 테스트 하러 가기" />
      <p className="disclaimer">
        이 분류는 성향을 대략적으로 살펴보기 위한 것으로, 특정 정당이나 입장을
        지지하거나 권유하지 않습니다.
      </p>
    </>
  );
}
