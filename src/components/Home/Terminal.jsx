import React from "react";

// A static terminal pane beside the hero: the same summary as the prose, in the
// format the audience for this site reads fastest. Deliberately generic — no
// hostnames, addresses or anything else that belongs to an employer.
const LINES = [
  { p: "$", cmd: "whoami" },
  { text: "cuong — backend engineer, Hanoi" },
  { blank: true },
  { p: "$", cmd: "cat stack.json" },
  { text: "{" },
  { k: '  "language"', v: '"Java 21"' },
  { k: '  "framework"', v: '"Spring Boot 3"' },
  { k: '  "storage"', v: '"PostgreSQL · Redis · S3"' },
  { k: '  "messaging"', v: '"Apache Kafka"' },
  { k: '  "identity"', v: '"Keycloak · OAuth2 · RBAC"' },
  { k: '  "runtime"', v: '"Docker · Kubernetes · Helm"' },
  { k: '  "delivery"', v: '"GitLab CI/CD · Terraform"' },
  { text: "}" },
  { blank: true },
  { p: "$", cmd: "kubectl get deploy | wc -l" },
  { num: "13" },
];

function Terminal() {
  return (
    <div className="pf-term" aria-hidden="true">
      <div className="pf-term-bar">
        <div className="pf-term-dots">
          <i />
          <i />
          <i />
        </div>
        <span className="pf-term-title">~/platform</span>
      </div>

      <div className="pf-term-body">
        {LINES.map((line, i) => {
          if (line.blank) return <div key={i} className="pf-term-line">&nbsp;</div>;

          if (line.cmd) {
            return (
              <div key={i} className="pf-term-line">
                <span className="pf-term-prompt">{line.p}</span> {line.cmd}
              </div>
            );
          }

          if (line.k) {
            return (
              <div key={i} className="pf-term-line">
                <span className="pf-term-key">{line.k}</span>:{" "}
                <span className="pf-term-str">{line.v}</span>,
              </div>
            );
          }

          if (line.num) {
            return (
              <div key={i} className="pf-term-line">
                <span className="pf-term-num">{line.num}</span>
                <span className="pf-term-caret" />
              </div>
            );
          }

          return (
            <div key={i} className="pf-term-line">
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Terminal;
