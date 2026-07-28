import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { ENDINGS } from "../../../../lib/lifeSim";

export const metadata = {
  title: "인생 시뮬레이션 엔딩 18종 전체",
  description:
    "전설이 된 사람부터 빈손으로 돌아간 사람까지. 인생 시뮬레이션에서 도달할 수 있는 18가지 결말을 모두 정리했습니다.",
  keywords: ["인생 시뮬레이션 엔딩", "엔딩 목록", "인생 게임 결말"],
  alternates: { canonical: "/tests/lifesim/types" },
  openGraph: { images: [{ url: "/og/lifesim.png", width: 1200, height: 630 }] },
};

export default function Page() {
  const items = ENDINGS.map((e) => ({
    key: e.key, emoji: e.emoji, name: e.title,
    tagline: e.line, grad: e.grad, desc: e.text,
  }));

  return (
    <>
      <p className="page-eyebrow" id="endings">ENDING GUIDE</p>
      <h1 className="page-title">인생 엔딩 18종</h1>
      <p className="page-lead">
        인생 시뮬레이션에서 도달할 수 있는 열여덟 가지 결말입니다. 어떤 결말도
        정답이 아니며, 같은 선택을 해도 앞선 선택에 따라 결과가 달라집니다.
        아래로 갈수록 도달하기 어려운 엔딩은 아니고, 위에서부터 조건이 검사됩니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/lifesim" backLabel="인생 시뮬레이션 하러 가기" />
      <Comments pageId="test-lifesim" title="다들 어떤 엔딩 나왔어요?" />
    </>
  );
}
