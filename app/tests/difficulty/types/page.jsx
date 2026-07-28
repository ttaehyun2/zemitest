import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/difficultyTest";

export const metadata = {
  title: "인생 난이도 5단계",
  description: "EASY부터 NIGHTMARE까지 다섯 단계입니다. 난이도가 높다고 해서 부족한 것이 아니라, 감당하는 것이 많다는 뜻입니다.",
  keywords: ["인생 난이도 단계", "하드모드", "일상 난이도"],
  alternates: { canonical: "/tests/difficulty/types" },
  openGraph: { images: [{ url: "/og/difficulty.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = LEVELS.map((l) => ({
    key: l.key || l.name,
    emoji: l.emoji,
    name: l.name,
    tagline: l.label || `점수 ${l.min}점 이상`,
    grad: l.grad,
    desc: l.desc,
    lists: l.tip ? [{ title: "한마디", items: [l.tip] }] : [],
  }));

  return (
    <>
      <p className="page-eyebrow">LEVEL GUIDE</p>
      <h1 className="page-title">🎮 인생 난이도 5단계</h1>
      <p className="page-lead">EASY부터 NIGHTMARE까지 다섯 단계입니다. 난이도가 높다고 해서 부족한 것이 아니라, 감당하는 것이 많다는 뜻입니다.</p>
      <TypeDirectory items={items} backHref="/tests/difficulty" backLabel="인생 난이도 테스트 하러 가기" />
      <Comments pageId="test-difficulty" title="다들 뭐 나왔어요?" />
    </>
  );
}
