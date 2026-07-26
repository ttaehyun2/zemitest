"use client";

// 인트로 + 문항 진행 UI 공통 껍데기.
// 결과 화면은 각 테스트가 알아서 그림.
export function Intro({ emoji, eyebrow, title, sub, meta, onStart }) {
  return (
    <div className="lu-card lu-intro">
      <div className="lu-orb-mini">{emoji}</div>
      <p className="lu-eyebrow">{eyebrow}</p>
      <h1 className="lu-title">{title}</h1>
      <p className="lu-sub">{sub}</p>
      <button className="lu-btn" onClick={onStart}>
        테스트 시작하기
      </button>
      <p className="lu-mini">{meta}</p>
    </div>
  );
}

export function QuestionCard({ step, total, question, options, onPick, onBack }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="lu-card lu-quiz">
      <div className="lu-progress-top">
        <span>
          {step + 1} / {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="lu-progress-bar">
        <div className="lu-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <h2 className="lu-question" key={step}>
        {question}
      </h2>

      <div className="lu-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className="lu-option"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => onPick(i)}
          >
            {opt}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button className="lu-back" onClick={onBack}>
          ← 이전 질문
        </button>
      )}
    </div>
  );
}

// 퍼센트 막대
export function Bar({ label, pct, color, sub }) {
  return (
    <div className="bar-row">
      <div className="bar-head">
        <span className="bar-label">{label}</span>
        <span className="bar-pct">{pct}%</span>
      </div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${pct}%`, background: color || "rgba(255,255,255,0.85)" }}
        />
      </div>
      {sub && <p className="bar-sub">{sub}</p>}
    </div>
  );
}
