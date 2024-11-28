document.addEventListener('DOMContentLoaded', function () {
    let questaoAtual = 1;
    const totalQuestoes = 5; // Total de questões
    const botaoProx = document.getElementById('botaoProx');
    const botaoLimpar = document.getElementById('botaoLimpar');
    const listaQuestoes = document.querySelectorAll('.opcoesDeQuestoes');
    const campoExercicios = document.querySelector('.campoExercicios');
    const questaoTexto = document.getElementById('questao');
    const perguntaTexto = document.getElementById('perguntaTexto');
    const perguntaDetalhe = document.getElementById('perguntaDetalhe');
    const opcoes = document.querySelectorAll('#opcoes input');
    
    // Armazena as respostas do usuário
    const respostas = {};

    // Função para atualizar o conteúdo da questão e opções
    function atualizarQuestao(questao) {
        questaoTexto.textContent = `Questão ${questao}`;
        perguntaTexto.textContent = `Lorem ipsum dolor sit amet... (Questão ${questao})`;
        perguntaDetalhe.textContent = `Texto detalhado para a questão ${questao}...`;

        // Limpar as respostas anteriores
        opcoes.forEach(opcao => {
            opcao.checked = false;
        });

        // Habilita ou desabilita o botão "Próxima Questão"
        if (respostas[questao]) {
            botaoProx.disabled = false;
        } else {
            botaoProx.disabled = true;
        }
    }

    // Ativa o botão "Próxima Questão" quando uma opção é selecionada
    opcoes.forEach(opcao => {
        opcao.addEventListener('change', function () {
            respostas[questaoAtual] = true;
            botaoProx.disabled = false;
        });
    });

    // Botão Limpar Resposta
    botaoLimpar.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Limpa as opções selecionadas
        opcoes.forEach(opcao => {
            opcao.checked = false;
        });
        
        // Desmarca a resposta e desabilita o botão "Próxima Questão"
        delete respostas[questaoAtual];
        botaoProx.disabled = true;
    });

    // Navegação pelas questões ao clicar nas opções do lado esquerdo
    listaQuestoes.forEach(li => {
        li.addEventListener('click', function () {
            const questaoSelecionada = parseInt(this.getAttribute('data-questao'));

            // Verifica se a questão selecionada é válida
            if (questaoSelecionada != questaoAtual) {
                questaoAtual = questaoSelecionada;
                atualizarQuestao(questaoAtual);
            }
        });
    });

    // Avançar para a próxima questão
    botaoProx.addEventListener('click', function (e) {
        e.preventDefault();

        if (questaoAtual < totalQuestoes) {
            questaoAtual++;
            atualizarQuestao(questaoAtual);
        }
    });

    // Inicializar com a primeira questão
    atualizarQuestao(questaoAtual);
});
