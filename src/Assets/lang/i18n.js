import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Every user-facing string in the portfolio lives here, in both `en` and `vi`.
// Components never hardcode display text — they call t('some.key').
//
// Keys are flat and dot-namespaced by section (hero.*, exp.*, stack.*). i18next
// would normally read a dot as "nested object", so keySeparator/nsSeparator are
// switched off below and the dotted string is looked up verbatim.

const en = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  'profile.name': 'Nguyen Manh Cuong',
  'profile.role': 'Backend Engineer',
  'profile.location': 'Hanoi, Vietnam',
  'profile.tagline': 'I build and operate backend platforms — the services, the data underneath them, and the pipelines that ship them.',

  /* ── Navigation & shared labels ───────────────────────────────────────── */
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.stack': 'Stack',
  'nav.projects': 'Projects',
  'nav.resume': 'Résumé',
  'nav.menu': 'Menu',

  'common.present': 'Present',

  /* ── Landing hero ─────────────────────────────────────────────────────── */
  'hero.greeting': "Hi, I'm",
  'hero.intro': 'I design, build and run distributed backend systems. Right now that means a multi-tenant fintech collection platform — a dozen Spring Boot services on Kubernetes serving more than a million customers — from the domain model down to the pipeline that deploys it.',
  'hero.status': 'Currently at Nexusti JSC',
  'hero.cta.projects': 'See my work',
  'hero.cta.resume': 'Download CV',
  'hero.cta.contact': 'Get in touch',
  'hero.terminal.caption': 'A quick summary, in the format I read best.',

  'typed.backend': 'Backend engineer',
  'typed.microservices': 'Microservices & distributed systems',
  'typed.devops': 'DevOps & delivery pipelines',
  'typed.architect': 'On the way to solution architect',

  'stats.years': 'Years building backends',
  'stats.customers': 'End customers served',
  'stats.services': 'Services in the platform',
  'stats.gpa': 'GPA — top 3% at HUST',

  /* ── Landing sections ─────────────────────────────────────────────────── */
  'home.what.eyebrow': 'What I do',
  'home.what.title': 'Three things I get paid for',
  'home.what.c1.title': 'Backend & APIs',
  'home.what.c1.desc': 'Domain modelling, transactional correctness and REST contracts that survive their second consumer. Java 21 and Spring Boot 3 over PostgreSQL.',
  'home.what.c2.title': 'Data & integration',
  'home.what.c2.desc': 'Kafka event flows, ETL ingest, telephony and messaging providers behind one interface, and exports measured in millions of rows.',
  'home.what.c3.title': 'DevOps & delivery',
  'home.what.c3.desc': 'Container images, GitLab pipelines, Helm releases on Kubernetes, and Terraform that provisions an entire tenant from nothing.',

  'home.featured.eyebrow': 'Selected work',
  'home.featured.title': 'Things I have shipped',
  'home.featured.desc': 'Two of these run live inside this site — open them and click around.',
  'home.featured.cta': 'All projects',

  'home.stack.eyebrow': 'Stack',
  'home.stack.title': 'What I reach for',
  'home.stack.desc': 'The short list. The full breakdown — including infrastructure and delivery — is on the stack page.',
  'home.stack.cta': 'Full stack breakdown',

  'home.contact.title': "Let's talk",
  'home.contact.desc': 'Questions about my work, or something you want built? My inbox is open.',
  'home.contact.cta': 'Email me',

  'home.arcade.title': 'Algorithms, playing themselves',
  'home.arcade.desc': 'Snake solved with breadth-first search and a flood-fill survival fallback; Tetris driven by a weighted board heuristic. Both written from scratch on a canvas — no library, no input, they just play.',
  'home.arcade.show': 'Watch them run',
  'home.arcade.hide': 'Hide',

  /* ── About ────────────────────────────────────────────────────────────── */
  'about.eyebrow': 'About',
  'about.title': 'Who I am',
  'about.p1': 'I am a backend engineer with three years of experience on enterprise systems — authentication, third-party integrations, performance work, and platforms that serve millions of end customers.',
  'about.p2': 'I studied Computer Science at Hanoi University of Science and Technology and graduated in the top 3% of my cohort. Years of competitive programming taught me to think about complexity before a profiler has to tell me.',
  'about.p3': 'Today I work on a multi-tenant debt-collection platform for banks and lenders: I own the notification domain, build across the collection and reporting services, and keep the pipelines that deploy them green.',

  'about.experience.eyebrow': 'Career',
  'about.experience.title': 'Where I have worked',
  'about.education.title': 'Education',
  'about.credentials.title': 'Certifications',
  'about.github.title': 'Commit history',
  'about.codeforces.title': 'Competitive programming',
  'about.codeforces.desc': 'Codeforces rating history — every point is a contest.',

  /* ── Experience ───────────────────────────────────────────────────────── */
  'exp.nexusti.role': 'Software Engineer',
  'exp.nexusti.summary': 'Fintech collection and CRM platform for banks and financial institutions, serving over a million end customers.',
  'exp.nexusti.b1': 'Designed and shipped microservices, database schemas, indexing strategies, scheduled jobs and third-party integrations with Java, Spring Boot and PostgreSQL.',
  'exp.nexusti.b2': 'Owned the notification domain end to end — SMS, Zalo, email and real-time calling — powering every customer-contact workflow on the platform.',
  'exp.nexusti.b3': 'Implemented authentication and authorisation with JWT, OAuth2, Keycloak, SSO and per-action RBAC across all services.',
  'exp.nexusti.b4': 'Optimised database access for logging and reporting systems holding millions of rows, cutting query time and overall system load.',
  'exp.nexusti.b5': 'Maintained the GitLab CI/CD pipelines — Maven builds, rootless BuildKit images, Kubernetes rollouts — with automated build alerting.',
  'exp.nexusti.b6': 'Worked inside a 13-service platform provisioned per tenant with Terraform, Helm and Rancher on Kubernetes.',

  'exp.dacData.role': 'Data Engineer',
  'exp.dacData.summary': 'Large-scale advertising data processing.',
  'exp.dacData.b1': 'Built and maintained ETL pipelines for advertising campaign data at scale.',

  'exp.dacDev.role': 'Software Developer',
  'exp.dacDev.summary': 'Internal web products and data tooling.',
  'exp.dacDev.b1': 'Led development of a food-ordering web platform built on Spring Boot.',
  'exp.dacDev.b2': 'Built crawling solutions for food-delivery platforms without relying on their official APIs.',
  'exp.dacDev.b3': 'Designed a custom Excel export library for datasets of millions of rows, cutting CPU and memory consumption by 95%.',

  'exp.vietdefi.role': 'Game Backend Developer',
  'exp.vietdefi.summary': 'Real-time PvP game backend.',
  'exp.vietdefi.b1': 'Built a multithreaded backend for real-time PvP matches on the Vert.x event-loop framework.',
  'exp.vietdefi.b2': 'Applied cache-friendly data structures, WebSocket transport and REST APIs to hold latency down under load.',

  'edu.hust.degree': 'BSc Computer Science',
  'edu.hust.score': 'GPA 3.65 / 4.00 — Excellent degree, top 3% of graduates',
  'edu.hust.detail': 'Artificial intelligence, deep learning, algorithms, data structures, database systems, information system architecture and software engineering.',

  'cert.oca.title': 'Oracle Certified Associate — Java SE 8 Programmer',
  'cert.oca.detail': 'Certification 1Z0-808.',
  'cert.codeforces.title': 'Codeforces — rating ≈ 1600',
  'cert.codeforces.detail': 'Reached the specialist range through rated contests.',
  'cert.toeic.title': 'TOEIC 700',
  'cert.toeic.detail': 'Listening & Reading, IIG Vietnam.',

  /* ── Stack page ───────────────────────────────────────────────────────── */
  'stack.eyebrow': 'Technology',
  'stack.title': 'The stack, in full',
  'stack.desc': 'Everything below backs something real — a service in production, a pipeline that ships one, or an environment I provisioned. Grouped by what it does rather than by logo.',
  'stack.filter.all': 'Everything',
  'stack.legend': 'Depth of use',
  'stack.level.core': 'Core',
  'stack.level.working': 'Working',
  'stack.level.familiar': 'Familiar',
  'stack.level.core.hint': 'Used daily; I make the design calls.',
  'stack.level.working.hint': 'Ships production work unsupervised.',
  'stack.level.familiar.hint': 'Delivered with it; I reach for the docs.',
  'stack.count': '{{count}} technologies',

  'stack.languages.title': 'Languages & runtimes',
  'stack.languages.blurb': 'What I write day to day, ordered by how much production code I have in each.',
  'stack.backend.title': 'Backend & frameworks',
  'stack.backend.blurb': 'The Spring ecosystem, plus the libraries that do the heavy lifting around it.',
  'stack.architecture.title': 'Architecture & patterns',
  'stack.architecture.blurb': 'How the services get cut apart, and the rules that keep them independently deployable.',
  'stack.data.title': 'Databases & storage',
  'stack.data.blurb': 'Schema design, migrations, and the query work that keeps million-row reports fast.',
  'stack.messaging.title': 'Messaging & integration',
  'stack.messaging.blurb': 'Kafka as the backbone, and every external channel hanging off it.',
  'stack.workflow.title': 'Workflow & rules engines',
  'stack.workflow.blurb': 'Business processes and decisions that operations can change without a redeploy.',
  'stack.security.title': 'Security & identity',
  'stack.security.blurb': 'One identity provider, per-action authorisation, enforced in every service.',
  'stack.devops.title': 'DevOps & infrastructure',
  'stack.devops.blurb': 'Building the image, shipping it, and provisioning the environment it lands in.',
  'stack.frontend.title': 'Frontend',
  'stack.frontend.blurb': 'Enough React to own a feature end to end — and to build the live demos on this site.',
  'stack.tooling.title': 'Tooling & practice',
  'stack.tooling.blurb': 'The day-to-day loop around actually writing the code.',

  /* ── Projects ─────────────────────────────────────────────────────────── */
  'projects.eyebrow': 'Work',
  'projects.live.title': 'Live demos',
  'projects.live.desc': 'Real modules running inside this site — not screenshots. Drag things around.',
  'projects.all.title': 'Everything else',
  'projects.all.desc': 'Professional work is described without source where it belongs to an employer.',
  'projects.summary': 'Summary',
  'projects.fullscreen': 'Open full screen',
  'projects.private': 'Source private',
  'projects.filter.all': 'All',

  'projects.kind.live': 'Live demo',
  'projects.kind.oss': 'Open source',
  'projects.kind.work': 'Professional',
  'projects.kind.infra': 'Infrastructure',

  'demo.nexus.label': 'NEXUSTI platform map',
  'demo.nexus.sub': 'The collection platform I work on, drawn as an editable architecture board.',
  'demo.nexus.body': 'An interactive board for the system architectures I work on — microservices over REST, asynchronous Kafka events, Keycloak identity, PostgreSQL and Redis. Drag components out of the palette, wire them together, rename them and retype the connections.<br/><br/><b>Everything is editable in your browser. Changes are saved locally and can be reset to the samples at any time; boards export and import as JSON.</b>',
  'demo.crawler.label': 'Phone number crawler',
  'demo.crawler.sub': 'Distributed crawler with a live dashboard over FastAPI and PostgreSQL.',
  'demo.crawler.body': 'A multi-threaded crawler that collects and filters premium phone numbers, built on a database-backed BFS queue. Handles session renewal, cookie refresh, proxy rotation, rate limiting and anti-bot challenges automatically. FastAPI and PostgreSQL behind it, deployed on Kubernetes; this React dashboard streams progress over WebSocket.<br/><br/><b>Anyone can watch it run. Controlling jobs requires an admin token.</b>',
  'demo.sample.label': 'Sample architecture',
  'demo.sample.sub': 'An e-commerce microservice topology you can drag, rewire and edit live.',
  'demo.sample.body': 'The same board, seeded with a sample e-commerce microservice architecture instead of a real one — a sandbox for trying the editor out.<br/><br/><b>Drag, connect, rename and retype anything; reset to the seed whenever you like.</b>',

  'proj.dcms.title': 'NEXUSTI DCMS — collection platform',
  'proj.dcms.desc': 'A multi-tenant debt-collection and CRM platform for banks and lenders: thirteen independently deployed services covering debt allocation, an omni-channel call centre, workflow automation, reporting and identity. Each tenant gets its own namespace, identity realm and database set, provisioned end to end with Terraform and Helm.',
  'proj.crawler.title': 'Phone number crawler',
  'proj.crawler.desc': 'High-throughput crawler built on a database-backed BFS queue, with automatic session renewal, proxy rotation, rate-limit backoff and anti-bot handling. A WebSocket dashboard streams live progress; the whole thing runs on Kubernetes.',
  'proj.flow.title': 'System Flow board',
  'proj.flow.desc': 'A drag-and-drop architecture editor built on React Flow. Sketch services, wire up REST or asynchronous edges, open any node for detail, and export the whole board as JSON. Entirely client-side — diagrams live in your browser.',
  'proj.excel.title': 'Streaming Excel export library',
  'proj.excel.desc': 'A reusable export layer for datasets in the millions of rows. Replacing the naive in-memory approach with streaming writes and a tighter object model cut CPU and memory consumption by 95%, turning a job that used to fall over into a routine one.',
  'proj.ehust.title': 'Class registration backend',
  'proj.ehust.desc': 'My bachelor thesis: the backend for university class registration, handling concurrent enrolment against limited seats. RESTful APIs, authentication and authorisation, Docker deployment, written in Java.',
  'proj.game.title': 'Real-time PvP game backend',
  'proj.game.desc': 'A multithreaded backend for real-time player-versus-player matches on Vert.x. Event-loop architecture, WebSocket transport and carefully chosen data structures kept latency flat while match volume grew.',
  'proj.food.title': 'Food ordering platform',
  'proj.food.desc': 'A Spring Boot web platform for company staff to order lunch together, with menu and price data crawled directly from a delivery platform rather than through an official API.',
  'proj.sudoku.title': 'Sudoku for Android',
  'proj.sudoku.desc': 'A Sudoku game shipped on Google Play, written in Java. The interesting part is the solver: constraint propagation plus backtracking, tuned so a full grid solves instantly on a phone from 2016.',
  'proj.codearena.title': 'CodeArena',
  'proj.codearena.desc': 'My competitive programming archive — Codeforces solutions plus a personal library of C++ data structures and algorithms, kept tidy enough to reuse under contest pressure.',
  'proj.infra.title': 'Self-hosted infrastructure',
  'proj.infra.desc': 'I run my own domain and the services on it — mail, this site and a handful of side projects — on Linux boxes behind Nginx with TLS and containerised deployments. Everything on cuong02.com is something I set up and keep running.',
  'proj.portfolio.title': 'This portfolio',
  'proj.portfolio.desc': 'React 18 and Vite, bilingual through i18next, with live project demos mounted as feature modules rather than linked out. Open source.',

  'links.demo': 'Live demo',
  'links.github': 'Source',
  'links.store': 'Google Play',
  'links.site': 'Visit',

  /* ── Résumé ───────────────────────────────────────────────────────────── */
  'resume.eyebrow': 'Résumé',
  'resume.title': 'Curriculum vitae',
  'resume.desc': 'One page, kept current. Download it, or read the same story with more detail on the about page.',
  'resume.download': 'Download PDF',
  'resume.noInline': "Your browser does not display PDFs inline. Grab the one-page CV instead — it is the same document.",

  /* ── Contact & footer ─────────────────────────────────────────────────── */
  'contact.eyebrow': 'Contact',
  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.github': 'GitHub',
  'contact.stackoverflow': 'Stack Overflow',
  'contact.codeforces': 'Codeforces',

  'footer.tagline': 'Backend engineer in Hanoi, building systems that stay up.',
  'footer.nav': 'Pages',
  'footer.connect': 'Elsewhere',
  'footer.built': 'Built with React and Vite. Source on GitHub.',
  'footer.rights': 'All rights reserved.',
}

const vi = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  'profile.name': 'Nguyễn Mạnh Cường',
  'profile.role': 'Kỹ sư Backend',
  'profile.location': 'Hà Nội, Việt Nam',
  'profile.tagline': 'Mình xây và vận hành các nền tảng backend — từ service, dữ liệu bên dưới, cho tới pipeline đưa chúng lên production.',

  /* ── Navigation & shared labels ───────────────────────────────────────── */
  'nav.home': 'Trang chủ',
  'nav.about': 'Giới thiệu',
  'nav.stack': 'Công nghệ',
  'nav.projects': 'Dự án',
  'nav.resume': 'Hồ sơ',
  'nav.menu': 'Menu',

  'common.present': 'Hiện tại',

  /* ── Landing hero ─────────────────────────────────────────────────────── */
  'hero.greeting': 'Xin chào, mình là',
  'hero.intro': 'Mình thiết kế, xây dựng và vận hành các hệ thống backend phân tán. Hiện tại là một nền tảng thu hồi nợ fintech đa tenant — hơn mười service Spring Boot chạy trên Kubernetes, phục vụ hơn một triệu khách hàng — từ mô hình nghiệp vụ cho tới pipeline triển khai.',
  'hero.status': 'Đang làm tại Nexusti JSC',
  'hero.cta.projects': 'Xem dự án',
  'hero.cta.resume': 'Tải CV',
  'hero.cta.contact': 'Liên hệ',
  'hero.terminal.caption': 'Tóm tắt nhanh, theo định dạng mình đọc quen nhất.',

  'typed.backend': 'Kỹ sư backend',
  'typed.microservices': 'Microservices & hệ phân tán',
  'typed.devops': 'DevOps & pipeline triển khai',
  'typed.architect': 'Trên đường thành kiến trúc sư giải pháp',

  'stats.years': 'Năm làm backend',
  'stats.customers': 'Khách hàng cuối phục vụ',
  'stats.services': 'Service trong nền tảng',
  'stats.gpa': 'GPA — top 3% tại HUST',

  /* ── Landing sections ─────────────────────────────────────────────────── */
  'home.what.eyebrow': 'Mình làm gì',
  'home.what.title': 'Ba mảng mình làm chính',
  'home.what.c1.title': 'Backend & API',
  'home.what.c1.desc': 'Mô hình nghiệp vụ, tính đúng đắn của giao dịch, và những REST contract vẫn dùng tốt khi có consumer thứ hai. Java 21 và Spring Boot 3 trên PostgreSQL.',
  'home.what.c2.title': 'Dữ liệu & tích hợp',
  'home.what.c2.desc': 'Luồng sự kiện Kafka, ETL nạp dữ liệu, gom nhiều nhà cung cấp tổng đài và tin nhắn về một interface, và export dữ liệu tính bằng triệu dòng.',
  'home.what.c3.title': 'DevOps & triển khai',
  'home.what.c3.desc': 'Đóng image, pipeline GitLab, release Helm trên Kubernetes, và Terraform dựng trọn một tenant từ con số không.',

  'home.featured.eyebrow': 'Dự án tiêu biểu',
  'home.featured.title': 'Những thứ mình đã làm ra',
  'home.featured.desc': 'Hai trong số này chạy thật ngay trong trang web — mở lên và bấm thử.',
  'home.featured.cta': 'Tất cả dự án',

  'home.stack.eyebrow': 'Công nghệ',
  'home.stack.title': 'Những thứ mình hay dùng',
  'home.stack.desc': 'Đây là danh sách ngắn. Bản đầy đủ — gồm cả hạ tầng và triển khai — nằm ở trang công nghệ.',
  'home.stack.cta': 'Xem toàn bộ stack',

  'home.contact.title': 'Cùng trao đổi nhé',
  'home.contact.desc': 'Có câu hỏi về công việc của mình, hay có thứ gì cần xây? Hòm thư của mình luôn mở.',
  'home.contact.cta': 'Gửi email',

  'home.arcade.title': 'Thuật toán tự chơi lấy',
  'home.arcade.desc': 'Snake giải bằng tìm kiếm theo chiều rộng cùng phương án dự phòng loang vùng để sống sót; Tetris chạy bằng hàm đánh giá bàn cờ có trọng số. Cả hai viết tay từ đầu trên canvas — không thư viện, không cần điều khiển, chúng tự chơi.',
  'home.arcade.show': 'Xem chúng chạy',
  'home.arcade.hide': 'Ẩn đi',

  /* ── About ────────────────────────────────────────────────────────────── */
  'about.eyebrow': 'Giới thiệu',
  'about.title': 'Mình là ai',
  'about.p1': 'Mình là kỹ sư backend với ba năm kinh nghiệm làm hệ thống doanh nghiệp — xác thực, tích hợp bên thứ ba, tối ưu hiệu năng, và các nền tảng phục vụ hàng triệu khách hàng cuối.',
  'about.p2': 'Mình học Khoa học Máy tính tại Đại học Bách khoa Hà Nội và tốt nghiệp trong top 3% khóa. Nhiều năm lập trình thi đấu dạy mình nghĩ về độ phức tạp trước khi profiler kịp lên tiếng.',
  'about.p3': 'Hiện mình làm một nền tảng thu hồi nợ đa tenant cho ngân hàng và tổ chức cho vay: phụ trách trọn mảng thông báo, phát triển xuyên các service thu hồi nợ và báo cáo, đồng thời giữ cho pipeline triển khai luôn xanh.',

  'about.experience.eyebrow': 'Sự nghiệp',
  'about.experience.title': 'Nơi mình đã làm việc',
  'about.education.title': 'Học vấn',
  'about.credentials.title': 'Chứng chỉ',
  'about.github.title': 'Lịch sử commit',
  'about.codeforces.title': 'Lập trình thi đấu',
  'about.codeforces.desc': 'Lịch sử rating Codeforces — mỗi điểm là một kỳ thi.',

  /* ── Experience ───────────────────────────────────────────────────────── */
  'exp.nexusti.role': 'Kỹ sư phần mềm',
  'exp.nexusti.summary': 'Nền tảng thu hồi nợ và CRM fintech cho ngân hàng và tổ chức tài chính, phục vụ hơn một triệu khách hàng cuối.',
  'exp.nexusti.b1': 'Thiết kế và phát triển microservice, schema cơ sở dữ liệu, chiến lược đánh index, job định kỳ và tích hợp bên thứ ba bằng Java, Spring Boot và PostgreSQL.',
  'exp.nexusti.b2': 'Phụ trách trọn mảng thông báo — SMS, Zalo, email và gọi điện thời gian thực — nền tảng cho mọi luồng liên hệ khách hàng của hệ thống.',
  'exp.nexusti.b3': 'Triển khai xác thực và phân quyền bằng JWT, OAuth2, Keycloak, SSO và RBAC chi tiết tới từng hành động, áp dụng cho toàn bộ service.',
  'exp.nexusti.b4': 'Tối ưu truy cập dữ liệu cho hệ thống log và báo cáo hàng triệu bản ghi, giảm thời gian truy vấn và tải hệ thống.',
  'exp.nexusti.b5': 'Duy trì pipeline GitLab CI/CD — build Maven, đóng image bằng BuildKit rootless, rollout trên Kubernetes — kèm cảnh báo build tự động.',
  'exp.nexusti.b6': 'Làm việc trong nền tảng 13 service, mỗi tenant được dựng riêng bằng Terraform, Helm và Rancher trên Kubernetes.',

  'exp.dacData.role': 'Kỹ sư dữ liệu',
  'exp.dacData.summary': 'Xử lý dữ liệu quảng cáo quy mô lớn.',
  'exp.dacData.b1': 'Xây dựng và duy trì các pipeline ETL cho dữ liệu chiến dịch quảng cáo ở quy mô lớn.',

  'exp.dacDev.role': 'Lập trình viên phần mềm',
  'exp.dacDev.summary': 'Sản phẩm web nội bộ và công cụ dữ liệu.',
  'exp.dacDev.b1': 'Dẫn dắt phát triển nền tảng web đặt đồ ăn xây trên Spring Boot.',
  'exp.dacDev.b2': 'Xây giải pháp thu thập dữ liệu cho các nền tảng giao đồ ăn mà không dùng API chính thức của họ.',
  'exp.dacDev.b3': 'Thiết kế thư viện export Excel riêng cho tập dữ liệu hàng triệu dòng, giảm 95% mức tiêu thụ CPU và bộ nhớ.',

  'exp.vietdefi.role': 'Lập trình viên Backend Game',
  'exp.vietdefi.summary': 'Backend game PvP thời gian thực.',
  'exp.vietdefi.b1': 'Xây backend đa luồng cho các trận PvP thời gian thực trên framework event-loop Vert.x.',
  'exp.vietdefi.b2': 'Áp dụng cấu trúc dữ liệu thân thiện với cache, truyền tải WebSocket và REST API để giữ độ trễ ổn định khi tải tăng.',

  'edu.hust.degree': 'Cử nhân Khoa học Máy tính',
  'edu.hust.score': 'GPA 3.65 / 4.00 — Bằng Xuất sắc, top 3% khóa tốt nghiệp',
  'edu.hust.detail': 'Trí tuệ nhân tạo, học sâu, thuật toán, cấu trúc dữ liệu, hệ quản trị cơ sở dữ liệu, kiến trúc hệ thống thông tin và công nghệ phần mềm.',

  'cert.oca.title': 'Oracle Certified Associate — Java SE 8 Programmer',
  'cert.oca.detail': 'Chứng chỉ 1Z0-808.',
  'cert.codeforces.title': 'Codeforces — rating ≈ 1600',
  'cert.codeforces.detail': 'Đạt mức specialist qua các kỳ thi có tính rating.',
  'cert.toeic.title': 'TOEIC 700',
  'cert.toeic.detail': 'Listening & Reading, tổ chức IIG Việt Nam.',

  /* ── Stack page ───────────────────────────────────────────────────────── */
  'stack.eyebrow': 'Công nghệ',
  'stack.title': 'Toàn bộ stack',
  'stack.desc': 'Mọi thứ dưới đây đều gắn với một thứ có thật — một service đang chạy production, một pipeline đưa nó lên, hoặc một môi trường mình tự dựng. Nhóm theo công dụng chứ không theo logo.',
  'stack.filter.all': 'Tất cả',
  'stack.legend': 'Mức độ sử dụng',
  'stack.level.core': 'Thành thạo',
  'stack.level.working': 'Làm việc tốt',
  'stack.level.familiar': 'Đã dùng qua',
  'stack.level.core.hint': 'Dùng hằng ngày; mình là người ra quyết định thiết kế.',
  'stack.level.working.hint': 'Tự làm được việc production mà không cần kèm.',
  'stack.level.familiar.hint': 'Đã làm ra sản phẩm với nó; vẫn cần tra tài liệu.',
  'stack.count': '{{count}} công nghệ',

  'stack.languages.title': 'Ngôn ngữ & runtime',
  'stack.languages.blurb': 'Những gì mình viết hằng ngày, xếp theo lượng code production mình có với từng thứ.',
  'stack.backend.title': 'Backend & framework',
  'stack.backend.blurb': 'Hệ sinh thái Spring, cùng những thư viện gánh phần việc nặng xung quanh nó.',
  'stack.architecture.title': 'Kiến trúc & pattern',
  'stack.architecture.blurb': 'Cách chia nhỏ service, và những nguyên tắc giữ cho chúng deploy độc lập được.',
  'stack.data.title': 'Cơ sở dữ liệu & lưu trữ',
  'stack.data.blurb': 'Thiết kế schema, migration, và phần tối ưu truy vấn giữ cho báo cáo triệu dòng vẫn nhanh.',
  'stack.messaging.title': 'Message & tích hợp',
  'stack.messaging.blurb': 'Kafka làm xương sống, cùng mọi kênh bên ngoài móc vào đó.',
  'stack.workflow.title': 'Workflow & rule engine',
  'stack.workflow.blurb': 'Quy trình và quyết định nghiệp vụ mà vận hành đổi được, không cần deploy lại.',
  'stack.security.title': 'Bảo mật & định danh',
  'stack.security.blurb': 'Một nhà cung cấp định danh duy nhất, phân quyền tới từng hành động, áp dụng ở mọi service.',
  'stack.devops.title': 'DevOps & hạ tầng',
  'stack.devops.blurb': 'Đóng image, đưa nó lên, và dựng luôn cả môi trường để nó chạy.',
  'stack.frontend.title': 'Frontend',
  'stack.frontend.blurb': 'Đủ React để tự làm trọn một tính năng — và để dựng các demo chạy thật trên trang này.',
  'stack.tooling.title': 'Công cụ & thói quen',
  'stack.tooling.blurb': 'Vòng lặp hằng ngày quanh việc thật sự viết code.',

  /* ── Projects ─────────────────────────────────────────────────────────── */
  'projects.eyebrow': 'Công việc',
  'projects.live.title': 'Demo chạy thật',
  'projects.live.desc': 'Module thật đang chạy ngay trong trang này — không phải ảnh chụp. Cứ kéo thả thoải mái.',
  'projects.all.title': 'Những dự án khác',
  'projects.all.desc': 'Các dự án đi làm chỉ được mô tả, không kèm mã nguồn vì thuộc về công ty.',
  'projects.summary': 'Tóm tắt',
  'projects.fullscreen': 'Mở toàn màn hình',
  'projects.private': 'Mã nguồn riêng tư',
  'projects.filter.all': 'Tất cả',

  'projects.kind.live': 'Demo trực tiếp',
  'projects.kind.oss': 'Mã nguồn mở',
  'projects.kind.work': 'Dự án công ty',
  'projects.kind.infra': 'Hạ tầng',

  'demo.nexus.label': 'Sơ đồ nền tảng NEXUSTI',
  'demo.nexus.sub': 'Nền tảng thu hồi nợ mình đang làm, vẽ thành bảng kiến trúc chỉnh sửa được.',
  'demo.nexus.body': 'Bảng vẽ tương tác cho các kiến trúc hệ thống mình đang làm — microservice giao tiếp qua REST, sự kiện bất đồng bộ qua Kafka, định danh bằng Keycloak, PostgreSQL và Redis. Kéo component từ palette, nối dây, đổi tên và đổi loại kết nối.<br/><br/><b>Chỉnh sửa hoàn toàn ngay trên trình duyệt. Thay đổi lưu cục bộ và có thể reset về mẫu bất cứ lúc nào; sơ đồ xuất/nhập được dưới dạng JSON.</b>',
  'demo.crawler.label': 'Crawler số điện thoại',
  'demo.crawler.sub': 'Crawler phân tán với dashboard thời gian thực trên FastAPI và PostgreSQL.',
  'demo.crawler.body': 'Crawler đa luồng thu thập và lọc số điện thoại đẹp, xây trên hàng đợi BFS lưu trong cơ sở dữ liệu. Tự động làm mới session, refresh cookie, xoay proxy, xử lý rate limit và các thử thách chống bot. Phía sau là FastAPI và PostgreSQL, triển khai trên Kubernetes; dashboard React này nhận tiến trình qua WebSocket.<br/><br/><b>Ai cũng xem chạy được. Muốn điều khiển job thì cần admin token.</b>',
  'demo.sample.label': 'Kiến trúc mẫu',
  'demo.sample.sub': 'Sơ đồ microservice thương mại điện tử để bạn kéo thả, nối lại và sửa trực tiếp.',
  'demo.sample.body': 'Vẫn là bảng vẽ đó, nhưng nạp sẵn kiến trúc microservice thương mại điện tử mẫu thay cho hệ thống thật — một sân chơi để thử trình chỉnh sửa.<br/><br/><b>Kéo, nối, đổi tên và đổi loại tùy ý; reset về mẫu bất cứ lúc nào.</b>',

  'proj.dcms.title': 'NEXUSTI DCMS — nền tảng thu hồi nợ',
  'proj.dcms.desc': 'Nền tảng thu hồi nợ và CRM đa tenant cho ngân hàng và tổ chức cho vay: mười ba service triển khai độc lập, bao trùm phân bổ nợ, tổng đài đa kênh, tự động hóa quy trình, báo cáo và định danh. Mỗi tenant có namespace, realm định danh và bộ cơ sở dữ liệu riêng, dựng trọn gói bằng Terraform và Helm.',
  'proj.crawler.title': 'Crawler số điện thoại',
  'proj.crawler.desc': 'Crawler thông lượng cao dựa trên hàng đợi BFS lưu trong cơ sở dữ liệu, tự động làm mới session, xoay proxy, lùi khi bị rate limit và vượt thử thách chống bot. Dashboard WebSocket phát tiến trình theo thời gian thực; toàn bộ chạy trên Kubernetes.',
  'proj.flow.title': 'Bảng vẽ System Flow',
  'proj.flow.desc': 'Trình chỉnh sửa kiến trúc kéo-thả xây trên React Flow. Phác họa service, nối các cạnh REST hoặc bất đồng bộ, mở chi tiết từng node, và xuất cả sơ đồ ra JSON. Hoàn toàn phía client — sơ đồ nằm ngay trong trình duyệt của bạn.',
  'proj.excel.title': 'Thư viện export Excel dạng streaming',
  'proj.excel.desc': 'Lớp export dùng lại được cho tập dữ liệu hàng triệu dòng. Thay cách ghi toàn bộ vào bộ nhớ bằng ghi streaming cùng mô hình đối tượng gọn hơn đã giảm 95% CPU và bộ nhớ, biến một job hay sập thành việc thường ngày.',
  'proj.ehust.title': 'Backend đăng ký môn học',
  'proj.ehust.desc': 'Đồ án tốt nghiệp của mình: backend cho hệ thống đăng ký môn học, xử lý đăng ký đồng thời trên số chỗ giới hạn. RESTful API, xác thực và phân quyền, triển khai bằng Docker, viết bằng Java.',
  'proj.game.title': 'Backend game PvP thời gian thực',
  'proj.game.desc': 'Backend đa luồng cho các trận đấu người-với-người thời gian thực trên Vert.x. Kiến trúc event-loop, truyền tải WebSocket và cấu trúc dữ liệu chọn kỹ giúp độ trễ giữ phẳng khi lượng trận tăng.',
  'proj.food.title': 'Nền tảng đặt đồ ăn',
  'proj.food.desc': 'Nền tảng web Spring Boot để nhân viên công ty đặt cơm chung, với dữ liệu thực đơn và giá được crawl thẳng từ nền tảng giao đồ ăn thay vì qua API chính thức.',
  'proj.sudoku.title': 'Sudoku cho Android',
  'proj.sudoku.desc': 'Game Sudoku đã phát hành trên Google Play, viết bằng Java. Phần thú vị nằm ở bộ giải: lan truyền ràng buộc kết hợp quay lui, tinh chỉnh để giải xong một bàn đầy ngay lập tức trên điện thoại đời 2016.',
  'proj.codearena.title': 'CodeArena',
  'proj.codearena.desc': 'Kho lập trình thi đấu của mình — lời giải Codeforces cùng thư viện cấu trúc dữ liệu và thuật toán C++ cá nhân, giữ đủ gọn để tái sử dụng ngay trong lúc thi.',
  'proj.infra.title': 'Hạ tầng tự vận hành',
  'proj.infra.desc': 'Mình tự chạy tên miền riêng và các dịch vụ trên đó — mail, trang web này và vài dự án phụ — trên máy chủ Linux sau Nginx, có TLS và triển khai bằng container. Mọi thứ trên cuong02.com đều do mình tự dựng và tự duy trì.',
  'proj.portfolio.title': 'Chính trang portfolio này',
  'proj.portfolio.desc': 'React 18 và Vite, song ngữ nhờ i18next, với các demo dự án chạy thật được nhúng thành feature module thay vì link ra ngoài. Mã nguồn mở.',

  'links.demo': 'Demo trực tiếp',
  'links.github': 'Mã nguồn',
  'links.store': 'Google Play',
  'links.site': 'Truy cập',

  /* ── Résumé ───────────────────────────────────────────────────────────── */
  'resume.eyebrow': 'Hồ sơ',
  'resume.title': 'Sơ yếu lý lịch',
  'resume.desc': 'Một trang, luôn được cập nhật. Tải về, hoặc đọc bản chi tiết hơn ở trang giới thiệu.',
  'resume.download': 'Tải PDF',
  'resume.noInline': 'Trình duyệt của bạn không hiển thị PDF trực tiếp. Tải bản CV một trang về nhé — vẫn là cùng một tài liệu.',

  /* ── Contact & footer ─────────────────────────────────────────────────── */
  'contact.eyebrow': 'Liên hệ',
  'contact.email': 'Email',
  'contact.phone': 'Điện thoại',
  'contact.github': 'GitHub',
  'contact.stackoverflow': 'Stack Overflow',
  'contact.codeforces': 'Codeforces',

  'footer.tagline': 'Kỹ sư backend ở Hà Nội, xây những hệ thống chạy bền.',
  'footer.nav': 'Trang',
  'footer.connect': 'Nơi khác',
  'footer.built': 'Xây bằng React và Vite. Mã nguồn trên GitHub.',
  'footer.rights': 'Bảo lưu mọi quyền.',
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    // Keys are flat dotted strings, not nested objects — stop i18next from
    // splitting 'stack.devops.title' into a lookup path.
    keySeparator: false,
    nsSeparator: false,
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    },
  })

export default i18n
