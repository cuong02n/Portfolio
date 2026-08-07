import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaServer, FaDatabase, FaGears } from "react-icons/fa6";
import Hero from "./Hero";
import Arcade from "./Arcade";
import SectionHead from "../ui/SectionHead";
import ProjectCard from "../Projects/ProjectCard";
import { FEATURED_PROJECTS } from "../../data/projects";
import { CORE_STACK } from "../../data/skills";
import { PROFILE } from "../../data/profile";

const CAPABILITIES = [
  { id: "c1", Icon: FaServer },
  { id: "c2", Icon: FaDatabase },
  { id: "c3", Icon: FaGears },
];

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      {/* What I do ------------------------------------------------------ */}
      <section className="pf-container pf-section">
        <SectionHead
          eyebrow={t("home.what.eyebrow")}
          title={t("home.what.title")}
        />
        <div className="pf-grid-3">
          {CAPABILITIES.map(({ id, Icon }) => (
            <article className="pf-card pf-card--hover" key={id}>
              <span className="pf-card-icon">
                <Icon />
              </span>
              <h3 className="pf-h3">{t(`home.what.${id}.title`)}</h3>
              <p className="pf-muted" style={{ margin: "8px 0 0", fontSize: "0.92rem" }}>
                {t(`home.what.${id}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Selected work -------------------------------------------------- */}
      <section className="pf-container pf-section">
        <SectionHead
          eyebrow={t("home.featured.eyebrow")}
          title={t("home.featured.title")}
          lead={t("home.featured.desc")}
          action={
            <Link to="/project" className="pf-link-arrow">
              {t("home.featured.cta")} <FiArrowUpRight size={15} />
            </Link>
          }
        />
        <div className="pf-projects">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

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

      <Arcade />
    </>
  );
}

export default Home;
