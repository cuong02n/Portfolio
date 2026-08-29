import React from "react";
import SnakeGame from "../Arcade/SnakeGame";
import TetrisGame from "../Arcade/TetrisGame";

function Arcade() {
  return (
    <section className="pf-container pf-section pf-section--tight">
      <div className="pf-card">
        <div className="pf-arcade-games">
          <div className="pf-arcade-slot">
            <SnakeGame cols={18} rows={18} cell={14} interval={80} />
          </div>
          <div className="pf-arcade-slot">
            <TetrisGame cell={14} interval={55} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Arcade;
