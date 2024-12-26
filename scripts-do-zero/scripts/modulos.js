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

    // Função para verificar se a última pergunta do módulo foi respondida
    function checkModuleCompletion(moduleId) {
        const moduloAtual = dados.modulos.find(modulo => modulo.id == moduleId);
        const ultimaAula = moduloAtual.aulas[moduloAtual.aulas.length - 1];
        const ultimaPergunta = ultimaAula.perguntas[ultimaAula.perguntas.length - 1];
        
        // Verifica se a última pergunta da última aula foi respondida
        if (localStorage.getItem(`pergunta-${ultimaPergunta.id}-respondida`) === 'true') {
            localStorage.setItem(`module-${moduleId}-completed`, 'true');
            updateProgress();
        }
    }

    // Marcar módulo como concluído quando o usuário clica
    modules.forEach(module => {
        module.addEventListener('click', function(event) {
            const moduleId = event.target.getAttribute('data-module');

            // Verificar se a última pergunta foi respondida antes de marcar o módulo como concluído
            checkModuleCompletion(moduleId);

            // Adicionar classe para marcar visualmente
            event.target.classList.add('concluido');
        });
    });

    // Função para marcar a pergunta como respondida
    function marcarPerguntaComoRespondida(idDaPergunta) {
        localStorage.setItem(`pergunta-${idDaPergunta}-respondida`, 'true');
    }

    // Aqui seria a parte onde você verifica se a última pergunta foi respondida.
    // Pode ser dentro de um evento que lida com o clique da opção de resposta.
    function verificarResposta(idDaPergunta, idDaAula, idDoModulo, respostaEscolhida) {
        // Aqui, no momento em que a resposta for dada, marque a pergunta como respondida
        marcarPerguntaComoRespondida(idDaPergunta);

        // Depois de responder, verifica se o módulo pode ser concluído
        checkModuleCompletion(idDoModulo);
    }

    // Inicializar a barra de progresso ao carregar a página
    updateProgress();
});
