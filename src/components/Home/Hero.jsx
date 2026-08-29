import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import Snapshot from "./Snapshot";
import { PROFILE, STATS } from "../../data/profile";
import resumePdf from "../../Assets/Resume_CuongNguyenManh.pdf";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="pf-container pf-hero">
      <div>
        <p className="pf-hero-status">
          <span className="pf-dot" />
          {t("hero.status")}
        </p>

        <p className="pf-hero-greet">{t("hero.greeting")}</p>
        <h1 className="pf-h1 pf-hero-name">
          {t("profile.name")}
        </h1>

        <p className="pf-hero-role">{t("hero.role")}</p>

        <p className="pf-lead pf-hero-intro">{t("hero.intro")}</p>

        <div className="pf-hero-actions">

          <a className="pf-btn pf-btn--primary" href={resumePdf} target="_blank" rel="noopener noreferrer">
            <FiDownload size={16} /> {t("hero.cta.resume")}
          </a>
          <a className="pf-btn" href="#footer">
            <FiMail size={16} /> {t("hero.cta.contact")}
          </a>
        </div>

        <div className="pf-stats">
          {STATS.map((stat) => (
            <div className="pf-stat" key={stat.labelKey}>
              <span className="pf-stat-value">{stat.value}</span>
              <span className="pf-stat-label">{t(stat.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Snapshot />
      </div>
    </section>
  );
}

export default Hero;
