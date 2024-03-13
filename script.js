const searchBtn = document.getElementById('search-button');
const userInput = document.getElementById('search-input');

const displayContainer = document.getElementById('pokemon-display');

const hpStat = document.getElementById('hp');
const attackStat = document.getElementById('attack');
const defenseStat = document.getElementById('defense');
const specialAttackStat = document.getElementById('special-attack');
const specialDefenseStat = document.getElementById('special-defense');
const speedStat = document.getElementById('speed');


const search = (userInput) => {
  
  if (userInput.includes("♂")) {
    userInput = userInput.replace("♂", "-m");
    userInput = userInput.replace(" ", "");
  } 

  if (userInput.includes("♀")) {
    userInput = userInput.replace("♀", "-f");
    userInput = userInput.replace(" ", "");
  }

  userInput = userInput.toLowerCase();

  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput}`)
  .then((res) => res.json())
  .then((data) => {

    const name = data.name;
    const number = data.id;

    const height = data.height;
    const weight = data.weight;

    const img_url = data.sprites.front_default;

    document.getElementById('pokemon-name').textContent = name.toUpperCase();
    document.getElementById('pokemon-id').textContent = number;
    document.getElementById('sprite').src = img_url;
    document.getElementById('height').textContent = height;
    document.getElementById('weight').textContent = weight;

    for (const child of displayContainer.children) {
      child.classList.remove('hidden');
    }

    const pokemonTypesSection = document.getElementById('types');
    document.getElementById('types').innerHTML = ``;
    pokemonTypesSection.style.display = "flex";

    for (const type of data.types) {
      pokemonTypesSection.innerHTML += `<span class='pokemon-type ${type.type.name}'>${type.type.name.toUpperCase()}</span>`;
    }
    
    hpStat.textContent = data.stats[0].base_stat;
    attackStat.textContent = data.stats[1].base_stat;
    defenseStat.textContent = data.stats[2].base_stat;
    specialAttackStat.textContent = data.stats[3].base_stat;
    specialDefenseStat.textContent = data.stats[4].base_stat;
    speedStat.textContent = data.stats[5].base_stat;
  })
  .catch((err) => {
    alert('Pokémon not found');
  });
}

searchBtn.addEventListener('click', () => {
  search(userInput.value);
  userInput.value = '';
});