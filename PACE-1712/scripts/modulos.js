document.addEventListener('DOMContentLoaded', () => {
    const modules = document.querySelectorAll('.module-link');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    // Função para atualizar a barra de progresso
    function updateProgress() {
        const totalModules = modules.length;
        let completedModules = 0;

        // Contar quantos módulos foram concluídos
        modules.forEach(module => {
            const moduleId = module.getAttribute('data-module');
            if (localStorage.getItem(`module-${moduleId}-completed`) === 'true') {
                completedModules++;
            }
        });

        // Calcular o progresso em porcentagem
        const progress = (completedModules / totalModules) * 100;

        // Atualizar a largura da barra de progresso e o texto
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Progresso: ${Math.round(progress)}%`;
    }

    // Carregar progresso dos módulos a partir do localStorage
    modules.forEach(module => {
        const moduleId = module.getAttribute('data-module');
        if (localStorage.getItem(`module-${moduleId}-completed`) === 'true') {
            module.classList.add('concluido');
        }
    });

    // Marcar módulo como concluído quando o usuário clica
    modules.forEach(module => {
        module.addEventListener('click', function(event) {
            const moduleId = event.target.getAttribute('data-module');

            // Marcar como concluído no localStorage
            localStorage.setItem(`module-${moduleId}-completed`, 'true');

            // Adicionar classe para marcar visualmente
            event.target.classList.add('concluido');

            // Atualizar a barra de progresso após marcar o módulo como concluído
            updateProgress();
        });
    });

    // Inicializar a barra de progresso ao carregar a página
    updateProgress();
});
