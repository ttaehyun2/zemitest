import TypeDirectory from "../../../../components/TypeDirectory";
import { GRADES, AREAS } from "../../../../lib/moneyTest";

export const metadata = {
  title: "경제력 등급 5단계와 4개 진단 영역",
  description:
    "S부터 D까지 경제력 등급별 특징과, 저축력·소비 관리·금융 이해·위험 대비 4개 영역이 무엇을 측정하는지 설명합니다.",
  keywords: ["경제력 등급", "금융 이해력", "저축 습관", "소비 관리", "재테크 기초"],
  alternates: { canonical: "/tests/money/types" },
  openGraph: { images: [{ url: "/og/money.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = GRADES.map((g) => ({
    key: g.grade,
    emoji: g.emoji,
    name: `${g.grade}등급 · ${g.name}`,
    tagline: `${g.min}점 이상`,
    grad: g.grad,
    desc: g.desc,
  }));

  return (
    <>
      <p className="page-eyebrow">GRADE GUIDE</p>
      <h1 className="page-title">경제력 등급 5단계</h1>
      <p className="page-lead">
        경제력 테스트는 4개 영역 24문항을 100점 만점으로 환산해 등급을 매깁니다.
        점수는 지식의 양이 아니라 습관을 반영하기 때문에, 낮게 나왔더라도 바꾸기
        어렵지 않습니다.
      </p>

      <div className="section-head">
        <h2>진단하는 4개 영역</h2>
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

      <div className="section-head">
        <h2>등급별 설명</h2>
      </div>
      <TypeDirectory items={items} backHref="/tests/money" backLabel="경제력 테스트 하러 가기" />
      <p className="disclaimer">
        이 테스트는 금융 습관을 돌아보기 위한 참고용이며, 투자 판단이나 재무 상담을
        대신하지 않습니다.
      </p>
    </>
  );
}
