// Lista com os links dos embeds das fases
const fases = [
    "https://wordwall.net/embed/19918508cf244dd4be34a057bc137bad?themeId=21&templateId=30&fontStackId=0", 
    "https://wordwall.net/embed/425e175bd58d43389ff1d3ff0cf60a02?themeId=21&templateId=69&fontStackId=0", 
    "https://wordwall.net/embed/703e079c083d47088552bae0a6526147?themeId=21&templateId=69&fontStackId=0" 
];

let faseAtual = 0;  // Inicia na fase 1

// Referência ao iframe e aos botões
const iframe = document.getElementById('fase-iframe');
const botaoProximaFase = document.getElementById('botaoProx');
const botaoJogarNovamente = document.getElementById('botaoJogar');

// Função para atualizar o título da fase
function atualizarFase() {
    document.querySelector('h2').textContent = `Fase ${faseAtual + 1}`;  // Atualiza o título da fase, lembrando que a fase começa do 0
}

// Função para alterar o embed para a próxima fase
botaoProximaFase.addEventListener('click', (e) => {
    e.preventDefault(); // Impede que o link seja seguido
    faseAtual++;  // Avança para a próxima fase
    if (faseAtual >= fases.length) {
        faseAtual = 0;  // Se alcançar o final, volta para a primeira fase
    }
    iframe.src = fases[faseAtual];  // Altera o src do iframe para a nova fase
    atualizarFase();  // Atualiza o título da fase
});

// Função para reiniciar o jogo na fase atual
botaoJogarNovamente.addEventListener('click', (e) => {
    e.preventDefault(); // Impede que o link seja seguido
    iframe.src = fases[faseAtual];  // Recarrega o iframe com a fase atual
    atualizarFase();  // Atualiza o título da fase
});

// Inicializa a página com a fase 1
atualizarFase();
