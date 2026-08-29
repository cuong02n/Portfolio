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

    </>
  );
}

export default Home;

