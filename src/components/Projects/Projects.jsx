import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import anonymous from "../../Assets/Projects/anonymous.jpg";
import editor from "../../Assets/Projects/codeEditor.png";

import { useTranslation } from "react-i18next";

function Projects() {
  const { t } = useTranslation();
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          {t('My Recent')} <strong className="purple">{t('Works')}</strong>
        </h1>
        <p style={{ color: "white" }}>
          {t("Here are a few projects I've worked on recently.")}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={anonymous}
              isBlog={false}
              title={t('Phone Crawler')}
              description={t('Phone Crawler Description')}
              internalLink="/projects/phone-crawler"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title={t('System Flow Board')}
              description={t('System Flow Description')}
              internalLink="/projects/system-flow"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
