import React from 'react';
import {i18n} from '../../Assets/lang/i18n';
import {Button} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const LanguagePicker = () => {
    const {t,i18n} = useTranslation();

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
        localStorage.setItem('language', i18n.language)
    };

    return (
        <div className="toggle-switch">
            <Button onClick={changeLanguage}>
                {t('Language')}
            </Button>
        </div>
    );
};

export default LanguagePicker;
