import React from "react";
import ReactDOM from "react-dom/client";

// Import order is load order: index.css carries Tailwind's preflight reset and
// must be evaluated BEFORE App pulls in style.css, otherwise preflight lands
// last and clobbers the design system's base rules.
import "./index.css";

/* ------------------------------ fonts ------------------------------------ */
// Self-hosted through @fontsource — no render-blocking request to a font CDN.
// Inter carries the UI; Space Mono carries labels, the terminal card and tags.
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

// i18n must initialise before the first render so components see translations
// on their first pass rather than flashing raw keys.
import "./Assets/lang/i18n";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
