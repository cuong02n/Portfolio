import React from "react";

/**
 * Placeholder while a lazily-loaded route or panel arrives. Deliberately quiet:
 * a spinner that appears for 80ms reads as jank, so this is a sized, dim block
 * that simply holds the layout open.
 */
function Fallback({ height = "60vh" }) {
  return (
    <div className="pf-fallback" style={{ minHeight: height }} aria-hidden="true">
      <span />
    </div>
  );
}

export default Fallback;
