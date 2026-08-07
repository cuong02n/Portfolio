import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import { KIND } from "../../data/projects";

// One card in the project grid. Internal links (the live demo modules mounted
// under /projects/*) route in-app; everything else opens in a new tab.
function ProjectCard({ project }) {
  const { t } = useTranslation();
  const Icon = project.icon;

  const period = project.ongoing
    ? `${project.period} — ${t("common.present")}`
    : project.period;

  return (
    <article className="pf-card pf-card--hover pf-proj">
      <div className="pf-proj-top">
        <span className="pf-card-icon">
          <Icon />
        </span>
        <span className={`pf-badge pf-badge--${project.kind}`}>
          {t(KIND[project.kind])}
        </span>
        <span className="pf-proj-period">{period}</span>
      </div>

      <h3 className="pf-proj-title">{t(project.titleKey)}</h3>
      <p className="pf-proj-desc">{t(project.descKey)}</p>

      <ul className="pf-tags" style={{ marginBottom: 4 }}>
        {project.tags.map((tag) => (
          <li className="pf-tag" key={tag}>
            {tag}
          </li>
        ))}
      </ul>

      <div className="pf-proj-foot">
        {project.links.length === 0 ? (
          <span className="pf-proj-private">{t("projects.private")}</span>
        ) : (
          project.links.map((link) =>
            link.internal ? (
              <Link key={link.href} to={link.href} className="pf-link-arrow">
                {t(link.labelKey)} <FiArrowUpRight size={15} />
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-link-arrow"
              >
                {t(link.labelKey)} <FiArrowUpRight size={15} />
              </a>
            )
          )
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
