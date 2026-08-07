import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHead from "../ui/SectionHead";
import { SKILL_GROUPS, LEVELS } from "../../data/skills";

// Three dots, filled according to how deep the experience goes. Cheaper to read
// than a percentage bar, and honest — nobody is "87% of Kubernetes".
function LevelDots({ level }) {
  const { t } = useTranslation();
  return (
    <span
      className={`pf-level pf-level--${level}`}
      title={t(`stack.level.${level}.hint`)}
      aria-label={t(`stack.level.${level}`)}
    >
      <i />
      <i />
      <i />
    </span>
  );
}

function Stack() {
  const { t } = useTranslation();
  const [active, setActive] = useState("all");

  const groups = useMemo(
    () =>
      active === "all"
        ? SKILL_GROUPS
        : SKILL_GROUPS.filter((group) => group.id === active),
    [active]
  );

  const total = useMemo(
    () => SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0),
    []
  );

  return (
    <section className="pf-container pf-section pf-section--first">
      <SectionHead
        as="h1"
        eyebrow={t("stack.eyebrow")}
        title={t("stack.title")}
        lead={t("stack.desc")}
      />

      <div className="pf-legend" style={{ marginBottom: 26 }}>
        <span className="pf-legend-title">{t("stack.legend")}</span>
        {LEVELS.map((level) => (
          <span className="pf-legend-item" key={level}>
            <LevelDots level={level} />
            {t(`stack.level.${level}`)}
          </span>
        ))}
        <span className="pf-legend-item pf-dim" style={{ marginLeft: "auto" }}>
          {t("stack.count", { count: total })}
        </span>
      </div>

      <div className="pf-filters" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={active === "all"}
          className={`pf-filter${active === "all" ? " is-active" : ""}`}
          onClick={() => setActive("all")}
        >
          {t("stack.filter.all")}
        </button>
        {SKILL_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={active === group.id}
            className={`pf-filter${active === group.id ? " is-active" : ""}`}
            onClick={() => setActive(group.id)}
          >
            {t(group.titleKey)}
          </button>
        ))}
      </div>

      <div className="pf-stack-groups">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <section
              className={`pf-card pf-stack-group${group.featured ? " is-featured" : ""}`}
              key={group.id}
            >
              <header className="pf-stack-head">
                <span className="pf-card-icon">
                  <Icon />
                </span>
                <div>
                  <h2 className="pf-h3">{t(group.titleKey)}</h2>
                  <p className="pf-stack-blurb">{t(group.blurbKey)}</p>
                </div>
              </header>

              <ul className="pf-skills">
                {group.items.map((item) => (
                  <li className="pf-skill" key={item.name}>
                    <LevelDots level={item.level} />
                    <span className="pf-skill-name">{item.name}</span>
                    <span className="pf-skill-note">{item.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default Stack;
