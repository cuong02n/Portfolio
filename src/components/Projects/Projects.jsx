import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Left vertical tabs → right panel shows the live demo directly (iframe of the
// full-screen route; the portfolio Navbar is hidden on /projects/*). The summary
// is tucked into a dropdown under the title, hidden by default. System-flow
// demos pass ?company=<id>.
const TABS = [
  {
    key: "crawler",
    label: "Phone Crawler",
    sub: "Phone Crawler Tab Desc",
    html: "Phone Crawler Description",
    src: "/projects/phone-crawler",
  },
  {
    key: "nexus",
    label: "NexusTI Flow",
    sub: "NexusTI Flow Tab Desc",
    html: "System Flow Description",
    src: "/projects/system-flow/board?company=nexus-ti",
  },
  {
    key: "sample",
    label: "Sample Flow",
    sub: "Sample Flow Tab Desc",
    html: "System Flow Description",
    src: "/projects/system-flow/board?company=company-a",
  },
];

function Projects() {
  const { t } = useTranslation();
  const [active, setActive] = useState(TABS[0].key);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const current = TABS.find((x) => x.key === active) || TABS[0];

  const selectTab = (key) => {
    setActive(key);
    setSummaryOpen(false); // hide the summary when switching projects
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container fluid className="proj-fluid">
        <h1 className="project-heading">
          {t("My Recent")} <strong className="purple">{t("Works")}</strong>
        </h1>
        <p style={{ color: "white" }}>
          {t("Here are a few projects I've worked on recently.")}
        </p>

        <div className="proj-layout">
          {/* Left: vertical tabs */}
          <div className="proj-side" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={active === tab.key}
                className={`proj-side-tab${active === tab.key ? " active" : ""}`}
                onClick={() => selectTab(tab.key)}
              >
                <span className="proj-side-label">{t(tab.label)}</span>
                <span className="proj-side-sub">{t(tab.sub)}</span>
              </button>
            ))}
          </div>

          {/* Right: live demo, with a collapsible summary under the title */}
          <div className="proj-content" role="tabpanel">
            <div className="proj-content-head">
              <h2 className="proj-content-title">{t(current.label)}</h2>
              <button
                className={`proj-summary-toggle${summaryOpen ? " open" : ""}`}
                onClick={() => setSummaryOpen((v) => !v)}
                aria-expanded={summaryOpen}
              >
                {t("Summary")} <ChevronDown size={15} />
              </button>
              <a
                className="proj-content-open"
                href={current.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Open full screen")} <ArrowUpRight size={14} />
              </a>
            </div>

            {summaryOpen && (
              <div
                className="proj-summary"
                dangerouslySetInnerHTML={{ __html: t(current.html) }}
              />
            )}

            {/* key forces a fresh load (one demo mounted) per tab */}
            <iframe
              key={current.key}
              title={current.label}
              src={current.src}
              className="proj-frame"
            />
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Projects;
