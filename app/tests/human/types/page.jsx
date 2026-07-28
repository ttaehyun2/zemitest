import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/humanTest";

export const metadata = {
  title: "인간 능력치 5단계",
  description: "멘탈·사회성·자기관리·판단력·체력·공감력 여섯 영역의 종합 점수에 따라 나뉩니다. 어느 한쪽이 높다고 좋은 게 아니라 균형이 중요합니다.",
  alternates: { canonical: "/tests/human/types" },
  openGraph: { images: [{ url: "/og/human.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = LEVELS.map((l) => ({
    key: l.key || l.name,
    emoji: l.emoji,
    name: l.name,
    tagline: `${l.min}점 이상`,
    grad: l.grad,
    desc: l.desc,
    lists: l.tip ? [{ title: "한마디", items: [l.tip] }] : [],
  }));

  return (
    <>
      <p className="page-eyebrow">LEVEL GUIDE</p>
      <h1 className="page-title">👑 인간 능력치 5단계</h1>
      <p className="page-lead">멘탈·사회성·자기관리·판단력·체력·공감력 여섯 영역의 종합 점수에 따라 나뉩니다. 어느 한쪽이 높다고 좋은 게 아니라 균형이 중요합니다.</p>
      <TypeDirectory items={items} backHref="/tests/human" backLabel="인간 종합 능력치 테스트 하러 가기" />
      <Comments pageId="test-human" title="다들 뭐 나왔어요?" />
    </>
  );
}
