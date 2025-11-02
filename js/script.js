// Aguarda o carregamento do conteúdo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- SEU CÓDIGO DE TEMA EXISTENTE ---
    const themeToggle = document.querySelector('#checkbox');
    const body = document.body;

    // Função centralizada para aplicar o tema e atualizar o toggle
    const applyTheme = (theme) => {
        if (theme === 'white') {
            body.classList.add('white-theme');
            themeToggle.checked = true;
        } else {
            body.classList.remove('white-theme');
            themeToggle.checked = false;
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

    // Adiciona o Event Listener para a mudança de tema
    if (themeToggle) {
        themeToggle.addEventListener('change', switchTheme);
    } else {
        console.error("Elemento com ID 'checkbox' não foi encontrado.");
    }

    // Define o tema inicial assim que a página carrega
    initializeTheme();

    // --- NOVO CÓDIGO DE TRADUÇÃO ---

    // 1. Dicionário com as traduções
    const translations = {
        'pt': {
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
            footerInstagram: 'Instagram'
        },
        'en': {
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
            footerInstagram: 'Instagram'
        }
    };

    // 2. Elementos do DOM
    const langToggleButton = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-key]');
    const htmlElement = document.documentElement; // Pega a tag <html>

    // 3. Função centralizada para aplicar o idioma
    const applyLanguage = (lang) => {
        // Itera sobre todos os elementos com 'data-key' e aplica a tradução
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Atualiza o atributo 'lang' da tag <html> (bom para acessibilidade)
        htmlElement.setAttribute('lang', lang.toUpperCase());
        
        // Atualiza o texto do botão
        langToggleButton.textContent = (lang === 'pt') ? 'EN' : 'PT-BR';
        
        // Salva a preferência no localStorage
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
        // 1. Prioridade: Verifica se já existe um idioma salvo pelo usuário
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            applyLanguage(savedLang);
            return;
        }

        // 2. Se não há idioma salvo, detecta a preferência do navegador
        // navigator.language retorna "pt-BR", "en-US", etc.
        const browserLang = navigator.language || navigator.userLanguage;
        
        if (browserLang.startsWith('pt')) {
            applyLanguage('pt');
        } else {
            // Define 'en' como padrão para qualquer outro idioma (inglês, espanhol, etc.)
            applyLanguage('en');
        }
    };

    // 6. Adiciona o Event Listener para a mudança de idioma
    if (langToggleButton) {
        langToggleButton.addEventListener('click', switchLanguage);
    } else {
        console.error("Elemento com ID 'lang-toggle' não foi encontrado.");
    }

    // 7. Define o idioma inicial assim que a página carrega
    initializeLanguage();

});