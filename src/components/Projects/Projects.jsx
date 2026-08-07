import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import SectionHead from "../ui/SectionHead";
import ProjectCard from "./ProjectCard";
import { LIVE_DEMOS, PROJECTS, KIND } from "../../data/projects";

const FILTERS = ["all", ...Object.keys(KIND)];

function Projects() {
  const { t } = useTranslation();
  const [active, setActive] = useState(LIVE_DEMOS[0].key);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const current = LIVE_DEMOS.find((d) => d.key === active) || LIVE_DEMOS[0];

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.kind === filter)),
    [filter]
  );

  const selectDemo = (key) => {
    setActive(key);
    setSummaryOpen(false); // a summary belongs to the demo it was opened under
  };

  return (
    <>
      {/* Live demos ----------------------------------------------------- */}
      <section className="pf-container pf-section pf-section--first">
        <SectionHead
          as="h1"
          eyebrow={t("projects.eyebrow")}
          title={t("projects.live.title")}
          lead={t("projects.live.desc")}
        />

        <div className="pf-demo">
          <div className="pf-demo-tabs" role="tablist">
            {LIVE_DEMOS.map((demo) => (
              <button
                key={demo.key}
                type="button"
                role="tab"
                aria-selected={active === demo.key}
                className={`pf-demo-tab${active === demo.key ? " is-active" : ""}`}
                onClick={() => selectDemo(demo.key)}
              >
                <span className="pf-demo-tab-label">{t(demo.labelKey)}</span>
                <span className="pf-demo-tab-sub">{t(demo.subKey)}</span>
              </button>
            ))}
          </div>

          <div className="pf-demo-panel" role="tabpanel">
            <div className="pf-demo-head">
              <h3 className="pf-demo-title">{t(current.labelKey)}</h3>
              <button
                type="button"
                className={`pf-toggle${summaryOpen ? " is-open" : ""}`}
                aria-expanded={summaryOpen}
                onClick={() => setSummaryOpen((v) => !v)}
              >
                {t("projects.summary")} <FiChevronDown size={15} />
              </button>
              <a
                className="pf-link-arrow"
                href={current.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("projects.fullscreen")} <FiArrowUpRight size={15} />
              </a>
            </div>

            {summaryOpen && (
              <div
                className="pf-demo-summary"
                // Copy carries <br/> and <b> for emphasis; the source is our own
                // translation file, not user input.
                dangerouslySetInnerHTML={{ __html: t(current.bodyKey) }}
              />
            )}

            {/* Keyed so switching tabs remounts the frame — only one demo is
                ever live, and each starts from a clean route. */}
            <iframe
              key={current.key}
              title={t(current.labelKey)}
              src={current.src}
              className="pf-demo-frame"
            />
          </div>
        </div>
      </section>

      {/* Full catalogue -------------------------------------------------- */}
      <section className="pf-container pf-section">
        <SectionHead
          title={t("projects.all.title")}
          lead={t("projects.all.desc")}
        />

        <div className="pf-filters">
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              className={`pf-filter${filter === key ? " is-active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {key === "all" ? t("projects.filter.all") : t(KIND[key])}
            </button>
          ))}
        </div>

        <div className="pf-projects">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
