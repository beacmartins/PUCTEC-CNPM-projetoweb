document.addEventListener('DOMContentLoaded', async function () {
    let acertos = 0;
    let erros = 0;

    const totalQuestoes = 6; // Total de questões
    const botaoVerificar = document.getElementById('botaoVerificar');
    const botaoProx = document.getElementById('botaoProx');
    const botaoLimpar = document.getElementById('botaoLimpar');
    const listaQuestoes = document.querySelectorAll('.opcoesDeQuestoes');
    const questaoTexto = document.getElementById('questao');
    const perguntaTexto = document.getElementById('perguntaTexto');
    const opcoesContainer = document.querySelector('#opcoes ul');
    const feedback = document.getElementById('feedback');

    let questaoAtualId = { idDaPergunta: 1, idDaAula: 1, idDoModulo: 1 };

    // Recuperando o parâmetro da URL para identificar a aula
    const urlParams = new URLSearchParams(window.location.search);
    const aulaId = parseInt(urlParams.get('aula'), 10) || 0;

    // Carregar o JSON das aulas
    const response = await fetch("../db/db.json");
    const dados = await response.json();

    function carregarQuestao(idDaPergunta, idDaAula, idDoModulo) {
        const modulo = dados.modulos.find(modulo => modulo.id === idDoModulo);
        if (!modulo) {
            console.error("Módulo não encontrado:", idDoModulo);
            return;
        }

        const aula = modulo.aulas.find(aula => aula.id === idDaAula);
        if (!aula) {
            console.error("Aula não encontrada:", idDaAula);
            return;
        }

        const questao = aula.perguntas.find(pergunta => pergunta.id === idDaPergunta);
        if (!questao) {
            console.error("Questão não encontrada:", idDaPergunta);
            return;
        }

        // Atualizar título, número da questão e pergunta
        document.getElementById('titulo').textContent = `Exercícios Aula #${idDaAula.toString().padStart(2, '0')}`;
        document.querySelector('h3').textContent = aula.titulo;
        questaoTexto.textContent = `Questão ${idDaPergunta}`;
        perguntaTexto.textContent = questao.pergunta;

        // Atualizar opções
        opcoesContainer.innerHTML = '';
        questao.opcoes.forEach((opcao, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="radio" name="resposta" value="${index}" id="opcao${index}">
                <label for="opcao${index}">${opcao}</label>
            `;
            opcoesContainer.appendChild(li);
        });

        // Resetar feedback e botões
        feedback.style.display = 'none';
        feedback.textContent = '';
        botaoProx.disabled = true;
    }

    function verificarResposta(idDaPergunta, idDaAula, idDoModulo) {
        const modulo = dados.modulos.find(modulo => modulo.id === idDoModulo);
        const aula = modulo?.aulas.find(aula => aula.id === idDaAula);
        const questao = aula?.perguntas.find(pergunta => pergunta.id === idDaPergunta);

        if (!questao) {
            console.error("Erro ao verificar a resposta. Dados incompletos.");
            return;
        }

        // Verificar qual resposta foi selecionada
        const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
        if (!respostaSelecionada) {
            feedback.textContent = "Por favor, selecione uma opção antes de verificar.";
            feedback.className = 'warning';
            feedback.style.display = 'block';
            return;
        }

        const indiceSelecionado = parseInt(respostaSelecionada.value, 10);

        if (questao.respostaCorreta === indiceSelecionado) {
            feedback.textContent = "Parabéns, você acertou!";
            feedback.className = 'correct';
            acertos++;
        } else {
            feedback.textContent = "Que pena, sua resposta está incorreta. Reveja o conteúdo e tente novamente.";
            feedback.className = 'incorrect';
            erros++;
        }

        feedback.style.display = 'block';
        botaoProx.disabled = false; // Habilitar botão de próxima questão
    }

    botaoVerificar.addEventListener('click', function (e) {
        e.preventDefault();
        verificarResposta(questaoAtualId.idDaPergunta, questaoAtualId.idDaAula, questaoAtualId.idDoModulo);
    });

    botaoLimpar.addEventListener('click', function (e) {
        e.preventDefault();
        opcoesContainer.querySelectorAll('input[name="resposta"]').forEach(input => input.checked = false);

        feedback.textContent = '';
        feedback.style.display = 'none';

        botaoProx.disabled = true; // Desabilitar botão de próxima questão
    });

    botaoProx.addEventListener('click', function (e) {
        e.preventDefault();
    
        const modulo = dados.modulos.find(modulo => modulo.id === questaoAtualId.idDoModulo);
        const aula = modulo?.aulas.find(aula => aula.id === questaoAtualId.idDaAula);
        const questoesAulaAtual = aula?.perguntas || [];
    
        const indiceQuestaoAtual = questoesAulaAtual.findIndex(q => q.id === questaoAtualId.idDaPergunta);
        if (indiceQuestaoAtual >= 0 && indiceQuestaoAtual < questoesAulaAtual.length - 1) {

            questaoAtualId = {
                idDaAula: aulaId + 1, // Ajustando o valor correto da aula
                idDoModulo: 1
            };
            
            questaoAtualId.idDaPergunta = questoesAulaAtual[indiceQuestaoAtual + 1].id;
            carregarQuestao(questaoAtualId.idDaPergunta, questaoAtualId.idDaAula, questaoAtualId.idDoModulo);
        } else {
            feedback.textContent = "Você completou todas as questões desta aula.";
            feedback.className = 'info';
            feedback.style.display = 'block';
            botaoProx.disabled = true; // Desabilitar o botão, pois não há mais questões
        }
    });
    

    listaQuestoes.forEach(li => {
        if (li.hasAttribute('data-questao')) {
            li.addEventListener('click', function () {
                const questaoSelecionada = parseInt(this.getAttribute('data-questao'), 10);
                questaoAtualId = {
                    idDaPergunta: questaoSelecionada,
                    idDaAula: aulaId + 1, // Ajustando o valor correto da aula
                    idDoModulo: 1
                };
                carregarQuestao(questaoAtualId.idDaPergunta, questaoAtualId.idDaAula, questaoAtualId.idDoModulo);
            });
        }
    });

    // Carregar a primeira questão
    carregarQuestao(questaoAtualId.idDaPergunta, aulaId + 1, 1);
});


