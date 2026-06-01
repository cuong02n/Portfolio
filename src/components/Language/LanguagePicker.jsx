import React, { useCallback, memo, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";

const LanguagePicker = memo(() => {
    const { t, i18n } = useTranslation();
    const [show, setShow] = useState(false);

    const changeLanguage = useCallback((lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        setShow(false);
    }, [i18n]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="outline-light"
            className="d-flex align-items-center gap-2"
        >
            {children}
            <FaChevronDown size={12} />
        </Button>
    ));

    return (
        <Dropdown show={show} onToggle={(nextShow) => setShow(nextShow)}>
            <Dropdown.Toggle as={CustomToggle}>
                <ReactCountryFlag
                    countryCode={i18n.language === 'en' ? 'GB' : 'VN'}
                    svg
                    style={{
                        width: '1.5em',
                        height: '1.5em',
                    }}
                />
                {t('Language')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('en')}>
                    <div className="d-flex align-items-center gap-2">
                        <ReactCountryFlag
                            countryCode="GB"
                            svg
                            style={{
                                width: '1.5em',
                                height: '1.5em',
                            }}
                        />
                        English
                    </div>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('vi')}>
                    <div className="d-flex align-items-center gap-2">
                        <ReactCountryFlag
                            countryCode="VN"
                            svg
                            style={{
                                width: '1.5em',
                                height: '1.5em',
                            }}
                        />
                        Tiếng Việt
                    </div>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
});

LanguagePicker.displayName = 'LanguagePicker';

export default LanguagePicker;
