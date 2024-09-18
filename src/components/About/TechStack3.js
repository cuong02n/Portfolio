import React from "react";
import {Col, Row} from "react-bootstrap";
import {SiGooglecloud, SiLatex} from "react-icons/si";
import {PiFileCppBold} from "react-icons/pi";
import {DiJavascript} from "react-icons/di";
import {SiPostman} from "react-icons/si";
import {SiWireshark} from "react-icons/si";
import {TfiAndroid} from "react-icons/tfi";

function TechStack3() {
    return (
        <div>
            <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
                <Col xs={4} md={2} className="tech-icons">
                    <PiFileCppBold/>
                    <h6>C++</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <DiJavascript/>
                    <h6>JavaScript</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <SiPostman/>
                    <h6>Postman</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <SiWireshark/>
                    <h6>Wireshark</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <SiLatex/>
                    <h6>Latex</h6>
                </Col>
                <Col xs={4} md={2} className="tech-icons">
                    <TfiAndroid/>
                    <h6>Android</h6>
                </Col>
            </Row>
        </div>
    );
}

export default TechStack3;
