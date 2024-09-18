import React from "react";
import {Col, Row} from "react-bootstrap";
import {AiOutlineJava} from "react-icons/ai";
import {BiLogoSpringBoot} from "react-icons/bi";
import {GrMysql} from "react-icons/gr";
import { FaReact } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdHttp } from "react-icons/md";

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
                    <h6>Excel core</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <MdHttp/>
                    <h6>Rest API</h6>
                </Col>

            </Row>
        </div>
    );
}

export default TechStack2;
