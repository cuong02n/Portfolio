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
            'Food Ordering Web Tool': 'Food Ordering Web Tool',
            'Food Ordering Description': 'A web tool for company staff to order food, developed using Java and the Spring Boot framework. Data is crawled directly from Shopee Food without using the official API.<br/><br/>Source code and demo are private.',
            'Game Backend Development': 'Game Backend Development',
            'Game Backend Description': 'Developed a multi-threaded backend for a PVP game using Java and the Vertx framework. Implemented data structures, loop patterns, WebSocket, and REST API for optimal performance.<br/><br/>Source code and demo are private.',
            'Android Sudoku Game': 'Android Sudoku Game',
            'Android Sudoku Description': 'Developed and deployed a Sudoku game on Google Play Store. Implemented a game solver algorithm in Java with a focus on performance and NOT the user interface.',
            'CodeArena': 'CodeArena',
            'CodeArena Description': 'A collection of competitive programming solutions and algorithms.<br/>Features solutions for Codeforces<br/>Focuses on C++ implementation of various data structures and algorithms.',
            'Class Registration System': 'Class Registration System',
            'Class Registration Description': 'A backend system for class registration at Hanoi University of Science and Technology. This was my Bachelor Graduate Thesis, built with Java. Implements RESTful APIs, authorization,... supports Docker deployment, and follows best practices for backend development.<br/><b>Status:</b> Currently shutdown.',
            'Tracking Private Data': 'Tracking Private Data',
            'Tracking Data Description': 'My microservices has multiple function. One of these function is crawling sensitive data from School website.<br/><br/><b>Source code and demo current private.</b>',
            'Personal Portfolio Website': 'Personal Portfolio Website',
            'Portfolio Description': 'This is my personal portfolio website, built with React.js and styled using Bootstrap and custom CSS. It showcases my projects, skills, and experience, and supports multiple languages.<br/><br/>Source code is public on GitHub.',
            'Domain Owner':'Domain Owner',
            'Domain Owner Description':'I have deployed several services and servers with personal URLs, such as<br/><br>Email: hi@cuong02.com <br/><br>Portfolio website: https://portfolio.cuong02.com'
        }
    },
    vi: {
        translation: {
            'Hi There!': 'Xin chào!!',
            'I am': 'Mình là',
            'Name': 'Nguyễn Mạnh Cường',
            'Address':'Đông Anh, Hà Nội',
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
            'Food Ordering Web Tool': 'Công cụ Đặt Đồ Ăn',
            'Food Ordering Description': 'Công cụ web cho nhân viên công ty đặt đồ ăn, được phát triển bằng Java và framework Spring Boot. Dữ liệu được crawl trực tiếp từ Shopee Food mà không sử dụng API chính thức.<br/><br/>Mã nguồn và demo hiện đang private.',
            'Game Backend Development': 'Phát Triển Backend Game',
            'Game Backend Description': 'Phát triển backend đa luồng cho game PVP sử dụng Java và framework Vertx. Đã triển khai các cấu trúc dữ liệu, mẫu vòng lặp, WebSocket và REST API để tối ưu hiệu suất.<br/><br/>Mã nguồn và demo hiện đang private.',
            'Android Sudoku Game': 'Game Sudoku Android',
            'Android Sudoku Description': 'Phát triển và triển khai game Sudoku trên Google Play Store. Đã triển khai thuật toán giải game bằng Java với tập trung vào hiệu suất và <b>KHÔNG TẬP TRUNG NHIỀU VÀO</b> giao diện người dùng nên có thể chúng hơi đơn giản. ',
            'CodeArena': 'CodeArena',
            'CodeArena Description': 'Các giải pháp cho bài toán lập trình thi đấu và thuật toán.<br/>Bao gồm các giải pháp cho Codeforces<br/>Tập trung vào triển khai C++ cho các cấu trúc dữ liệu và thuật toán khác nhau.',
            'Class Registration System': 'Hệ Thống Đăng Ký Môn Học',
            'Class Registration Description': 'Hệ thống backend cho đăng ký môn học tại Đại học Bách Khoa Hà Nội. Đây là đồ án tốt nghiệp của tôi, được xây dựng bằng Java. Triển khai RESTful APIs, bảo mật, phân quyền, hỗ trợ Docker và tuân thủ các phương pháp trong phát triển backend.<br/><b>Trạng thái:</b> Hiện đang tạm dừng việc demo.',
            'Tracking Private Data': 'Tracking Dữ Liệu Riêng Tư',
            'Tracking Data Description': 'Một số trang web ưa thích của tôi, có chứa nhiều dữ liệu, tuy nhiên họ không bảo mật API của họ quá tốt, dẫn tới việc nó có thể được lấy thông qua một số thủ thuật nhỏ như: sử dụng proxy, dịch ngược. Hiện tại tôi đang sở hữu dữ liệu của họ.<br/><br/><b>Mã nguồn và demo hiện đang private.</b>',
            'Personal Portfolio Website': 'Website Portfolio Cá Nhân',
            'Portfolio Description': 'Đây là website portfolio cá nhân của tôi, được xây dựng bằng React.js và styled sử dụng Bootstrap và CSS tùy chỉnh. Nó giới thiệu các dự án, kỹ năng và kinh nghiệm của tôi, và hỗ trợ nhiều ngôn ngữ.<br/><br/>Mã nguồn được công khai trên GitHub.',
            'Domain Owner':'Sở hữu tên miền cá nhân',
            'Domain Owner Description':'Mình đã triển khai được một số dịch vụ, máy chủ có URL cá nhân, như<br/><br>Email: hi@cuong02.com <br/><br>Website portfolio: https://portfolio.cuong02.com'
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