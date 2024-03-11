const searchBtn = document.getElementById('search-btn');
const userInput = document.getElementById('search-bar');

const displayContainer = document.getElementById('pokemon-display');

const hpStat = document.getElementById('hp');
const attackStat = document.getElementById('attack');
const defenseStat = document.getElementById('defense');
const specialAttackStat = document.getElementById('sp-attack');
const specialDefenseStat = document.getElementById('sp-defense');
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
    displayContainer.innerHTML = ``;

    console.log(data);

    const name = data.name;
    const number = data.id;

    const height = data.height;
    const weight = data.weight;

    const img_url = data.sprites.front_default;

    displayContainer.innerHTML = `<p style='font-size: 18px'>${name.toUpperCase()} #${number}</p>`;
    displayContainer.innerHTML += `<p style='font-size: 14px'>Weight: ${weight} Height: ${height}</p>`;
    displayContainer.innerHTML += `<img src='${img_url}'>`;
    displayContainer.innerHTML += `<div id='pokemon-types'></div>`;

    const pokemonTypesSection = document.getElementById('pokemon-types');
    pokemonTypesSection.style.display = "flex";

    for (const type of data.types) {
      pokemonTypesSection.innerHTML += `<span class='pokemon-type ${type.type.name}'>${type.type.name.toUpperCase()}</span>`;
    }
    // console.log(data.types.length);
    
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