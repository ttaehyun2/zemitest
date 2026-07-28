import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS } from "../../../../lib/liarTest";

export const metadata = {
  title: "거짓말 탐지 정확도 5단계",
  description: "정확도에 따라 나뉘는 다섯 단계입니다. 실제 연구에서 사람이 거짓말을 알아채는 평균 정확도는 54% 정도로, 동전 던지기와 큰 차이가 없습니다.",
  alternates: { canonical: "/tests/liar/types" },
  openGraph: { images: [{ url: "/og/liar.png", width: 1200, height: 630 }] },
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
      <h1 className="page-title">🔍 거짓말 탐지 정확도 5단계</h1>
      <p className="page-lead">정확도에 따라 나뉘는 다섯 단계입니다. 실제 연구에서 사람이 거짓말을 알아채는 평균 정확도는 54% 정도로, 동전 던지기와 큰 차이가 없습니다.</p>
      <TypeDirectory items={items} backHref="/tests/liar" backLabel="거짓말 탐지력 테스트 하러 가기" />
      <div className="section-head">
        <h2>함께 읽어보기</h2>
      </div>
      <div className="grid">
        <Link href="/articles/lie-eye-contact" className="tile">
          <h3 className="tile-title">거짓말하는 사람은 정말 눈을 피할까</h3>
        </Link>
      </div>

      <Comments pageId="test-liar" title="다들 뭐 나왔어요?" />
    </>
  );
}
