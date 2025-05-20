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
            'And ...... pursuing a career as a Solution Architect': 'And ...... pursuing a career as a Solution Architect',

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
            'Updated on':'Last updated on',

            'Problems Solved':'Problems Solved',
            'About Developer': 'I am a passionate Java developer with expertise in backend development, data processing, and system optimization.',
            'About Work': 'I love working with backend technologies, data processing, and implementing algorithms to optimize system performance.',
            'About Activities': 'Apart from coding, some other activities that I love to do!',
            'Activity 1': 'Problem Solving & Competitive Programming',
            'Activity 2': 'Learning New Technologies',
            'Activity 3': 'Contributing to Open Source',

            'Blog': 'Blog',
            'GitHub': 'GitHub',
            'Demo': 'Demo',
            'My Recent': 'My Recent',
            'Works': 'Works',
            "Here are a few projects I've worked on recently.": "Here are a few projects I've worked on recently.",
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
            'And ...... pursuing a career as a Solution Architect': 'Và . . . . hướng tới kĩ sư giải pháp',

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

            'Problems Solved':'Số bài đã được giải',
            'About Developer': 'Mình là một lập trình viên Java đam mê với chuyên môn về phát triển backend, xử lý dữ liệu và tối ưu hóa hệ thống.',
            'About Work': 'Mình thích làm việc với các công nghệ backend, xử lý dữ liệu và triển khai các thuật toán để tối ưu hiệu suất hệ thống.',
            'About Activities': 'Ngoài lập trình, đây là một số hoạt động khác mà mình yêu thích!',
            'Activity 1': 'Giải quyết vấn đề & Lập trình thi đấu',
            'Activity 2': 'Học hỏi công nghệ mới',
            'Activity 3': 'Đóng góp cho mã nguồn mở',

            'Blog': 'Blog',
            'GitHub': 'GitHub',
            'Demo': 'Demo',
            'My Recent': 'Gần đây',
            'Works': 'Dự án',
            "Here are a few projects I've worked on recently.": "Một vài dự án mình đã thực hiện gần đây.",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false,
            bindI18n: 'languageChanged loaded',
            bindI18nStore: 'added removed',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
            nsMode: 'default'
        }
    });

export default i18n;