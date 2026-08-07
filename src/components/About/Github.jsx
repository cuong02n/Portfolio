import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHead from "../ui/SectionHead";
import { PROFILE } from "../../data/profile";

// The `color` prop generates its ramp for a LIGHT page — level0 lands on
// #ebebeb, so every empty day glowed near-white against the dark canvas. An
// explicit theme keeps the accent hue but starts the ramp inside the surface.
const CALENDAR_THEME = {
  level0: "rgba(255, 255, 255, 0.055)",
  level1: "rgba(167, 139, 250, 0.30)",
  level2: "rgba(167, 139, 250, 0.55)",
  level3: "rgba(167, 139, 250, 0.80)",
  level4: "#c4b5fd",
};

function Github() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHead
        title={t("about.github.title")}
        action={
          <a
            className="pf-link-arrow"
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/{PROFILE.github} <FiArrowUpRight size={15} />
          </a>
        }
      />

      <div className="pf-panel">
        <GitHubCalendar
          username={PROFILE.github}
          blockSize={12}
          blockMargin={5}
          theme={CALENDAR_THEME}
          fontSize={14}
        />
      </div>
    </>
  );
}

export default Github;
