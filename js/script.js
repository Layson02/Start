// Aguarda o carregamento do conteúdo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DE TEMA EXISTENTE ---
    const themeToggle = document.querySelector('#checkbox');
    const body = document.body;

    // Função centralizada para aplicar o tema e atualizar o toggle
    const applyTheme = (theme) => {
        if (theme === 'white') {
            body.classList.add('white-theme');
            // Só atualiza o 'checked' se o elemento existir
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('white-theme');
            // Só atualiza o 'checked' se o elemento existir
            if (themeToggle) themeToggle.checked = false;
        }
    };

    // Função que é chamada quando o usuário clica no toggle
    const switchTheme = () => {
        const newTheme = themeToggle.checked ? 'white' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // Função para inicializar o tema na primeira carga da página
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
            return;
        }

        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            applyTheme('dark'); 
        } else {
            applyTheme('white');
        }
    };

    // Adiciona o Event Listener para a mudança de tema (AGORA COM VERIFICAÇÃO)
    if (themeToggle) {
        themeToggle.addEventListener('change', switchTheme);
    }

    // Define o tema inicial assim que a página carrega
    initializeTheme();

    // --- CÓDIGO DE TRADUÇÃO ATUALIZADO ---

    // 1. Dicionário com as traduções (NOVAS CHAVES ADICIONADAS)
    const translations = {
        'pt': {
            // Index.html
            navAbout: 'Sobre Mim',
            navProjects: 'Projetos',
            navContact: 'Contato',
            jobTitle: 'Estudante de Ciência da Computação',
            welcome: 'Boas-vindas!',
            aboutMe: 'Olá! Sou Layson, um entusiasta de tecnologia e estudante de Ciência da Computação. Explore meu portfólio para conhecer mais sobre minha jornada e projetos.',
            projectsTitle: 'Meus Projetos',
            projectsDescription: 'Descrição de projetos e área de estudo...',
            footerGithub: 'GitHub',
            footerLinkedin: 'LinkedIn',
            footerInstagram: 'Instagram',
            // Comum
            returnHome: 'Retornar à Página Inicial',
            // Sobre_mim.html
            aboutTitle: 'Minha Jornada em Tecnologia',
            aboutIntro: 'Sou Layson, estudante de Ciência da Computação apaixonado por tecnologia. Desde o início da minha jornada, tenho me dedicado a entender como a lógica e a inovação se unem para construir soluções digitais eficientes. Meu foco atual está no desenvolvimento Front-End, explorando a criação de interfaces intuitivas e responsivas.',
            aboutSkillsTitle: 'Habilidades e Interesses',
            aboutSkillsLangs: 'Linguagens de Programação',
            aboutSkillsTech: 'Tecnologias/Frameworks',
            aboutSkillsAreas: 'Áreas de Interesse',
            // Contato.html
            contactTitle: 'Entre em Contato',
            contactIntro: 'Estou sempre aberto a novas conexões e oportunidades. Sinta-se à vontade para me procurar através dos canais abaixo:',
            contactMeans: 'Meios de Comunicação:',
            contactEmail: 'E-mail',
            contactPhone: 'Numero'
        },
        'en': {
            // Index.html
            navAbout: 'About Me',
            navProjects: 'Projects',
            navContact: 'Contact',
            jobTitle: 'Computer Science Student',
            welcome: 'Welcome!',
            aboutMe: 'Hi! I\'m Layson, a technology enthusiast and Computer Science student. Explore my portfolio to learn more about my journey and projects.',
            projectsTitle: 'My Projects',
            projectsDescription: 'Description of projects and area of study...',
            footerGithub: 'GitHub',
            footerLinkedin: 'LinkedIn',
            footerInstagram: 'Instagram',
            // Comum
            returnHome: 'Return to Homepage',
            // Sobre_mim.html
            aboutTitle: 'My Journey in Technology',
            aboutIntro: 'I\'m Layson, a Computer Science student passionate about technology. Since the beginning of my journey, I\'ve been dedicated to understanding how logic and innovation come together to build efficient digital solutions. My current focus is on Front-End development, exploring the creation of intuitive and responsive interfaces.',
            aboutSkillsTitle: 'Skills and Interests',
            aboutSkillsLangs: 'Programming Languages',
            aboutSkillsTech: 'Technologies/Frameworks',
            aboutSkillsAreas: 'Areas of Interest',
            // Contato.html
            contactTitle: 'Get in Touch',
            contactIntro: 'I am always open to new connections and opportunities. Feel free to reach out to me through the channels below:',
            contactMeans: 'Means of Communication:',
            contactEmail: 'Email',
            contactPhone: 'Phone'
        }
    };

    // 2. Elementos do DOM
    const langToggleButton = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-key]');
    const htmlElement = document.documentElement; // Pega a tag <html>

    // 3. Função centralizada para aplicar o idioma
    const applyLanguage = (lang) => {
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        htmlElement.setAttribute('lang', lang.toUpperCase());
        
        // Só atualiza o texto do botão se ele existir
        if (langToggleButton) {
            langToggleButton.textContent = (lang === 'pt') ? 'EN' : 'PT-BR';
        }
        
        localStorage.setItem('language', lang);
    };

    // 4. Função que é chamada quando o usuário clica no botão de idioma
    const switchLanguage = () => {
        const currentLang = localStorage.getItem('language') || 'pt';
        const newLang = (currentLang === 'pt') ? 'en' : 'pt';
        applyLanguage(newLang);
    };

    // 5. Função para inicializar o idioma na primeira carga
    const initializeLanguage = () => {
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            applyLanguage(savedLang);
            return;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        
        if (browserLang.startsWith('pt')) {
            applyLanguage('pt');
        } else {
            applyLanguage('en');
        }
    };

    // 6. Adiciona o Event Listener (AGORA COM VERIFICAÇÃO)
    if (langToggleButton) {
        langToggleButton.addEventListener('click', switchLanguage);
    }

    // 7. Define o idioma inicial assim que a página carrega
    initializeLanguage();

});