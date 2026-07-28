import Link from "next/link";
import Comments from "../../../../components/Comments";
import TypeDirectory from "../../../../components/TypeDirectory";
import { TYPES } from "../../../../lib/loveTest";

export const metadata = {
  title: "연애 유형 6가지 전체 설명",
  description:
    "금사빠 로맨티스트, 밀당의 신, 순애보 직진러, 철벽 수비수, 자유로운 나비, 이성적 전략가. 연애 세계관 테스트의 6가지 유형을 하나씩 자세히 설명합니다.",
  keywords: ["연애 유형", "금사빠", "밀당", "순애보", "철벽", "연애 스타일 종류"],
  alternates: { canonical: "/tests/love/types" },
  openGraph: { images: [{ url: "/og/love.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = Object.values(TYPES).map((t) => ({
    key: t.key,
    emoji: t.emoji,
    name: t.name,
    tagline: t.tagline,
    grad: t.grad,
    desc: t.desc,
    detail: t.detail,
    lists: [
      { title: "이 유형의 강점", items: t.strengths },
      { title: "주의할 점", items: t.cautions },
      { title: "연애 꿀팁", items: [t.tip] },
    ],
    footer: `환상의 케미: ${TYPES[t.best].emoji} ${TYPES[t.best].name} · 위험한 상극: ${TYPES[t.worst].emoji} ${TYPES[t.worst].name}\n${t.withType}`,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">연애 유형 6가지</h1>
      <p className="page-lead">
        연애 세계관 테스트에 나오는 여섯 가지 유형을 하나씩 설명합니다. 사람은
        대개 여러 유형이 섞여 있으니, 가장 높게 나온 유형뿐 아니라 그다음 유형도
        함께 읽어보면 더 잘 맞습니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/love" backLabel="연애 세계관 테스트 하러 가기" />
      <div className="section-head">
        <h2>함께 읽어보기</h2>
      </div>
      <div className="grid">
        <Link href="/articles/fast-love" className="tile">
          <h3 className="tile-title">금사빠는 왜 그렇게 빨리 식을까</h3>
        </Link>
        <Link href="/articles/push-pull" className="tile">
          <h3 className="tile-title">밀당은 진짜 효과가 있을까</h3>
        </Link>
        <Link href="/articles/wall-type" className="tile">
          <h3 className="tile-title">철벽형은 왜 마음을 열지 못할까</h3>
        </Link>
      </div>

      <Comments pageId="test-love" title="다들 뭐 나왔어요?" />
    </>
  );
}
