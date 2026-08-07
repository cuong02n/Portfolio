import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Preloader from "./components/Pre";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Fallback from "./components/ui/Fallback";
import Home from "./components/Home/Home";
import "./style.css";

// Home ships in the entry chunk — it is what most visitors load first.
// Everything else is split out: the demo modules pull in @xyflow/react and the
// About page pulls in recharts, and neither belongs in a first paint.
const About = lazy(() => import("./components/About/About"));
const Stack = lazy(() => import("./components/Stack/Stack"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/Resume"));
const CrawlerApp = lazy(() => import("./features/phone-crawler/CrawlerApp"));
const SystemFlowApp = lazy(() => import("./features/system-flow/SystemFlowApp"));

// Feature modules render full-screen with their own chrome — and the Projects
// page embeds them in an iframe — so the portfolio shell is suppressed on their
// routes to avoid nesting one site inside another.
function AppShell({ load }) {
  const { pathname } = useLocation();
  const isDemo = pathname.startsWith("/projects/");

  return (
    <div className="pf-app" id={load ? "no-scroll" : "scroll"}>
      <ScrollToTop />
      {!isDemo && <Navbar />}

      <main className="pf-main">
        <Suspense fallback={<Fallback height={isDemo ? "100vh" : "70vh"} />}>
          <Routes>
            {/* Portfolio */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />

            {/* Live demo modules — one feature per backend */}
            <Route path="/projects/phone-crawler/*" element={<CrawlerApp />} />
            <Route path="/projects/system-flow/*" element={<SystemFlowApp />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {!isDemo && <Footer />}
    </div>
  );
}

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <AppShell load={load} />
    </Router>
  );
}

export default App;
