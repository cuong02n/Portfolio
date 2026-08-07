import React from "react";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import { TYPED_ROLE_KEYS } from "../../data/profile";

// Typewriter reads its `strings` once on mount, so the whole widget is keyed on
// the active language — switching locale remounts it with translated copy.
function Type() {
  const { t, i18n } = useTranslation();

  return (
    <Typewriter
      key={i18n.language}
      options={{
        strings: TYPED_ROLE_KEYS.map((key) => t(key)),
        autoStart: true,
        loop: true,
        delay: 55,
        deleteSpeed: 30,
      }}
    />
  );
}

export default Type;
