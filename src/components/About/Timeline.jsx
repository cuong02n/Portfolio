import React from "react";
import { useTranslation } from "react-i18next";
import { EXPERIENCE } from "../../data/experience";

// Reverse-chronological career rail. Entries come from src/data/experience.js,
// which mirrors the CV — edit that file, not this component.
function Timeline() {
  const { t } = useTranslation();

  return (
    <ol className="pf-timeline">
      {EXPERIENCE.map((job) => (
        <li
          className={`pf-tl-item${job.current ? " is-current" : ""}`}
          key={job.id}
        >
          <p className="pf-tl-period">
            {job.from} — {job.to || t("common.present")}
          </p>
          <h3 className="pf-tl-role">{t(job.roleKey)}</h3>
          <p className="pf-tl-company">{job.company}</p>
          <p className="pf-tl-summary">{t(job.summaryKey)}</p>

          <ul className="pf-tl-bullets">
            {job.bulletKeys.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>

          <ul className="pf-tags pf-tl-stack">
            {job.stack.map((tech) => (
              <li className="pf-tag" key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
