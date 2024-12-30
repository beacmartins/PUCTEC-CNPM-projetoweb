document.addEventListener('DOMContentLoaded', () => {
    const modules = document.querySelectorAll('.module-link');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    // Dados dos módulos (você pode substituir essa estrutura com dados reais de seu backend)
    const dados = {
        modulos: [
            { id: 1, nome: "Trilha armazém", aulas: [ { id: 1, perguntas: [ { id: 1 }, { id: 2 } ] }, { id: 2, perguntas: [ { id: 3 }, { id: 4 } ] } ] },
            { id: 2, nome: "Trilha Operações", aulas: [ { id: 1, perguntas: [ { id: 1 }, { id: 2 } ] }, { id: 2, perguntas: [ { id: 3 }, { id: 4 } ] } ] },
            { id: 3, nome: "Trilha do motorista frota e terceiro", aulas: [ { id: 1, perguntas: [ { id: 1 }, { id: 2 } ] }, { id: 2, perguntas: [ { id: 3 }, { id: 4 } ] } ] },
            { id: 4, nome: "Trilha do comercial e vendas", aulas: [ { id: 1, perguntas: [ { id: 1 }, { id: 2 } ] }, { id: 2, perguntas: [ { id: 3 }, { id: 4 } ] } ] },
            { id: 5, nome: "Trilha segurança do trabalho", aulas: [ { id: 1, perguntas: [ { id: 1 }, { id: 2 } ] }, { id: 2, perguntas: [ { id: 3 }, { id: 4 } ] } ] },
            { id: 6, nome: "Trilha Qualidade e Certificações Autolog", aulas: [ { id: 1, perguntas: [ { id: 1 }, { id: 2 } ] }, { id: 2, perguntas: [ { id: 3 }, { id: 4 } ] } ] }
        ]
    };

    // Função para atualizar a barra de progresso
    function updateProgress() {
        const totalModules = modules.length;
        let completedModules = 0;

        // Verificar o estado de cada módulo
        modules.forEach(module => {
            const moduleId = module.getAttribute('data-module');
            if (localStorage.getItem(`module-${moduleId}-completed`) === 'true') {
                completedModules++;
            }
        });

        // Calcular o progresso como porcentagem
        const progress = (completedModules / totalModules) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Progresso: ${Math.round(progress)}%`;
    }

    // Função para verificar se a última pergunta de um módulo foi respondida
    function checkModuleCompletion(moduleId) {
        const moduloAtual = dados.modulos.find(modulo => modulo.id == moduleId);
        const ultimaAula = moduloAtual.aulas[moduloAtual.aulas.length - 1];
        const ultimaPergunta = ultimaAula.perguntas[ultimaAula.perguntas.length - 1];

        // Verificar se a última pergunta foi respondida
        const isLastQuestionAnswered = localStorage.getItem(`pergunta-${ultimaPergunta.id}-respondida`) === 'true';

        if (isLastQuestionAnswered) {
            // Marcar o módulo como concluído
            localStorage.setItem(`module-${moduleId}-completed`, 'true');
            updateProgress();
        }
    }

    // Marcar uma pergunta como respondida no localStorage
    function marcarPerguntaComoRespondida(idDaPergunta) {
        localStorage.setItem(`pergunta-${idDaPergunta}-respondida`, 'true');
    }

    // Função para simular a resposta a uma pergunta
    function responderPergunta(idDaPergunta, idDoModulo) {
        // Marcar a pergunta como respondida
        marcarPerguntaComoRespondida(idDaPergunta);

        // Após responder, verificar se o módulo pode ser concluído
        checkModuleCompletion(idDoModulo);
    }

    // Simulação de clique para responder a uma pergunta
    document.querySelectorAll('.question-answer').forEach(answer => {
        answer.addEventListener('click', function() {
            const idDaPergunta = answer.getAttribute('data-pergunta');
            const idDoModulo = answer.getAttribute('data-modulo');
            responderPergunta(idDaPergunta, idDoModulo);
        });
    });

    // Inicializar a barra de progresso ao carregar a página
    updateProgress();
});
