import React from "react";
import { useTranslation } from "react-i18next";
import { EDUCATION, CERTIFICATIONS } from "../../data/experience";

// Education and certifications, side by side. Both lists are short by design —
// the career timeline above carries the weight.
function Credentials() {
  const { t } = useTranslation();

  return (
    <div className="pf-grid-2">
      <div className="pf-card">
        <h3 className="pf-h3" style={{ marginBottom: 18 }}>
          {t("about.education.title")}
        </h3>
        {EDUCATION.map((edu) => (
          <div className="pf-cred" key={edu.id}>
            <span className="pf-cred-date">
              {edu.from.slice(-2)}–{edu.to.slice(-2)}
            </span>
            <div>
              <h4 className="pf-cred-title">{t(edu.degreeKey)}</h4>
              <p className="pf-cred-issuer" style={{ margin: 0 }}>
                {edu.school}
              </p>
              <p className="pf-cred-detail" style={{ color: "var(--pf-accent-2)" }}>
                {t(edu.scoreKey)}
              </p>
              <p className="pf-cred-detail">{t(edu.detailKey)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pf-card">
        <h3 className="pf-h3" style={{ marginBottom: 18 }}>
          {t("about.credentials.title")}
        </h3>
        <div className="pf-stack-vert">
          {CERTIFICATIONS.map((cert) => (
            <div className="pf-cred" key={cert.id}>
              <span className="pf-cred-date">{cert.date}</span>
              <div>
                <h4 className="pf-cred-title">{t(cert.titleKey)}</h4>
                <p className="pf-cred-issuer" style={{ margin: 0 }}>
                  {cert.issuer}
                </p>
                <p className="pf-cred-detail">{t(cert.detailKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Credentials;
