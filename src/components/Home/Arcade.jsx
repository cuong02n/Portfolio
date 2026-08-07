import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import SnakeGame from "../Arcade/SnakeGame";
import TetrisGame from "../Arcade/TetrisGame";

// Both games play themselves: Snake runs BFS to the food with a flood-fill
// survival fallback, Tetris scores every rotation × column with a weighted
// heuristic. They stay collapsed by default — the canvases animate forever, and
// an unattended render loop is not what a first-time visitor came for.
function Arcade() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <section className="pf-container pf-section pf-section--tight">
      <div className="pf-card">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ flex: "1 1 320px" }}>
            <h2 className="pf-h3">{t("home.arcade.title")}</h2>
            <p className="pf-muted" style={{ margin: "6px 0 0", fontSize: "0.9rem" }}>
              {t("home.arcade.desc")}
            </p>
          </div>
          <button
            type="button"
            className={`pf-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t("home.arcade.hide") : t("home.arcade.show")}
            <FiChevronDown size={15} />
          </button>
        </div>

        {open && (
          <div className="pf-arcade-games">
            <div className="pf-arcade-slot">
              <SnakeGame cols={18} rows={18} cell={14} interval={80} />
            </div>
            <div className="pf-arcade-slot">
              <TetrisGame cell={14} interval={55} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Arcade;
