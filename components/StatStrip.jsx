import { TESTS } from "../lib/tests";
import { ARTICLES } from "../lib/articles";

/**
 * 카드 그리드만 반복되면 페이지가 단조로워집니다.
 * 사이에 실제 수치를 넣어 리듬을 만듭니다.
 * 참여자 수처럼 없는 데이터를 지어내지 않고, 콘텐츠 규모만 보여줍니다.
 */
export default function StatStrip() {
  const ready = TESTS.filter((t) => t.ready);
  const questions = ready.reduce((s, t) => {
    const m = t.meta.match(/(\d+)\s*(문항|장면)/);
    return s + (m ? Number(m[1]) : 0);
  }, 0);

  const items = [
    { n: ready.length, unit: "개", label: "테스트" },
    { n: questions, unit: "개", label: "문항" },
    { n: ARTICLES.length, unit: "편", label: "읽을거리" },
    { n: 0, unit: "원", label: "이용료", zero: true },
  ];

  return (
    <div className="stat-strip">
      {items.map((it) => (
        <div className="stat-cell" key={it.label}>
          <span className="stat-n">
            {it.zero ? "0" : it.n.toLocaleString()}
            <span className="stat-unit">{it.unit}</span>
          </span>
          <span className="stat-label">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
