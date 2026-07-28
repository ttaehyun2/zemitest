"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Stars from "./Stars";
import ShareButtons from "./ShareButtons";
import SaveImageButton from "./SaveImageButton";
import Comments from "./Comments";
import CommentJump from "./CommentJump";
import ResultStats from "./ResultStats";
import { cardToneClass } from "../lib/contrast";
import { STATS, START, CHAPTERS, pickEnding, clamp } from "../lib/lifeSim";

// 모든 장면을 순서대로 펼쳐둡니다 (조건은 진행 중에 검사)
const ALL = CHAPTERS.flatMap((ch) =>
  ch.scenes.map((sc) => ({ ...sc, chapter: ch }))
);

// 분기 장면(branch)은 일반 진행에서 건너뛰고, next 로 지목됐을 때만 등장합니다.
const INDEX_BY_ID = {};
ALL.forEach((sc, i) => (INDEX_BY_ID[sc.id] = i));

export default function LifeSim() {
  const [screen, setScreen] = useState("intro");
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({ ...START });
  const [flags, setFlags] = useState(() => new Set());
  const [log, setLog] = useState([]);      // 지나온 선택 기록
  const [lastGain, setLastGain] = useState(null);
  const [cmtCount, setCmtCount] = useState(null);

  // 현재 조건을 만족하는 다음 장면 찾기
  function nextIndex(from, s, f) {
    for (let i = from; i < ALL.length; i++) {
      const sc = ALL[i];
      if (sc.branch) continue; // 분기 전용 장면은 순서대로 나오지 않음
      if (!sc.cond || sc.cond(s, f)) return i;
    }
    return -1;
  }

  const scene = idx >= 0 && idx < ALL.length ? ALL[idx] : null;

  const result = useMemo(() => {
    if (screen !== "result") return null;
    return { ending: pickEnding(stats, flags), stats, log };
  }, [screen, stats, flags, log]);

  function start() {
    const s = { ...START };
    const f = new Set();
    setStats(s); setFlags(f); setLog([]); setLastGain(null);
    setIdx(nextIndex(0, s, f));
    setScreen("play");
  }

  function choose(ci) {
    const c = scene.choices[ci];
    const s = { ...stats };
    Object.entries(c.e).forEach(([k, v]) => (s[k] = clamp(s[k] + v)));
    const f = new Set(flags);
    if (c.f) f.add(c.f);

    setStats(s);
    setFlags(f);
    setLastGain({ e: c.e, r: c.r, chapter: scene.chapter.title, choice: c.t });
    setLog([...log, { chapter: scene.chapter.title, choice: c.t, r: c.r }]);
    setScreen("feedback");

    // 선택에 next 가 지정돼 있으면 그 장면으로 분기합니다.
    // 분기 장면을 막 끝냈다면, 그 분기의 출발점 다음 일반 장면으로 복귀합니다.
    let n;
    if (c.next && INDEX_BY_ID[c.next] !== undefined) {
      n = INDEX_BY_ID[c.next];
    } else {
      n = nextIndex(idx + 1, s, f);
    }
    setIdx(n);
  }

  function proceed() {
    if (idx === -1) setScreen("result");
    else setScreen("play");
  }

  // 분기 장면을 끝낸 뒤 다음 일반 장면을 찾습니다.
  function afterBranch(fromId, s, f) {
    const i = INDEX_BY_ID[fromId];
    return nextIndex(i + 1, s, f);
  }

  function restart() {
    setScreen("intro");
    setStats({ ...START });
    setFlags(new Set());
    setLog([]);
    setIdx(0);
  }

  const progress = Math.min(100, Math.round((log.length / 21) * 100));

  return (
    <div className="lu-root">
      <Stars />

      {screen === "intro" && (
        <div className="lu-card lu-intro">
          <div className="lu-orb-mini">🎲</div>
          <p className="lu-eyebrow">LIFE SIMULATION</p>
          <h1 className="lu-title">
            당신의 인생을
            <br />
            처음부터 살아봅니다
          </h1>
          <p className="lu-sub">
            유년기부터 노년까지, 20여 번의 선택.
            <br />
            선택마다 다음 이야기가 달라지고 결말은 18가지입니다.
          </p>
          <button className="lu-btn" onClick={start}>
            인생 시작하기
          </button>
          <p className="lu-mini">20~26장면 · 엔딩 18종 · 경로 890가지</p>
        </div>
      )}

      {screen === "play" && scene && (
        <div className="lu-card sim-card">
          <div className="sim-head">
            <span className="sim-chapter">
              {scene.chapter.emoji} {scene.chapter.title}
            </span>
            <span className="sim-age">{scene.chapter.age}</span>
          </div>
          <div className="lu-progress-bar">
            <div className="lu-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <StatBar stats={stats} />

          <p className="sim-text">{scene.text}</p>

          <div className="lu-options">
            {scene.choices.map((c, i) => (
              <button key={i} className="lu-option" onClick={() => choose(i)}
                      style={{ animationDelay: `${i * 0.05}s` }}>
                {c.t}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "feedback" && lastGain && (
        <div className="lu-card sim-card sim-feedback">
          <p className="fb-choice">「{lastGain.choice}」</p>
          <p className="fb-result">{lastGain.r}</p>

          <div className="fb-gains">
            {Object.entries(lastGain.e).map(([k, v]) => (
              <span key={k} className={`fb-gain ${v > 0 ? "up" : "down"}`}>
                {STATS[k].emoji} {STATS[k].label} {v > 0 ? "+" : ""}
                {v}
              </span>
            ))}
          </div>

          <button className="lu-btn" onClick={proceed}>
            {idx === -1 ? "인생을 마무리한다" : "계속"}
          </button>
        </div>
      )}

      {screen === "result" && result && (
        <div className="lu-result-wrap">
          <div id="result-card-lifesim"
            className={`lu-result-card${cardToneClass(result.ending.grad)}`}
            style={{ background: `linear-gradient(160deg, ${result.ending.grad[0]}, ${result.ending.grad[1]})` }}>
            <p className="lu-result-eyebrow">당신의 인생은 이렇게 끝났습니다</p>
            <div className="lu-orb">
              <span>{result.ending.emoji}</span>
            </div>
            <h2 className="lu-result-name">{result.ending.title}</h2>
            <p className="lu-result-tagline">&ldquo;{result.ending.line}&rdquo;</p>
            <p className="lu-result-desc">{result.ending.text}</p>

            <div className="lu-bars">
              <p className="lu-bars-title">최종 능력치</p>
              {Object.values(STATS).map((st) => (
                <div className="bar-row" key={st.key}>
                  <div className="bar-head">
                    <span className="bar-label">{st.emoji} {st.label}</span>
                    <span className="bar-pct">{result.stats[st.key]}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${result.stats[st.key]}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="info-box">
              <p className="info-title">📖 당신이 지나온 길</p>
              <ol className="life-log">
                {result.log.map((l, i) => (
                  <li key={i}>
                    <span className="life-ch">{l.chapter}</span> {l.choice}
                  </li>
                ))}
              </ol>
            </div>

            <p className="lu-watermark">zemitest.com</p>
          </div>

          <Link href="/tests/lifesim/types#endings" className="lu-readmore lu-readmore-main">
            <span>18가지 엔딩 전부 보기</span>
            <span className="lu-readmore-arrow">→</span>
          </Link>

          <ResultStats test="lifesim" type={result.ending.key} typeName={result.ending.title} />
          <CommentJump pageId="test-lifesim" count={cmtCount} />

          <div className="lu-actions">
            <ShareButtons
              text={`내 인생의 결말은 「${result.ending.emoji} ${result.ending.title}」\n"${result.ending.line}"\n\n너는 어떻게 끝나는지 살아봐 🎲`}
              url="https://zemitest.com/tests/lifesim" title="인생 시뮬레이션" />
            <SaveImageButton targetId="result-card-lifesim" filename="zemitest-lifesim" />
            <button className="lu-btn lu-ghost" onClick={restart}>다시 살아보기</button>
          </div>
          <p className="lu-mini lu-center">선택을 바꾸면 완전히 다른 인생이 나옵니다 🎲</p>

          <Comments pageId="test-lifesim" title="다들 어떤 엔딩 나왔어요?" onCount={setCmtCount} />
        </div>
      )}
    </div>
  );
}

function StatBar({ stats }) {
  return (
    <div className="sim-stats">
      {Object.values(STATS).map((st) => (
        <div className="sim-stat" key={st.key}>
          <span className="sim-stat-emoji">{st.emoji}</span>
          <div className="sim-stat-track">
            <div className="sim-stat-fill" style={{ width: `${stats[st.key]}%` }} />
          </div>
          <span className="sim-stat-num">{stats[st.key]}</span>
        </div>
      ))}
    </div>
  );
}
