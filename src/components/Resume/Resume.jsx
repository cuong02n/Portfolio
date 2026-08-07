import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiDownload, FiArrowRight, FiFileText } from "react-icons/fi";
import SectionHead from "../ui/SectionHead";
import resumePdf from "../../Assets/Resume_CuongNguyenManh.pdf";

// The CV is a static PDF handed to the browser's own viewer.
//
// `<object>`'s own fallback is not enough here: when the browser can't display
// a PDF inline it still reserves the element's CSS height, so the fallback card
// floats above ~800px of empty box. Every mobile browser takes that path. So we
// ask first — `navigator.pdfViewerEnabled` is the standard capability flag —
// and only mount the viewer when it will actually paint something.
//
// The check runs in an effect rather than during render so the server-rendered
// and first client paint agree, and so a browser that predates the flag simply
// gets the (perfectly usable) download card.
function Resume() {
  const { t } = useTranslation();
  const [canInline, setCanInline] = useState(false);

  useEffect(() => {
    setCanInline(navigator.pdfViewerEnabled === true);
  }, []);

  const download = (
    <a
      className="pf-btn pf-btn--primary"
      href={resumePdf}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FiDownload size={16} /> {t("resume.download")}
    </a>
  );

  return (
    <section className="pf-container pf-section pf-section--first">
      <SectionHead
        as="h1"
        eyebrow={t("resume.eyebrow")}
        title={t("resume.title")}
        lead={t("resume.desc")}
        action={download}
      />

      {canInline ? (
        <object
          className="pf-resume-frame"
          data={resumePdf}
          type="application/pdf"
          aria-label={t("resume.title")}
        />
      ) : (
        <div className="pf-card pf-resume-card">
          <span className="pf-card-icon">
            <FiFileText />
          </span>
          <p className="pf-muted" style={{ margin: "0 0 18px", maxWidth: "42ch" }}>
            {t("resume.noInline")}
          </p>
          {download}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
        {download}
        <Link to="/about" className="pf-btn">
          {t("nav.about")} <FiArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default Resume;
