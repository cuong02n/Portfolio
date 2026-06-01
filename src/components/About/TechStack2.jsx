import React from "react";
import {Col, Row} from "react-bootstrap";
import {FaDocker, FaReact} from "react-icons/fa";
import {FaPython} from "react-icons/fa";
import {RiFileExcel2Line} from "react-icons/ri";
import {MdHttp} from "react-icons/md";
import {SiGooglecloud, SiUml} from "react-icons/si";
import {FaGithub} from "react-icons/fa";
import {FaLinux} from "react-icons/fa";

function TechStack2() {
    return (
        <div>
            <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
                <Col xs={4} md={2} className="tech-icons">
                    <FaReact/>
                    <h6>React JS</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <FaPython/>
                    <h6>Python</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <RiFileExcel2Line/>
                    <h6>OO XML</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <FaDocker/>
                    <h6>Docker</h6>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
                <Col xs={4} md={2} className="tech-icons">
                    <MdHttp/>
                    <h6>Rest API</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <SiGooglecloud/>
                    <h6>Google Cloud Platform</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <FaGithub/>
                    <h6>Git</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <FaLinux/>
                    <h6>Linux</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <SiUml/>
                    <h6>UML</h6>
                </Col>
            </Row>
        </div>
    );
}

export default TechStack2;
