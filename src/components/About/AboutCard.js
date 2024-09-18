import React from "react";
import Card from "react-bootstrap/Card";
import {ImPointRight} from "react-icons/im";
import {useTranslation} from "react-i18next";

function AboutCard() {
    const {t} = useTranslation();
    return (
        <Card className="quote-card-view">
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p style={{textAlign: "justify"}}>
                        Hi, {(t('I am'))} <span className="purple">{t("Name")} </span>
                        {t("From")} <span className="purple"> {t("Address")}.</span>
                        <br/>
                        I am currently employed as a software developer at Juspay.
                        <br/>
                        I have completed Integrated MSc (IMSc) in Maths and Computing at BIT
                        Mesra.
                        <br/>
                        <br/>
                        Apart from coding, some other activities that I love to do!
                    </p>
                    <ul>
                        <li className="about-activity">
                            <ImPointRight/> Playing Games
                        </li>
                        <li className="about-activity">
                            <ImPointRight/> Writing Tech Blogs
                        </li>
                        <li className="about-activity">
                            <ImPointRight/> Travelling
                        </li>
                    </ul>

                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default AboutCard;
