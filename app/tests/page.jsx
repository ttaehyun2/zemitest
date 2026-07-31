import { TESTS } from "../../lib/tests";
import TestBrowser from "../../components/TestBrowser";

export const metadata = {
  title: "전체 테스트 - 무료 심리테스트 모음",
  description:
    "제미테스트의 모든 심리 테스트를 한곳에서. 인생 시뮬레이션, 눈치, 연애 세계관, 천국 지옥 인성, 유튜버 구독자 테스트까지 무료로 즐겨보세요.",
  keywords: ["심리테스트 모음", "무료 테스트", "성향 테스트", "테스트 모음 사이트"],
  alternates: { canonical: "/tests" },
  openGraph: {
    title: "무료 심리 테스트 모음 - 제미테스트",
    description: "가입 없이 바로 할 수 있는 성향 테스트 모음.",
    url: "https://zemitest.com/tests",
    images: [{ url: "/og/tests.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/tests.png"] },
};

const CATEGORIES = [
  { key: "self", label: "나는 어떤 사람일까", sub: "성향과 마음을 들여다보는 테스트" },
  { key: "rank", label: "상위 몇 %일까", sub: "점수와 등수가 나오는 테스트" },
  { key: "play", label: "게임처럼 즐기기", sub: "선택이 쌓여 결과가 갈리는 테스트" },
];

export default function TestsPage() {
  const ready = TESTS.filter((t) => t.ready).length;

  return (
    <>
      <p className="page-eyebrow">ALL TESTS</p>
      <h1 className="page-title">전체 테스트</h1>
      <p className="page-lead">
        총 {ready}개의 테스트가 준비되어 있습니다. 모두 무료이고 가입 없이 바로
        할 수 있습니다.
      </p>

      <TestBrowser tests={TESTS} categories={CATEGORIES} />
    </>
  );
}
