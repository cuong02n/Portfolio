import React from "react";
import {Col, Row} from "react-bootstrap";
import {AiOutlineJava} from "react-icons/ai";
import {BiLogoSpringBoot} from "react-icons/bi";
import {GrMysql} from "react-icons/gr";

function TechStack1() {
    return (
        <div>
            <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
                <Col xs={4} md={2} className="tech-icons">
                    <AiOutlineJava/>
                    <h6>Java</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <BiLogoSpringBoot/>
                    <h6>Spring Boot</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <GrMysql/>
                    <h6>My SQL</h6>
                </Col>

            </Row>
        </div>
    );
}

export default TechStack1;
