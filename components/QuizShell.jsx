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

// 모든 문항을 마친 뒤, 결과를 바로 띄우지 않고 한 번 확인받는 화면
export function ReadyScreen({ emoji = "🎉", total, onShow, onBack }) {
  return (
    <div className="lu-card lu-intro">
      <div className="lu-orb-mini">{emoji}</div>
      <p className="lu-eyebrow">ALL DONE</p>
      <h1 className="lu-title">
        {total}문항 모두 완료!
      </h1>
      <p className="lu-sub">
        결과가 준비됐어요.
        <br />
        아래 버튼을 눌러 확인해보세요.
      </p>
      <button className="lu-btn" onClick={onShow}>
        결과 보기
      </button>
      {onBack && (
        <button className="lu-back" onClick={onBack}>
          ← 마지막 문항 다시 보기
        </button>
      )}
    </div>
  );
}
