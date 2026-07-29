import Link from "next/link";
import TypeDirectory from "../../../../components/TypeDirectory";
import Comments from "../../../../components/Comments";
import { LEVELS, CHANNEL_TYPES, AREAS } from "../../../../lib/youtubeTest";

export const metadata = {
  title: "유튜버 등급 6단계와 채널 유형 6종",
  description:
    "다이아몬드 버튼급부터 취미 채널형까지. 유튜버 지수 등급과 어울리는 채널 유형을 정리했습니다.",
  keywords: ["유튜버 등급", "채널 유형", "실버버튼 골드버튼", "유튜브 적성"],
  alternates: { canonical: "/tests/youtube/types" },
  openGraph: { images: [{ url: "/og/youtube.png", width: 1200, height: 630 }] },
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
      <h1 className="page-title">📺 유튜버 등급 6단계</h1>
      <p className="page-lead">
        기획·꾸준함·표현·기술·멘탈·소통 여섯 영역의 종합 점수로 나뉘는 등급입니다.
        점수가 낮다고 못 한다는 뜻은 아니고, 지금 시작하면 어디가 힘들지를
        보여주는 것에 가깝습니다.
      </p>
      <TypeDirectory items={items} backHref="/tests/youtube" backLabel="유튜버 테스트 하러 가기" />

      <div className="section-head">
        <h2>어울리는 채널 유형 6종</h2>
      </div>
      <div className="grid">
        {Object.entries(CHANNEL_TYPES).map(([k, t]) => (
          <div key={k} className="tile">
            <span className="tile-emoji">{t.emoji}</span>
            <h3 className="tile-title">{t.name}</h3>
            <p className="tile-desc">{t.desc}</p>
            <p className="tile-meta">{AREAS[k].emoji} {AREAS[k].label}가 가장 높을 때</p>
          </div>
        ))}
      </div>

      <div className="section-head">
        <h2>함께 해보기</h2>
      </div>
      <div className="grid">
        <Link href="/tests/human" className="tile">
          <span className="tile-emoji">👑</span>
          <h3 className="tile-title">너는 상위 몇 프로의 인간인가?</h3>
          <p className="tile-desc">멘탈·사회성·자기관리 등 6개 영역 종합 능력치.</p>
        </Link>
        <Link href="/tests/career" className="tile">
          <span className="tile-emoji">🧭</span>
          <h3 className="tile-title">직업 가치관 테스트</h3>
          <p className="tile-desc">일에서 무엇을 가장 중요하게 여기는지 알아봅니다.</p>
        </Link>
      </div>

      <Comments pageId="test-youtube" title="다들 구독자 몇 명 나왔어요?" />
    </>
  );
}
