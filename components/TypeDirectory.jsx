"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cardToneClass } from "../lib/contrast";

/**
 * 유형 사전. 결과 화면에서 #유형키 앵커로 들어오면 해당 카드가 강조됩니다.
 */
export default function TypeDirectory({ items, backHref, backLabel }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (h) {
      setActive(h);
      const el = document.getElementById(h);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
    }
  }, []);

  return (
    <>
      <div className="type-list">
        {items.map((t) => (
          <section
            key={t.key}
            id={t.key}
            className={`type-card${active === t.key ? " type-active" : ""}`}
          >
            <div
              className={`type-head${cardToneClass(t.grad)}`}
              style={{ background: `linear-gradient(120deg, ${t.grad[0]}, ${t.grad[1]})` }}
            >
              <span className="type-emoji">{t.emoji}</span>
              <div>
                <h2 className="type-name">{t.name}</h2>
                {t.tagline && <p className="type-tagline">&ldquo;{t.tagline}&rdquo;</p>}
              </div>
              {active === t.key && <span className="type-badge">내 결과</span>}
            </div>

            <div className="type-body">
              {t.meta && <p className="type-meta">{t.meta}</p>}
              <p className="type-desc">{t.desc}</p>
              {t.detail && <p className="type-desc">{t.detail}</p>}

              {t.lists?.map((grp) => (
                <div className="type-group" key={grp.title}>
                  <p className="type-group-title">{grp.title}</p>
                  <ul className="type-ul">
                    {grp.items.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {t.footer && <p className="type-footer">{t.footer}</p>}
            </div>
          </section>
        ))}
      </div>

      <Link href={backHref} className="article-cta">
        {backLabel} →
      </Link>
    </>
  );
}
