import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import registration from "../../Assets/Projects/autocomplete-1.png";
import sudoku from "../../Assets/Projects/sudoku.webp"
import editor from "../../Assets/Projects/codeEditor.png";
import suicide from "../../Assets/Projects/suicide.png";
import rating from "../../Assets/Projects/rating.png";
import anonymous from "../../Assets/Projects/anonymous.jpg";

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
              imgPath={suicide}
              isBlog={false}
              title={t('Food Ordering Web Tool')}
              description={t('Food Ordering Description')}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title={t('Game Backend Development')}
              description={t('Game Backend Description')}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sudoku}
              isBlog={false}
              title={t('Android Sudoku Game')}
              description={t('Android Sudoku Description')}
              ghLink="https://github.com/cuong02n"
              demoLink="https://play.google.com/store/apps/details?id=com.cuong02n.sudoku2905"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={rating}
              isBlog={false}
              title={t('CodeArena')}
              description={t('CodeArena Description')}
              ghLink="https://github.com/cuong02n/CodeArena"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={registration}
              isBlog={false}
              title={t('Class Registration System')}
              description={t('Class Registration Description')}
              ghLink="https://github.com/cuong02n/eHust-class-registration-java-backend/tree/dev"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={anonymous}
              isBlog={false}
              title={t('Tracking Private Data')}
              description={t('Tracking Data Description')}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title={t('Personal Portfolio Website')}
              description={t('Portfolio Description')}
              ghLink="https://github.com/cuong02n/portfolio"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
