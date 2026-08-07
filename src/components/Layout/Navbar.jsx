import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import LanguagePicker from "../Language/LanguagePicker";
import { useTranslation } from "react-i18next";
import { PROFILE } from "../../data/profile";

// Order matters — this is the reading order of the site: who, what I know,
// what I built, the one-pager.
const LINKS = [
  { to: "/", labelKey: "nav.home", end: true },
  { to: "/about", labelKey: "nav.about" },
  { to: "/stack", labelKey: "nav.stack" },
  { to: "/project", labelKey: "nav.projects" },
  { to: "/resume", labelKey: "nav.resume" },
];

function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route changes close the mobile drawer; leaving it open across a navigation
  // hides the page the visitor just asked for.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`pf-nav${scrolled ? " pf-nav--scrolled" : ""}`}>
      <nav className="pf-container pf-nav-inner" aria-label={t("nav.menu")}>
        <NavLink to="/" className="pf-brand">
          cuong<span>02</span>
        </NavLink>

        {/* One list, two layouts: inline on desktop, a drawer below 860px where
            `is-open` is what actually reveals it. */}
        <ul
          className={`pf-nav-links${open ? " is-open" : ""}`}
          id="pf-nav-links"
        >
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `pf-nav-link${isActive ? " is-active" : ""}`
                }
              >
                {t(link.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pf-nav-right">
          <LanguagePicker />
          <a
            className="pf-btn pf-btn--sm pf-nav-cta"
            href={`mailto:${PROFILE.email}`}
          >
            {t("hero.cta.contact")}
          </a>
          <button
            type="button"
            className="pf-nav-toggle"
            aria-expanded={open}
            aria-controls="pf-nav-links"
            aria-label={t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
