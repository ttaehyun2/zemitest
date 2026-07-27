import TypeDirectory from "../../../../components/TypeDirectory";
import { TYPES } from "../../../../lib/stressTest";

export const metadata = {
  title: "스트레스 유형 8가지와 힐링 처방",
  description:
    "폭발형, 결빙형, 반추형, 회피형, 통제형, 연결형, 보상형, 가면형. 스트레스 반응 8가지 유형별 신호와 회복 방법을 정리했습니다.",
  keywords: ["스트레스 유형", "스트레스 대처법", "스트레스 해소", "힐링 방법"],
  alternates: { canonical: "/tests/stress/types" },
  openGraph: { images: [{ url: "/og/stress.png", width: 1200, height: 630 }] },
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
      { title: "🔔 나타나는 신호", items: [t.signal] },
      { title: "⚠️ 빠지기 쉬운 함정", items: [t.trap] },
      { title: "🌿 힐링 처방", items: t.remedies },
    ],
    footer: `잘 맞는 휴식 · ${t.rest}`,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">스트레스 유형 8가지</h1>
      <p className="page-lead">
        스트레스를 받아내는 여덟 가지 방식과, 각 유형에 맞는 회복법을 정리했습니다.
        어떤 방식도 그 자체로 잘못된 것은 아니며, 상황에 맞게 쓰는 것이 중요합니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/stress" backLabel="스트레스 유형 테스트 하러 가기" />
      <p className="disclaimer">
        이 내용은 일반적인 정보이며 진단이나 치료를 대신하지 않습니다. 힘든 상태가
        오래 이어진다면 가까운 사람이나 전문가에게 이야기해보시기를 권합니다.
      </p>
    </>
  );
}
