import React from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPhone, FaGithub, FaStackOverflow } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import { PROFILE } from "../../data/profile";

// Every way to reach me, in one place. The phone number and address are already
// on the public CV, so there is nothing here the PDF does not already say.
function Contact() {
  const { t } = useTranslation();

  const items = [
    {
      Icon: FaEnvelope,
      labelKey: "contact.email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
    },
    {
      Icon: FaPhone,
      labelKey: "contact.phone",
      value: PROFILE.phone,
      href: `tel:${PROFILE.phoneHref}`,
    },
    {
      Icon: FaGithub,
      labelKey: "contact.github",
      value: `github.com/${PROFILE.github}`,
      href: PROFILE.githubUrl,
      external: true,
    },
    {
      Icon: SiCodeforces,
      labelKey: "contact.codeforces",
      value: PROFILE.codeforces,
      href: PROFILE.codeforcesUrl,
      external: true,
    },
    {
      Icon: FaStackOverflow,
      labelKey: "contact.stackoverflow",
      value: "Nguyen Manh Cuong",
      href: PROFILE.stackoverflowUrl,
      external: true,
    },
  ];

  return (
    <>
      <p className="pf-eyebrow">{t("contact.eyebrow")}</p>
      <ul className="pf-contact-list">
        {items.map(({ Icon, labelKey, value, href, external }) => (
          <li key={labelKey}>
            <a
              className="pf-contact-item"
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <Icon className="pf-contact-icon" />
              <span style={{ minWidth: 0 }}>
                <span className="pf-contact-label">{t(labelKey)}</span>
                <span className="pf-contact-value">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Contact;
