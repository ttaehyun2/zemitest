import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { PLACES, SINS } from "../../../../lib/karmaTest";

export const metadata = {
  title: "천국 9층부터 지옥 9층까지 19단계 전체",
  description:
    "인성 테스트에서 배정되는 19단계를 모두 정리했습니다. 천국 1층부터 지옥 9층까지, 각 층의 의미와 주요 죄목 5가지.",
  keywords: ["천국 지옥 층", "인성 테스트 결과", "심판 단계"],
  alternates: { canonical: "/tests/karma/types" },
  openGraph: { images: [{ url: "/og/karma.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = [];
  // 천국 1~9층
  for (let f = 1; f <= 9; f++) {
    const info = PLACES.heaven.floors[f];
    items.push({
      key: f === 1 ? "heaven" : `heaven${f}`,
      emoji: PLACES.heaven.emoji,
      name: info.title,
      tagline: f === 1 ? "거의 도달 불가" : f <= 4 ? "확실히 좋은 사람" : "합격선",
      grad: PLACES.heaven.grad,
      desc: info.desc,
    });
  }
  // 연옥
  items.push({
    key: "limbo",
    emoji: PLACES.limbo.emoji,
    name: PLACES.limbo.floors[null].title,
    tagline: "대부분의 인간이 있는 곳",
    grad: PLACES.limbo.grad,
    desc: PLACES.limbo.floors[null].desc,
  });
  // 지옥 1~9층
  for (let f = 1; f <= 9; f++) {
    const info = PLACES.hell.floors[f];
    items.push({
      key: f === 1 ? "hell" : `hell${f}`,
      emoji: PLACES.hell.emoji,
      name: info.title,
      tagline: f <= 3 ? "생활형 악행" : f <= 6 ? "고의성 확인" : "항소 불가",
      grad: PLACES.hell.grad,
      desc: info.desc,
    });
  }

  return (
    <>
      <p className="page-eyebrow">JUDGMENT GUIDE</p>
      <h1 className="page-title">⚖️ 천국 9층 ~ 지옥 9층</h1>
      <p className="page-lead">
        선행과 악행을 저울에 올려 19단계 중 한 곳에 배정합니다. 천국은 1층이 가장
        높은 곳이고, 지옥은 9층이 가장 깊은 곳입니다. 대부분의 사람은 연옥 근처에
        모입니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/karma" backLabel="인성 테스트 하러 가기" />

      <div className="section-head section-head-stack">
        <h2>주요 죄목 5가지</h2>
        <p className="section-sub">가장 많이 누적된 항목이 결과에 표시됩니다</p>
      </div>
      <div className="grid">
        {Object.values(SINS).map((s) => (
          <div key={s.key} className="tile">
            <span className="tile-emoji">{s.emoji}</span>
            <h3 className="tile-title">{s.label}</h3>
            <p className="tile-desc">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="section-head section-head-stack">
        <h2>함께 해보기</h2>
      </div>
      <div className="grid">
        <Link href="/tests/moral" className="tile">
          <span className="tile-emoji">⚖️</span>
          <h3 className="tile-title">너라면 누구를 살릴래?</h3>
          <p className="tile-desc">일상의 인성이 아니라 원칙끼리 부딪히는 딜레마를 다룹니다.</p>
        </Link>
        <Link href="/tests/legacy" className="tile">
          <span className="tile-emoji">🕊️</span>
          <h3 className="tile-title">죽기 직전 어떤 사람으로 기억될까?</h3>
          <p className="tile-desc">사람들이 기억할 나의 모습을 묘비명 한 문장으로.</p>
        </Link>
      </div>

      <p className="disclaimer">
        이 테스트는 재미로 만든 것이며, 특정 종교의 교리나 심판 기준과는 관계가
        없습니다.
      </p>

      <Comments pageId="test-karma" title="다들 몇 층 나왔어요?" />
    </>
  );
}
