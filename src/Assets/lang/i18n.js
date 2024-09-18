import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            'Hi There!': 'Hi There!',
            'I am': 'I\'m',
            'Name': 'Manh Cuong Nguyen',
            'Address':'Dong Anh, Ha Noi, Viet Nam',
            'Language': 'English',
            'Home': 'Home',
            'About': 'About',
            'Projects': 'Projects',
            'Resume': 'Resume',
            'FIND ME ON': 'FIND ME ON',
            'Connect With Me': 'Feel free to connect with me',

            'From':'from',

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


            'What I have experience':'What I have experience',
            'And others':'And others',
            'I also know':'I also know',
            'Day I Code': 'My Github',
            'Updated on':'Last updated on'
        }
    },
    vi: {
        translation: {
            'Hi There!': 'Xin chào!!',
            'I am': 'Mình là',
            'Name': 'Nguyễn Mạnh Cường',
            'Address':'Dục Tú, Đông Anh, Hà Nội',
            'Language': 'Tiếng Việt',
            'Home': 'Trang chủ',
            'About': 'Thông tin',
            'Projects': 'Dự án',
            'Resume': 'Hồ sơ tóm tắt',
            'FIND ME ON': 'LIÊN HỆ',
            'Connect With Me': 'Hãy kết nối với mình nhé',

            'From':'đến từ',

            'Java developer': 'Lập trình viên Java',
            'Software Engineering': 'Người phát triển phần mềm',
            'Problem Solving': 'Giải quyết vấn đề',
            'And ...... pursuing a career as a Data Engineer': 'Và . . . . hướng tới kĩ sư dữ liệu',

            'LET ME INTRODUCE MYSELF': 'HÃY ĐỂ MÌNH CÓ VÀI LỜI GIỚI THIỆU',

            'Introduce1': 'Mình yêu thích lập trình, đặc biệt là với ',
            'Introduce1.1': 'backend, data và prompt',
            'Introduce2': 'Kinh nghiệm của mình nhiều nhất ở ',
            'Introduce3': 'Mình hay tìm tòi, mày mò, nghiên cứu về ',
            'Introduce3.1': 'các tính năng mới, các thuật toán để tối ưu hiệu suất của hệ thống',

            'What I have experience':'Mình có kinh nghiệm với',
            'And others':'Sau đó một chút là',
            'I also know':'Mình cũng biết những thứ sau',
            'Day I Code':'Github của mình',
            'Updated on': 'Cập nhật lần cuối vào',
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