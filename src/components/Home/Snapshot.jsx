import React from "react";
import { useTranslation } from "react-i18next";
import { SNAPSHOT, SNAPSHOT_STACK } from "../../data/profile";

// The card beside the hero intro: the CV summary in plain language. It replaced
// an ASCII terminal pane — the first readers of this page are recruiters, and a
// shell transcript is not the format they scan fastest. Real content, not
// decoration, so it stays in the accessibility tree.
//
// Deliberately generic about employers — no hostnames, addresses or anything
// else that belongs to a company.
function Snapshot() {
  const { t } = useTranslation();

  return (
    <aside className="pf-snap">
      <p className="pf-snap-eyebrow">{t("snapshot.title")}</p>

      <dl className="pf-snap-rows">
        {SNAPSHOT.map((row) => (
          <div className="pf-snap-row" key={row.id}>
            <dt className="pf-snap-label">{t(`snapshot.${row.id}`)}</dt>
            <dd className="pf-snap-value">
              {row.valueKey ? t(row.valueKey) : row.value}
              {row.meta && <span className="pf-snap-meta">{row.meta}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="pf-snap-stack">
        <p className="pf-snap-label">{t("snapshot.stack")}</p>
        <ul className="pf-tags">
          {SNAPSHOT_STACK.map((tech) => (
            <li className="pf-tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Snapshot;
