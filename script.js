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
    console.log(data);
    
    // console.log(data.stats[0].base_stat);
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