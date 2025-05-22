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
              description={
                `A web tool for company staff to order food, developed using Java and the Spring Boot framework. Data is crawled directly from Shopee Food without using the official API.<br/>
<br> Source code and demo are private. 
                `
              }
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Game Backend Development"
              description={
                `Developed a multi-threaded backend for a PVP game using Java and the Vertx framework. Implemented data structures, loop patterns, WebSocket, and REST API for optimal performance.
                <br>
                <br> Source code and demo are private. 
                `
              }
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Android Sudoku Game"
              description={
                `Developed and deployed a Sudoku game on Google Play Store. Implemented a game solver algorithm in Java with a focus on performance and user interface.`
              }
              ghLink="https://github.com/cuong02n"
              demoLink="https://play.google.com/store/apps/details?id=com.cuong02n.sudoku2905"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="CodeArena"
              description={
                `A collection of competitive programming solutions and algorithms.<br />
Features solutions for Codeforces, LeetCode, and other algorithmic challenges.<br />
Focuses on C++ implementation of various data structures and algorithms.`
              }
              ghLink="https://github.com/cuong02n/CodeArena"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Class Registration System"
              description={
                `A backend system for class registration at Hanoi University of Science and Technology. This was my Bachelor Graduate Thesis, built with Java. Implements RESTful APIs, supports Docker deployment, and follows best practices for backend development. <br/><b>Status:</b> Currently shutdown.`
              }
              ghLink="https://github.com/cuong02n/eHust-class-registration-java-backend/tree/dev"
            />
          </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                    imgPath={editor}
                    isBlog={false}
                    title="Tracking Private Data"
                    description={
                        `My microservices has multiple function. One of these function is crawling sensitive data from 
 School website.<br/><br><b>Source code and demo current private.</b>`
                    }
                />
            </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Personal Portfolio Website"
              description={
                `This is my personal portfolio website, built with React.js and styled using Bootstrap and custom CSS. It showcases my projects, skills, and experience, and supports multiple languages.<br/><br/>Source code is public on GitHub.`
              }
              ghLink="https://github.com/cuong02n/portfolio"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
