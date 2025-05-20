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
                        {t('About Developer')}
                        <br/>
                        {t('About Work')}
                        <br/>
                        <br/>
                        {t('About Activities')}
                    </p>
                    <ul>
                        <li className="about-activity">
                            <ImPointRight/> {t('Activity 1')}
                        </li>
                        <li className="about-activity">
                            <ImPointRight/> {t('Activity 2')}
                        </li>
                        <li className="about-activity">
                            <ImPointRight/> {t('Activity 3')}
                        </li>
                    </ul>

                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default AboutCard;
