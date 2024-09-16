import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            'Hi There!': 'Hi There!',
            'I am': 'I\'m',
            'Name': 'Manh Cuong Nguyen',
            'Language': 'English',
            'Home': 'Home',
            'About': 'About',
            'Projects': 'Projects',
            'Resume': 'Resume',
            'FIND ME ON': 'FIND ME ON',
            'Connect With Me': 'Feel free to connect with me',

            'Java developer': 'Java developer',
            'Software Engineering': 'Software Engineering',
            'Problem Solving': 'Problem Solving',
            'And ...... pursuing a career as a Data Engineer': 'And ...... pursuing a career as a Data Engineer',

            'LET ME INTRODUCE MYSELF': 'LET ME INTRODUCE MYSELF',

            'Introduce1': 'I am loving programming, especially working with ',
            'Introduce1.1': 'backend, data and prompt',
            'Introduce2': 'My most work experience is on',
            'Introduce3': 'I am interested in ',
            'Introduce3.1': 'feature development and implementing different algorithm for optimizing system',
            'Introduce4': 'I always apply my passion for solution with Java and its Spring Framework'
        }
    },
    vi: {
        translation: {
            'Hi There!': 'Xin chào!!',
            'I am': 'Mình là',
            'Name': 'Nguyễn Mạnh Cường',
            'Language': 'Tiếng Việt',
            'Home': 'Trang chủ',
            'About': 'Thông tin',
            'Projects': 'Dự án',
            'Resume': 'Hồ sơ tóm tắt',
            'FIND ME ON': 'LIÊN HỆ',
            'Connect With Me': 'Hãy kết nối với mình nhé',

            'Java developer': 'Lập trình viên Java',
            'Software Engineering': 'Người phát triển phần mềm',
            'Problem Solving': 'Giải quyết vấn đề',
            'And ...... pursuing a career as a Data Engineer': 'Và . . . . hướng tới kĩ sư dữ liệu',

            'LET ME INTRODUCE MYSELF': 'HÃY ĐỂ MÌNH CÓ VÀI LỜI GIỚI THIỆU',
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language'),

    interpolation: {
        escapeValue: false
    }
});

export default i18n;