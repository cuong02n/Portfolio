import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import suicide from "../../Assets/Projects/suicide.png";
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
              title="Food Ordering Web Tool"
              description="Developed a food ordering web tool for company staff using Java and Spring Boot framework. Implemented data crawling directly from Shopee Food without using the official API."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Game Backend Development"
              description="Developed multi-thread backend for PVP Game using Java and Vertx framework. Implemented data structures, loop patterns, WebSocket, and REST API for optimal performance."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Android Sudoku Game"
              description="Developed and deployed a Sudoku game on Google Play Store. Implemented game solver algorithm in Java with focus on performance and user interface."
              ghLink="https://github.com/cuong02n"
              demoLink="https://play.google.com/store/apps/details?id=com.cuong02n.sudoku2905"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
