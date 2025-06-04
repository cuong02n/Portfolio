import React from "react";
import {Container, Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import StackOverFlowIcon from "./Icon/StackOverFlowIcon";
import GithubIcon from "./Icon/GithubIcon";
import {EmailIcon} from "./Icon/EmailIcon";
import PhoneIcon from "./Icon/PhoneIcon";
import {useTranslation} from "react-i18next";

function Home2() {
    const {t} = useTranslation();
    return (
        <Container fluid className="home-about-section" id="about">
            <Container>
                <Row>
                    <Col md={8} className="home-about-description">
                        <h1 style={{fontSize: "2.6em"}}>
                            <span className={"purple"}>{t("LET ME INTRODUCE MYSELF")}</span>
                        </h1>
                        <p className="home-about-body">
                            {t('Introduce1')}
                            <i className={"purple"}><b> {t("Introduce1.1")}</b></i>
                            <br/>
                            <br/>
                            {t('Introduce2')}
                            <i className="purple"><b>Java</b></i>
                            <br/>
                            <br/>
                            {t('Introduce3')}
                            <i className="purple"><b>{t('Introduce3.1')}</b></i>
                            <br/>
                            <br/>
                            {/*{t('Introduce4')}*/}
                        </p>
                    </Col>
                    <Col md={4} className="myAvtar">
                        <Tilt>
                            <img src={myImg} className="img-fluid" alt="avatar"/>
                        </Tilt>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="home-about-social">
                        <h1>{t('FIND ME ON')}</h1>
                        <p>
                            {t('Connect With Me')}
                        </p>
                        <ul className="home-about-social-links">
                            <li className="social-icons" style={{ margin: "0 15px" }}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>GitHub Profile</Tooltip>}
                                >
                                    <a
                                        href="https://github.com/cuong02n"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="icon-colour home-social-icons"
                                        style={{ fontSize: "2.5em" }}
                                    >
                                        <GithubIcon/>
                                    </a>
                                </OverlayTrigger>
                            </li>

                            <li className="social-icons" style={{ margin: "0 15px" }}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Stack OverFlow</Tooltip>}
                                >
                                    <a
                                        href="https://stackoverflow.com/users/23725389/nguyen-manh-cuong"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="icon-colour home-social-icons"
                                        style={{ fontSize: "2.5em" }}
                                    >
                                        <StackOverFlowIcon/>
                                    </a>
                                </OverlayTrigger>
                            </li>
                            <li className="social-icons" style={{ margin: "0 15px" }}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>cuong02n@gmail.com</Tooltip>}
                                >
                                    <a
                                        href="mailto:cuong02n@gmail.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="icon-colour home-social-icons"
                                        style={{ fontSize: "2.5em" }}
                                    >
                                        <EmailIcon/>
                                    </a>
                                </OverlayTrigger>
                            </li>

                            <li className="social-icons" style={{ margin: "0 15px" }}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>+84335652578</Tooltip>}
                                >
                                    <a
                                        href="tel: +84335652578"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="icon-colour home-social-icons"
                                        style={{ fontSize: "2.5em" }}
                                    >
                                        <PhoneIcon/>
                                    </a>
                                </OverlayTrigger>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Home2;
