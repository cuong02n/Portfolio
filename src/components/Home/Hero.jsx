import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import Type from "./Type";
import Terminal from "./Terminal";
import { PROFILE, STATS } from "../../data/profile";
import resumePdf from "../../Assets/Resume_CuongNguyenManh.pdf";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="pf-container pf-hero">
      <div>
        <p className="pf-hero-status">
          <span className="pf-dot pf-dot--pulse" />
          {t("hero.status")}
        </p>

        <p className="pf-hero-greet">{t("hero.greeting")}</p>
        <h1 className="pf-h1 pf-hero-name">
          <span className="pf-gradient-text">{t("profile.name")}</span>
        </h1>

        <div className="pf-hero-typed">
          <Type />
        </div>

        <p className="pf-lead pf-hero-intro">{t("hero.intro")}</p>

        <div className="pf-hero-actions">
          <Link to="/project" className="pf-btn pf-btn--primary">
            {t("hero.cta.projects")} <FiArrowRight size={16} />
          </Link>
          <a className="pf-btn" href={resumePdf} target="_blank" rel="noopener noreferrer">
            <FiDownload size={16} /> {t("hero.cta.resume")}
          </a>
          <a className="pf-btn" href={`mailto:${PROFILE.email}`}>
            <FiMail size={16} /> {t("hero.cta.contact")}
          </a>
        </div>

        <div className="pf-stats">
          {STATS.map((stat) => (
            <div className="pf-stat" key={stat.labelKey}>
              <span className="pf-stat-value pf-gradient-text">{stat.value}</span>
              <span className="pf-stat-label">{t(stat.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Terminal />
        <p className="pf-hero-caption">{t("hero.terminal.caption")}</p>
      </div>
    </section>
  );
}

export default Hero;
