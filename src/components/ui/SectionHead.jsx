import React from "react";

/**
 * The eyebrow → heading → lead trio that opens every section, so the vertical
 * rhythm stays identical across pages.
 *
 * `action` renders on the right of the heading row (a "view all" link, say) and
 * drops below it on narrow screens.
 *
 * `as="h1"` for the section that opens a page — every page needs exactly one
 * h1, and on subpages this component is the only heading that qualifies. The
 * `pf-h2` type scale stays either way; only the tag changes.
 */
function SectionHead({ eyebrow, title, lead, action, id, as: Heading = "h2" }) {
  return (
    <div className="pf-section-head">
      {eyebrow && <p className="pf-eyebrow">{eyebrow}</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {title && (
          <Heading className="pf-h2" id={id}>
            {title}
          </Heading>
        )}
        {action}
      </div>
      {lead && <p className="pf-lead">{lead}</p>}
    </div>
  );
}

export default SectionHead;
