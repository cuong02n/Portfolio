import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import SectionHead from "../ui/SectionHead";
import Fallback from "../ui/Fallback";
import Timeline from "./Timeline";
import Credentials from "./Credentials";
import Contact from "./Contact";
import Github from "./Github";
import avatar from "../../Assets/avatar.webp";
import resumePdf from "../../Assets/Resume_CuongNguyenManh.pdf";
import { PROFILE } from "../../data/profile";

// recharts is the single heaviest dependency on this page and sits at the very
// bottom — split it out so the bio and timeline paint without waiting for it.
const CodeforcesRatingChart = lazy(() => import("./CodeforcesRatingChart"));

function About() {
  const { t } = useTranslation();

  return (
    <>
      {/* Bio ------------------------------------------------------------ */}
      <section className="pf-container pf-section pf-section--first">
        <SectionHead as="h1" eyebrow={t("about.eyebrow")} title={t("about.title")} />

        <div className="pf-bio">
          <div className="pf-bio-text">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
              <a
                className="pf-btn pf-btn--primary"
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload size={16} /> {t("resume.download")}
              </a>
              <a className="pf-btn" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email} <FiArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <aside className="pf-avatar-frame">
            <img src={avatar} alt={t("profile.name")} />
            <div className="pf-avatar-meta">
              <span>
                <b>{t("profile.role")}</b>
              </span>
              <span>{t("profile.location")}</span>
              <span>{PROFILE.domain}</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Career --------------------------------------------------------- */}
      <section className="pf-container pf-section">
        <SectionHead
          eyebrow={t("about.experience.eyebrow")}
          title={t("about.experience.title")}
        />
        <Timeline />
      </section>

      {/* Education + certifications ------------------------------------- */}
      <section className="pf-container pf-section">
        <Credentials />
      </section>

      {/* Activity ------------------------------------------------------- */}
      <section className="pf-container pf-section">
        <Github />
      </section>

      <section className="pf-container pf-section pf-section--tight">
        <SectionHead
          title={t("about.codeforces.title")}
          lead={t("about.codeforces.desc")}
        />
        <div className="pf-panel">
          <Suspense fallback={<Fallback height="380px" />}>
            <CodeforcesRatingChart username={PROFILE.codeforces} />
          </Suspense>
        </div>
      </section>

      <section className="pf-container pf-section pf-section--tight">
        <Contact />
      </section>
    </>
  );
}

export default About;
