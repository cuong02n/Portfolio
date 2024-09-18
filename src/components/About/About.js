import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import TechStack1 from "./TechStack1";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import TechStack2 from "./TechStack2";
import {useTranslation} from "react-i18next";

function About() {
    const {t} = useTranslation()
    return (
        <Container fluid className="about-section">
            <Particle/>
            <Container>
                <Row style={{justifyContent: "center", padding: "10px"}}>
                    <Col
                        md={7}
                        style={{
                            justifyContent: "center",
                            paddingTop: "30px",
                            paddingBottom: "50px",
                        }}
                    >
                        <h1 style={{fontSize: "2.1em", paddingBottom: "20px"}}>
                            Who <strong className="purple">I'M</strong>
                        </h1>
                        <Aboutcard/>
                    </Col>
                    <Col
                        md={5}
                        style={{paddingTop: "120px", paddingBottom: "50px"}}
                        className="about-img"
                    >
                        <img src={laptopImg} alt="about" className="img-fluid"/>
                    </Col>
                </Row>
                <h1 className="project-heading">
                    <strong className="purple">{t("What I have experience")} </strong>
                </h1>

                <TechStack1/>

                <h1 className="project-heading">
                    <strong className="purple">Tools</strong> I use
                </h1>
                <TechStack2/>

                <Github/>
            </Container>
        </Container>
    );
}

export default About;
