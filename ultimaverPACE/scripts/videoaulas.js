document.addEventListener('DOMContentLoaded', function () {
    let aulaAtual = 0; // A aula inicial é a de índice 0

    // Definindo as aulas em um array
    const aulas = [
        {
            titulo: "Treinamento: IT – FR – 02",
            modulo: "Módulo 01 - Manuseio tampa de carreta",
            resumo: "Bem-vindo ao nosso treinamento sobre segurança e procedimentos operacionais no manuseio de tampas de carretas carga seca e trucks. Neste curso, você aprenderá sobre as práticas essenciais para garantir a segurança e eficiência no transporte de cargas. Exploraremos as etapas críticas desde a inspeção inicial do veículo até o correto manuseio e fechamento das tampas, sempre enfatizando a importância do uso adequado de Equipamentos de Proteção Individual (EPIs) e a observância das normas de segurança. Nosso objetivo é capacitá-lo para desempenhar suas funções com excelência, minimizando riscos e promovendo um ambiente de trabalho seguro e produtivo. Esperamos que este treinamento seja uma experiência enriquecedora e que você se sinta preparado para aplicar esses conhecimentos no seu dia a dia.",
            videoId: "IofGLtMVSjM",
        },
        {
            titulo: "Treinamento: IT – FR – 03",
            modulo: "Módulo 01 - Conferência de Documentação e Carga nas Coletas",
            resumo: "Durante o treinamento, você aprenderá a importância de uma conferência rigorosa das mercadorias, desde a verificação da quantidade de volumes até a confirmação visual da carga correta. Exploraremos os passos necessários para lidar com situações de inconformidade, como quantidades incorretas ou mercadorias erradas, e como proceder para evitar erros que possam comprometer a operação e a satisfação do cliente.",
            videoId: "4Azrf7kaLwA",
        },
        {
            titulo: "Treinamento: IT – AM – 04",
            modulo: "Módulo 01 - Expedição de Crossdoking, recebimento e Transferência",
            resumo: "Durante o treinamento, você aprenderá sobre a importância de uma separação adequada dos materiais, a utilização de ferramentas essenciais como etiquetas de identificação e equipamentos de movimentação, e a execução de conferências precisas para evitar avarias e extravios. Nosso objetivo é equipá-lo com o conhecimento necessário para otimizar o fluxo de trabalho no armazém e assegurar a satisfação do cliente através de operações logísticas impecáveis.",
            videoId: "zbO24oLkK3g",
        },
        {
            titulo: "Treinamento: Manual Motorista Autolog",
            modulo: "Módulo 01 - Manual Motorista Autolog",
            resumo: "Durante este curso, abordaremos temas cruciais como a inspeção de veículos, o uso correto de equipamentos de proteção individual (EPIs), técnicas de direção defensiva, e procedimentos em casos de emergências e condições adversas. Nosso objetivo é não apenas informar, mas também engajar você em práticas que promovam a segurança e a sustentabilidade, alinhadas aos altos padrões da AUTOLOG.",
            videoId: "BCOsk_r_vEw",
        }
    ];

    // Função para atualizar a aula
    function atualizarAula() {
        aulaAtual++;

        if (aulaAtual >= aulas.length) {
            aulaAtual = 0; // Se chegou ao fim, volta para a primeira aula
        }

        // Atualizando título, módulo, resumo e vídeo
        document.getElementById('titulo').textContent = aulas[aulaAtual].titulo;
        document.querySelector('h2').textContent = aulas[aulaAtual].modulo;
        document.getElementById('resumo').textContent = aulas[aulaAtual].resumo;
        document.getElementById('videomain').src = `https://www.youtube.com/embed/${aulas[aulaAtual].videoId}?si=l3cjsggB4tRd6yeG`;

        // Atualiza o link do botão "Ir para Exercícios"
        atualizarLinkExercicios();
    }

    // Atualiza o link do botão "Ir para Exercícios"
    function atualizarLinkExercicios() {
    const linkExercicios = document.getElementById('linkExercicios');
    linkExercicios.href = `exercicios.html?aula=${aulaAtual}`; // Define o ID da aula no link
    }

    // Adiciona o evento de clique no botão "Próxima Aula"
    document.getElementById('botaoProx').addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do link
        atualizarAula(); // Atualiza o conteúdo da aula
    });

    // Inicializa o conteúdo da primeira aula e atualiza o link do botão "Ir para Exercícios"
    document.getElementById('titulo').textContent = aulas[aulaAtual].titulo;
    document.querySelector('h2').textContent = aulas[aulaAtual].modulo;
    document.getElementById('resumo').textContent = aulas[aulaAtual].resumo;
    document.getElementById('videomain').src = `https://www.youtube.com/embed/${aulas[aulaAtual].videoId}?si=l3cjsggB4tRd6yeG`;
    atualizarLinkExercicios();
});
