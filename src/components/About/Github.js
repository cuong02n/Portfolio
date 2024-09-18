import React from "react";
import GitHubCalendar from "react-github-calendar";
import {Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";

function Github() {
    const {t} = useTranslation();
    const getMin2Digit = (input) => {
        if (input < 10) {
            return "0" + input
        }
        return input
    }
    return (
        <Row style={{justifyContent: "center", paddingBottom: "10px"}}>
            <h1 className="project-heading" style={{paddingBottom: "20px"}}>
                <strong className="purple">{t("Day I Code")}</strong>
            </h1>
            <GitHubCalendar
                username="cuong02n"
                blockSize={13}
                blockMargin={7}
                color="#c084f5"
                fontSize={16}
            />
            <h6 style={{paddingBottom: "20px"}}>
                <strong>{t("Updated on")}
                    &nbsp;
                    {new Date().getFullYear()}-{getMin2Digit(new Date().getMonth() + 1)}-{getMin2Digit(new Date().getDate())}
                    &nbsp; &nbsp;
                    {getMin2Digit(new Date().getHours())}:{getMin2Digit(new Date().getMinutes())}:{getMin2Digit(new Date().getSeconds())}
                </strong>
            </h6>
        </Row>
    );
}

export default Github;
