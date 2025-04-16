const queue = [];
const apiURL = 'https://rickandmortyapi.com/api/character/';
let currentCall = null;

const currentCharacter = document.getElementById('currentCharacter');
const queueList = document.getElementById('queueList');

document.getElementById('addBtn').addEventListener('click', () => addCharacter());
document.getElementById('chamarBtn').addEventListener('click', () => callCharacter());
document.getElementById('attendBtn').addEventListener('click', () => attendCharacter());

const ordinal = n => `${n}º`;

const traduzir = {
  status: s => ({ Alive: "Vivo", Dead: "Morto", unknown: "Desconhecido" }[s] || s),
  especie: e => ({
    Human: "Humano", Alien: "Alienígena", Robot: "Robô",
    "Mythological Creature": "Criatura Mítica", unknown: "Desconhecida"
  }[e] || e)
};

async function addCharacter() {
  const id = Math.floor(Math.random() * 826) + 1;
  try {
    const res = await fetch(apiURL + id);
    const character = await res.json();
    queue.push(character);
    renderQueue();
  } catch (err) {
    console.error("Erro ao buscar personagem:", err);
  }
}

function callCharacter() {
  if (!queue.length) return alert("A fila está vazia. Adicione personagens.");
  if (currentCall) return alert("Já há um personagem chamado.");
  currentCall = queue[0];
  renderCurrent(currentCall);
}

function attendCharacter() {
  if (!currentCall) return alert("Nenhum personagem foi chamado.");
  queue.shift();
  currentCall = null;
  currentCharacter.innerHTML = `<p>Nenhum personagem em atendimento</p>`;
  renderQueue();
}

function renderCurrent({ image, name, species, status }) {
  currentCharacter.innerHTML = `
    <div class="card">
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>Espécie: ${traduzir.especie(species)}</p>
      <p>Status: ${traduzir.status(status)}</p>
    </div>
  `;
}

function renderQueue() {
  queueList.innerHTML = queue.map((c, i) => `
    <div class="card">
      <p class="position">${ordinal(i + 1)}</p>
      <img src="${c.image}" alt="${c.name}">
      <h4>${c.name}</h4>
    </div>
  `).join('');
}
