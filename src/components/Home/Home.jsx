import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiMail } from "react-icons/fi";
import Hero from "./Hero";
import SectionHead from "../ui/SectionHead";
import { CORE_STACK } from "../../data/skills";
import { PROFILE } from "../../data/profile";

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      {/* Core stack ----------------------------------------------------- */}
      <section className="pf-container pf-section">
        <SectionHead
          eyebrow={t("home.stack.eyebrow")}
          title={t("home.stack.title")}
          lead={t("home.stack.desc")}
        />
        <ul className="pf-strip">
          {CORE_STACK.map((tech) => (
            <li className="pf-tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 26, textAlign: "center" }}>
          <Link to="/stack" className="pf-btn">
            {t("home.stack.cta")} <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Contact -------------------------------------------------------- */}
      <section className="pf-container pf-section pf-section--tight">
        <div className="pf-cta">
          <div className="pf-cta-text">
            <h2 className="pf-h2" style={{ marginBottom: 8 }}>
              {t("home.contact.title")}
            </h2>
            <p className="pf-muted" style={{ margin: 0 }}>
              {t("home.contact.desc")}
            </p>
          </div>
          <div className="pf-cta-actions">
            <a className="pf-btn pf-btn--primary" href={`mailto:${PROFILE.email}`}>
              <FiMail size={16} /> {t("home.contact.cta")}
            </a>
            <Link to="/about" className="pf-btn">
              {t("nav.about")} <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

