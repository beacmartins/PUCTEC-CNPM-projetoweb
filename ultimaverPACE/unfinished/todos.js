let dados; // Variável para armazenar os dados do db.json
const progresso = { modulos: {} }; // Progresso inicial vazio

// Função para carregar os dados do db.json
async function carregarDados() {
  try {
    const response = await fetch('db.json');
    dados = await response.json();
    inicializarProgresso();
    renderizarModulos();
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

// Inicializa o progresso do usuário com base nos módulos carregados
function inicializarProgresso() {
  dados.modulos.forEach(modulo => {
    if (!progresso.modulos[modulo.id]) {
      progresso.modulos[modulo.id] = { aulasCompletas: [], aulaAtual: 1 };
    }
  });
}

// Renderizar os módulos disponíveis
function renderizarModulos() {
  const modulosContainer = document.getElementById("modulos");
  modulosContainer.innerHTML = "<h2>Módulos Disponíveis</h2>";

  dados.modulos.forEach(modulo => {
    const btn = document.createElement("button");
    btn.textContent = modulo.nome;
    btn.className = "btn";
    btn.onclick = () => carregarAulas(modulo.id);
    modulosContainer.appendChild(btn);
  });
}

// Carregar as aulas de um módulo
function carregarAulas(moduloId) {
  const modulo = dados.modulos.find(m => m.id === moduloId);
  const progressoModulo = progresso.modulos[moduloId];

  if (!modulo || !progressoModulo) return;

  const aulasContainer = document.getElementById("aulas-list");
  aulasContainer.innerHTML = "";

  modulo.aulas.forEach(aula => {
    const btn = document.createElement("button");
    btn.textContent = aula.titulo;
    btn.className = "btn";
    btn.disabled = !(
      progressoModulo.aulasCompletas.includes(aula.id) ||
      aula.id === progressoModulo.aulaAtual
    );
    btn.onclick = () => carregarExercicios(moduloId, aula.id);
    aulasContainer.appendChild(btn);
  });

  document.getElementById("modulos").style.display = "none";
  document.getElementById("aulas").style.display = "block";
}

// Carregar os exercícios de uma aula
function carregarExercicios(moduloId, aulaId) {
  const modulo = dados.modulos.find(m => m.id === moduloId);
  const aula = modulo.aulas.find(a => a.id === aulaId);

  if (!aula) return;

  const exerciciosContainer = document.getElementById("exercicios-list");
  exerciciosContainer.innerHTML = "";

  aula.perguntas.forEach(pergunta => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<strong>${pergunta.pergunta}</strong>`;
    
    pergunta.opcoes.forEach((opcao, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `pergunta-${pergunta.id}`;
      input.value = index;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opcao));
      questionDiv.appendChild(label);
    });

    exerciciosContainer.appendChild(questionDiv);
  });

  document.getElementById("aulas").style.display = "none";
  document.getElementById("exercicios").style.display = "block";
}

// Funções para voltar
function voltarParaModulos() {
  document.getElementById("aulas").style.display = "none";
  document.getElementById("modulos").style.display = "block";
}

function voltarParaAulas() {
  document.getElementById("exercicios").style.display = "none";
  document.getElementById("aulas").style.display = "block";
}

// Carregar os dados ao iniciar
carregarDados();