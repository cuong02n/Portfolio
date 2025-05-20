import React, { useCallback, memo } from 'react';
import {i18n} from '../../Assets/lang/i18n';
import {Button} from 'react-bootstrap';
import {useTranslation} from "react-i18next";

const LanguagePicker = memo(() => {
    const {t, i18n} = useTranslation();

    const changeLanguage = useCallback((e) => {
        e.preventDefault();
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    }, [i18n]);

    return (
        <div className="toggle-switch">
            <Button onClick={changeLanguage}>
                {t('Language')}
            </Button>
        </div>
    );
});

LanguagePicker.displayName = 'LanguagePicker';

export default LanguagePicker;
