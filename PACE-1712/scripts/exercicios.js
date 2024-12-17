
document.addEventListener('DOMContentLoaded', async function () {

    let acertos = 0;
    let erros = 0;


    let questaoAtual = 1;
    const totalQuestoes = 6; // Total de questões
    const botaoProx = document.getElementById('botaoProx');
    const botaoLimpar = document.getElementById('botaoLimpar');
    const listaQuestoes = document.querySelectorAll('.opcoesDeQuestoes');
    const campoExercicios = document.querySelector('.campoExercicios');
    const questaoTexto = document.getElementById('questao');
    const perguntaTexto = document.getElementById('perguntaTexto');
    const opcoes = document.querySelectorAll('#opcoes input');

     
    
    // Armazena as respostas do usuário
    const respostas = {};

    // Carregar o JSON das aulas do localStorage (ou de um arquivo se necessário)
    const response = await fetch("../db/db.json");
    const aulas = await response.json();

    // Define as respostas corretas para cada questão
    const respostasCorretas = {
        1: 1, // Resposta correta da Questão 1 (índice da opção correta)
        2: 0, // Resposta correta da Questão 2 (índice da opção correta)
        3: 1, // Resposta correta da Questão 3 (índice da opção correta)
        4: 1, // Resposta correta da Questão 4 (índice da opção correta)
        5: 1, // Resposta correta da Questão 5 (índice da opção correta)
        6: 2  // Resposta correta da Questão 6 (índice da opção correta)
    };

    // Função para atualizar o conteúdo da questão, pergunta e opções
    function atualizarQuestao(questao) {
        const aulaId = 1; // Defina o ID da aula atual. Exemplo: aula 1.
        const aula = aulas.aulas[aulaId];
        const perguntaAtual = aula.perguntas[questao];
        
        questaoTexto.textContent = `Questão ${questao}`;
        perguntaTexto.textContent = perguntaAtual.pergunta; // Atualiza a pergunta

        // Atualiza as opções de resposta
        const opcoesAtual = perguntaAtual.opcoes;
        const listaOpcoes = document.querySelectorAll('#opcoes li');  // Seleciona os itens de opções

        // Itera sobre as opções para atualizar
        listaOpcoes.forEach((opcao, index) => {
            const textoOpcao = opcao.querySelector('.opcaoTexto'); // Pega o texto da opção (dentro do <span>)
            const radioInput = opcao.querySelector('input'); // Pega o input radio
            
            if (opcoesAtual[index]) {
                textoOpcao.textContent = `${String.fromCharCode(97 + index)}) ${opcoesAtual[index]}`; // Atualiza o texto da opção
                radioInput.value = opcoesAtual[index]; // Atribui o valor da opção
                opcao.style.display = 'block'; // Garante que a opção seja visível
            } else {
                opcao.style.display = 'none'; // Oculta a opção caso não haja
            }
        });

        // Limpar as respostas anteriores
        opcoes.forEach(opcao => {
            opcao.checked = false; // Desmarca todas as opções
            opcao.parentElement.classList.remove('correct', 'incorrect'); // Remove as classes de acerto e erro
            opcao.parentElement.style.backgroundColor = ''; // Reseta a cor de fundo
            opcao.disabled = false; // Habilita novamente as opções
        });

        // Limpa o feedback
        const feedbackDiv = document.getElementById('feedback');
        feedbackDiv.textContent = ''; // Limpa a mensagem de feedback
        feedbackDiv.style.display = 'none'; // Esconde o feedback

        // Desabilita o botão "Próxima Questão"
        botaoProx.disabled = true;
    }

    function verificarResposta(respostaEscolhida) {
        const respostaCorreta = respostasCorretas[questaoAtual]; // Resposta correta para a questão
        const listaOpcoes = document.querySelectorAll('#opcoes li');
        const feedbackDiv = document.getElementById('feedback');  // Seleciona a div de feedback
    
        // Reseta as classes e cores das opções
        listaOpcoes.forEach((opcao, index) => {
            opcao.classList.remove('correct', 'incorrect', 'selected'); // Remove as classes
            const radioInput = opcao.querySelector('input');
            
            if (index === respostaCorreta) {
                opcao.classList.add('correct'); // Adiciona a classe 'correct' para a opção correta
            } else if (index === respostaEscolhida) {
                opcao.classList.add('incorrect'); // Adiciona a classe 'incorrect' para a opção errada
            }
    
            // Desabilita a opção após a escolha
            radioInput.disabled = true;
        });
    
        // Exibe a mensagem de feedback
        if (respostaEscolhida === respostaCorreta) {
            feedbackDiv.textContent = "Parabéns, você acertou!";
            feedbackDiv.classList.remove('incorrect');  // Remove a classe de erro, caso esteja presente
            feedbackDiv.classList.add('correct');      // Adiciona a classe de sucesso
    
            acertos++;  // Incrementa o número de acertos
        } else {
            feedbackDiv.textContent = "Que pena, sua resposta não está correta, volte ao conteúdo para verificar e retorne!";
            feedbackDiv.classList.remove('correct');  // Remove a classe de acerto, caso esteja presente
            feedbackDiv.classList.add('incorrect');   // Adiciona a classe de erro
    
            erros++;  // Incrementa o número de erros
        }
    
        // Torna o feedback visível
        feedbackDiv.style.display = 'block';
    
        // Desabilita a navegação para a próxima questão até que o usuário limpe a resposta
        botaoProx.disabled = false;
    
        // Atualiza o contador de acertos e erros
        atualizarContagem();
    }
    
    function atualizarContagem() {
        const contagemDiv = document.getElementById('contagem'); // Crie uma div com id 'contagem' no HTML
        contagemDiv.textContent = `Acertos: ${acertos} | Erros: ${erros}`;
    }
    

    // Ativa o botão "Próxima Questão" quando uma opção é selecionada
    opcoes.forEach((opcao, index) => {
        opcao.addEventListener('change', function () {
            const respostaEscolhida = index;
            respostas[questaoAtual] = respostaEscolhida; // Armazena a resposta escolhida pelo usuário

            // Chama a função de verificação da resposta
            verificarResposta(respostaEscolhida); 

            botaoProx.disabled = false;  // Habilita o botão para avançar
        });
    });
    
    // Botão Limpar Resposta
    botaoLimpar.addEventListener('click', function (e) {
        e.preventDefault();

        // Limpa as opções selecionadas
        const listaOpcoes = document.querySelectorAll('#opcoes li');
        
        listaOpcoes.forEach(opcao => {
            const radioInput = opcao.querySelector('input');
            radioInput.disabled = false; // Reabilita as opções de resposta
            radioInput.checked = false; // Desmarca as opções
            opcao.classList.remove('correct', 'incorrect'); // Remove as classes de acerto e erro
            opcao.style.backgroundColor = ''; // Reseta a cor de fundo
        });

        // Limpa o feedback
        const feedbackDiv = document.getElementById('feedback');
        feedbackDiv.textContent = ''; // Limpa a mensagem de feedback
        feedbackDiv.style.display = 'none'; // Esconde o feedback

        // Desabilita o botão "Próxima Questão"
        botaoProx.disabled = true;

        // Limpa as respostas
        delete respostas[questaoAtual];
    });

    // Navegação pelas questões ao clicar nas opções do lado esquerdo
    listaQuestoes.forEach(li => {
        // Verifica se a <li> tem o atributo 'data-questao', ou seja, se é uma questão válida
        if (li.hasAttribute('data-questao')) {
            li.addEventListener('click', function () {
                const questaoSelecionada = parseInt(this.getAttribute('data-questao'));

                // Verifica se a questão selecionada é válida
                if (questaoSelecionada !== questaoAtual) {
                    questaoAtual = questaoSelecionada;
                    atualizarQuestao(questaoAtual);
                }
            });
        }
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

