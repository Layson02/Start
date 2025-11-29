// Aguarda o carregamento do conteúdo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // Area do tema
    const themeToggle = document.querySelector('#checkbox');

    // Função para aplicar o tema visualmente
    const applyTheme = (theme) => {
        if (theme === 'white') {
            body.classList.add('white-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('white-theme');
            if (themeToggle) themeToggle.checked = false;
        }
    };

    // Função chamada ao clicar no toggle
    const switchTheme = () => {
        const newTheme = themeToggle.checked ? 'white' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // Inicializa o tema ao carregar a página
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
            return;
        }

        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'white');
    };

    // Event Listener do Tema
    if (themeToggle) {
        themeToggle.addEventListener('change', switchTheme);
    }

    // ======================================================
    // 2. NOVA LÓGICA DE IDIOMA (VIA CSS CLASSES)
    // ======================================================
    const langToggleButton = document.getElementById('lang-toggle');

    // Atualiza apenas o texto do botão (PT-BR ou EN)
    const updateLangButton = (isEnglish) => {
        if (langToggleButton) {
            // Se o site está em Inglês, o botão mostra a opção de voltar para PT-BR
            langToggleButton.textContent = isEnglish ? 'PT-BR' : 'EN';
        }
    };

    // Função chamada ao clicar no botão de idioma
    const switchLanguage = () => {
        // Adiciona ou remove a classe 'english-mode' no <body>
        body.classList.toggle('english-mode');
        
        // Verifica se a classe está presente para saber o estado atual
        const isEnglish = body.classList.contains('english-mode');
        
        // Salva a preferência e atualiza o botão
        localStorage.setItem('language', isEnglish ? 'en' : 'pt');
        updateLangButton(isEnglish);
        
        // Acessibilidade: atualiza o atributo lang na tag html
        document.documentElement.setAttribute('lang', isEnglish ? 'en' : 'pt-BR');
    };

    // Inicializa o idioma ao carregar a página
    const initializeLanguage = () => {
        const savedLang = localStorage.getItem('language');
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Lógica: Inicia em inglês se estiver salvo 'en' OU (não tiver nada salvo E o navegador não for PT)
        const shouldBeEnglish = savedLang === 'en' || (!savedLang && !browserLang.startsWith('pt'));

        if (shouldBeEnglish) {
            body.classList.add('english-mode');
            updateLangButton(true);
            document.documentElement.setAttribute('lang', 'en');
        } else {
            body.classList.remove('english-mode');
            updateLangButton(false);
            document.documentElement.setAttribute('lang', 'pt-BR');
        }
    };

    // Event Listener do Idioma
    if (langToggleButton) {
        langToggleButton.addEventListener('click', switchLanguage);
    }

    initializeTheme();
    initializeLanguage();

});