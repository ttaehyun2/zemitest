import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import { TYPES } from "../../../../lib/pastLifeTest";

export const metadata = {
  title: "전생 유형 12가지 전체 설명",
  description:
    "군주, 장수, 학자, 자객, 무당, 상인, 광대, 농부, 수도자, 유랑객, 의원, 의적. 전생 테스트의 12가지 유형을 하나씩 자세히 설명합니다.",
  keywords: ["전생 유형", "전생 테스트 종류", "전생 결과", "전생 직업"],
  alternates: { canonical: "/tests/pastlife/types" },
  openGraph: { images: [{ url: "/og/pastlife.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = Object.values(TYPES).map((t) => ({
    key: t.key,
    emoji: t.emoji,
    name: t.name,
    tagline: t.tagline,
    grad: t.grad,
    meta: `📍 ${t.era}`,
    desc: t.desc,
    lists: [
      { title: "이 유형의 강점", items: t.strengths },
      { title: "주의할 점", items: t.cautions },
      { title: "이번 생을 위한 조언", items: [t.advice] },
    ],
    footer: `전생의 인연: ${TYPES[t.best].emoji} ${TYPES[t.best].name}`,
  }));

  return (
    <>
      <p className="page-eyebrow">TYPE GUIDE</p>
      <h1 className="page-title">전생 유형 12가지</h1>
      <p className="page-lead">
        전생 테스트에 나오는 열두 가지 인물을 하나씩 설명합니다. 어떤 유형도
        좋고 나쁨이 없으며, 각자 다른 방식으로 세상을 살아낸 사람들입니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/pastlife" backLabel="전생 테스트 하러 가기" />
      <div className="section-head">
        <h2>함께 읽어보기</h2>
      </div>
      <div className="grid">
        <Link href="/articles/why-past-life" className="tile">
          <h3 className="tile-title">우리는 왜 전생 이야기에 끌릴까</h3>
        </Link>
      </div>

    </>
  );
}
