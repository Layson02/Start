// Aguarda o carregamento do conteúdo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

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
        // 1. Prioridade: Verifica se já existe um tema salvo pelo usuário
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
            return;
        }

        // 2. Se não há tema salvo, verifica a preferência do sistema operacional
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            applyTheme('dark'); // O padrão do seu site já é escuro
        } else {
            applyTheme('white'); // Se a preferência for clara, inicia com o tema branco
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
});