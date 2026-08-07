import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "vi", short: "VI", label: "Tiếng Việt" },
];

// The chosen language is persisted under localStorage['language'] and read back
// by i18n.init on the next visit.
function LanguagePicker() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const choose = useCallback(
    (code) => {
      i18n.changeLanguage(code);
      localStorage.setItem("language", code);
      setOpen(false);
    },
    [i18n]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="pf-lang" ref={ref}>
      <button
        type="button"
        className="pf-lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {current.short}
        <FiChevronDown size={13} />
      </button>

      {open && (
        <div className="pf-lang-menu" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={lang.code === current.code}
              className={`pf-lang-item${
                lang.code === current.code ? " is-active" : ""
              }`}
              onClick={() => choose(lang.code)}
            >
              <span className="pf-mono">{lang.short}</span>
              {lang.label}
              {lang.code === current.code && (
                <FiCheck size={14} style={{ marginLeft: "auto" }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguagePicker;
