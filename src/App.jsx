import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Resume from "./components/Resume/ResumeNew";
import CrawlerApp from "./features/phone-crawler/CrawlerApp";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation
} from "react-router-dom";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Project demo modules render full-screen (own chrome), so the portfolio Navbar
// is hidden on their routes.
function AppShell({ load }) {
    const location = useLocation();
    const isDemo = location.pathname.startsWith("/projects/");

    return (
        <div className="App" id={load ? "no-scroll" : "scroll"}>
            {!isDemo && <Navbar />}
            <Routes>
                {/* Portfolio */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/resume" element={<Resume />} />

                {/* Project demos (multi-module: one feature per backend) */}
                <Route path="/projects/phone-crawler/*" element={<CrawlerApp />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

function App() {
    const [load, updateLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateLoad(false);
        }, 1200);

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
