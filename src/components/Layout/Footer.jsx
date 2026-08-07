import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaGithub, FaStackOverflow, FaEnvelope } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import { PROFILE } from "../../data/profile";

const PAGES = [
  { to: "/about", labelKey: "nav.about" },
  { to: "/stack", labelKey: "nav.stack" },
  { to: "/project", labelKey: "nav.projects" },
  { to: "/resume", labelKey: "nav.resume" },
];

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const socials = [
    { href: PROFILE.githubUrl, label: "GitHub", Icon: FaGithub },
    { href: PROFILE.stackoverflowUrl, label: "Stack Overflow", Icon: FaStackOverflow },
    { href: PROFILE.codeforcesUrl, label: "Codeforces", Icon: SiCodeforces },
    { href: `mailto:${PROFILE.email}`, label: "Email", Icon: FaEnvelope },
  ];

  return (
    <footer className="pf-footer">
      <div className="pf-container">
        <div className="pf-footer-grid">
          <div className="pf-footer-brand">
            <Link to="/" className="pf-brand">
              cuong<span>02</span>
            </Link>
            <p className="pf-footer-tagline">{t("footer.tagline")}</p>
            <div className="pf-footer-social">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="pf-footer-title">{t("footer.nav")}</h2>
            <ul className="pf-footer-list">
              {PAGES.map((page) => (
                <li key={page.to}>
                  <Link to={page.to}>{t(page.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="pf-footer-title">{t("footer.connect")}</h2>
            <ul className="pf-footer-list">
              <li>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </li>
              <li>
                <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
                  github.com/{PROFILE.github}
                </a>
              </li>
              <li>
                <a href={PROFILE.codeforcesUrl} target="_blank" rel="noopener noreferrer">
                  codeforces.com/{PROFILE.codeforces}
                </a>
              </li>
              <li>
                <a href={PROFILE.site} target="_blank" rel="noopener noreferrer">
                  {PROFILE.domain}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pf-footer-bar">
          <span>
            © {year} {t("profile.name")}. {t("footer.rights")}
          </span>
          <a
            href="https://github.com/cuong02n/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.built")}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
