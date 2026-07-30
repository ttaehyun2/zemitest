import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS, TYPES, AREAS } from "../../../../lib/stockTest";

export const metadata = {
  title: "주식 생존력 6단계와 투자 심리 5유형",
  description:
    "시장에 남는 사람부터 사기꾼이 찾는 사람까지. 생존력 6단계와 존버형·한방형·분석형·추종형·손절형 5가지 투자 심리 유형을 정리했습니다.",
  keywords: ["투자 심리 유형", "존버형", "주식 생존력", "투자 성향 종류"],
  alternates: { canonical: "/tests/stock/types" },
  openGraph: { images: [{ url: "/og/stock.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = LEVELS.map((l) => ({
    key: l.key, emoji: l.emoji, name: l.name, tagline: l.label,
    grad: l.grad, desc: l.desc,
    lists: [{ title: "한마디", items: [l.tip] }],
  }));

  return (
    <>
      <p className="page-eyebrow">LEVEL GUIDE</p>
      <h1 className="page-title">📈 주식 생존력 6단계</h1>
      <p className="page-lead">
        수익률이 아니라 버티는 능력으로 나뉘는 여섯 단계입니다. 실제로 시장에서
        사라지는 이유는 종목을 잘못 골라서가 아니라, 감당할 수 없는 금액을
        감정으로 굴리기 때문인 경우가 훨씬 많습니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/stock" backLabel="주식 생존력 테스트 하러 가기" />

      <div className="section-head section-head-stack">
        <h2>투자 심리 5유형</h2>
        <p className="section-sub">답변 성향에서 가장 많이 나온 유형이 결과에 표시됩니다</p>
      </div>
      <div className="grid">
        {Object.values(TYPES).map((t) => (
          <div key={t.key} className="tile">
            <span className="tile-emoji">{t.emoji}</span>
            <h3 className="tile-title">{t.name}</h3>
            <p className="tile-desc">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="section-head section-head-stack">
        <h2>측정하는 4개 영역</h2>
      </div>
      <div className="grid">
        {Object.values(AREAS).map((a) => (
          <div key={a.key} className="tile">
            <span className="tile-emoji">{a.emoji}</span>
            <h3 className="tile-title">{a.label}</h3>
            <p className="tile-desc">{a.desc}</p>
          </div>
        ))}
      </div>

      <div className="section-head section-head-stack">
        <h2>함께 해보기</h2>
      </div>
      <div className="grid">
        <Link href="/tests/money" className="tile">
          <span className="tile-emoji">💰</span>
          <h3 className="tile-title">경제력 테스트</h3>
          <p className="tile-desc">투자 이전에 돈 관리 습관을 진단합니다.</p>
        </Link>
        <Link href="/articles/compound-interest" className="tile">
          <h3 className="tile-title">복리는 왜 대부분 체감되지 않을까</h3>
        </Link>
      </div>

      <p className="disclaimer">
        이 분류는 투자 심리를 돌아보기 위한 참고 자료이며, 특정 투자 방식을
        권유하지 않습니다.
      </p>

      <Comments pageId="test-stock" title="다들 얼마나 버틴대요?" />
    </>
  );
}
