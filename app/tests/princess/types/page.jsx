import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/princessTest";

export const metadata = {
  title: "공주병 테스트 7단계 전체 설명",
  description:
    "공주병 말기부터 거울 앞에서 사과하는 사람까지. 자기애 지수 7단계를 하나씩 설명합니다.",
  keywords: ["공주병 단계", "자기애 지수", "자존감 단계"],
  alternates: { canonical: "/tests/princess/types" },
  openGraph: { images: [{ url: "/og/princess.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = LEVELS.map((l) => ({
    key: l.key, emoji: l.emoji, name: l.name, tagline: l.tagline,
    grad: l.grad, desc: l.desc,
    meta: l.side === "mid" ? "⭐ 가장 이상적인 구간" : `${l.min}점 이상`,
    lists: [{ title: "한마디", items: [l.tip] }],
  }));

  return (
    <>
      <p className="page-eyebrow">LEVEL GUIDE</p>
      <h1 className="page-title">👑 자기애 지수 7단계</h1>
      <p className="page-lead">
        점수가 높다고 좋은 것도, 낮다고 좋은 것도 아닙니다. 가운데의 건강한
        자신감 구간이 가장 이상적이고, 양쪽 끝으로 갈수록 스스로를 힘들게
        만듭니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/princess" backLabel="공주병 테스트 하러 가기" />
      <Comments pageId="test-princess" title="다들 뭐 나왔어요?" />
    </>
  );
}
