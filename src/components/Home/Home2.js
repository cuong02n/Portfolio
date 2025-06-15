import React, {useState} from "react";
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
    const [showEmailText, setShowEmailText] = useState(true);
    const [showPhoneText, setShowPhoneText] = useState(true);

    const toggleEmailText = () => {
        setShowEmailText(!showEmailText);
    };

    const togglePhoneText = () => {
        setShowPhoneText(!showPhoneText);
    };

    return (
        <Container fluid className="home-about-section" id="about">
            <Container>
                <Row>
                    <Col md={8} className="home-about-description">
                        <h1 style={{fontSize: "2.6em"}}>
                            <span className="purple">{t("LET ME INTRODUCE MYSELF")}</span>
                        </h1>
                        <p className="home-about-body">
                            {t("Introduce1")}
                            <i className="purple"><b> {t("Introduce1.1")}</b></i>
                            <br/><br/>
                            {t("Introduce2")}
                            <i className="purple"><b>Java</b></i>
                            <br/><br/>
                            {t("Introduce3")}
                            <i className="purple"><b>{t("Introduce3.1")}</b></i>
                            <br/><br/>
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
                        <h1>{t("FIND ME ON")}</h1>
                        <p>{t("Connect With Me")}</p>
                        <ul
                            className="home-about-social-links"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: "25px",
                            }}
                        >
                            {/* GitHub */}
                            <li className="social-icons">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>GitHub Profile</Tooltip>}
                                >
                                    <a
                                        href="https://github.com/cuong02n"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="icon-colour home-social-icons"
                                        style={{fontSize: "2.5em"}}
                                    >
                                        <GithubIcon/>
                                    </a>
                                </OverlayTrigger>
                            </li>

                            {/* Stack Overflow */}
                            <li className="social-icons">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Stack OverFlow</Tooltip>}
                                >
                                    <a
                                        href="https://stackoverflow.com/users/23725389/nguyen-manh-cuong"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="icon-colour home-social-icons"
                                        style={{fontSize: "2.5em"}}
                                    >
                                        <StackOverFlowIcon/>
                                    </a>
                                </OverlayTrigger>
                            </li>

                            {/* Email with text on the right */}
                            <div
                                className="social-icons"
                                style={{
                                    display: "flex",
                                    // alignItems: "center",
                                    gap: "10px"
                                }}

                            >
                                <div
                                    className={`icon-colour home-social-icons ${showEmailText ? 'email-icon-active' : ''}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={toggleEmailText}
                                >
                                    <EmailIcon/>
                                </div>
                                {showEmailText && (
                                    <div
                                        style={{
                                            fontSize: "1.5em",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        hi@cuong02.com
                                    </div>
                                )}
                            </div>

                            {/* Phone with text on the right */}
                            <div
                                className="social-icons"
                                style={{
                                    display: "flex",
                                    alignItems: "center",

                                }}
                            >
                                <div
                                    className={`icon-colour home-social-icons ${showPhoneText ? 'phone-icon-active' : ''}`}
                                    style={{fontSize: "2.5em", marginRight: "10px", cursor: "pointer"}}
                                    onClick={togglePhoneText}

                                >
                                    <PhoneIcon/>
                                </div>
                                {showPhoneText && (
                                    <span style={{fontSize: "1.5em"}}>+84335652578</span>
                                )}
                            </div>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Home2;
