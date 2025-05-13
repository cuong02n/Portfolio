import React from "react";
import Typewriter from "typewriter-effect";
import {useTranslation} from "react-i18next";

function Type() {
    const {t} = useTranslation()
    return (
        <Typewriter
            options={{
                strings: [
                    t("Java developer"),
                    t("Software Engineering"),
                    t("Problem Solving"),
                    t("And ...... pursuing a career as a Solution Architect"),
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
            }}
        />
    );
}

export default Type;
