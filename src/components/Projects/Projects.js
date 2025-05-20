import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import suicide from "../../Assets/Projects/suicide.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Food Ordering Web Tool"
              description="Developed a food ordering web tool for company staff using Java and Spring Boot framework. Implemented data crawling directly from Shopee Food without using the official API."
              ghLink="https://github.com/cuong02n"
              demoLink="https://portfolio.cuong02.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Game Backend Development"
              description="Developed multi-thread backend for PVP Game using Java and Vertx framework. Implemented data structures, loop patterns, WebSocket, and REST API for optimal performance."
              ghLink="https://github.com/cuong02n"
              demoLink="https://portfolio.cuong02.com"
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
