const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonType = document.querySelector(".pokemon-type");
const pokemonPicture = document.querySelector(".pokemon-picture");
const bodyElement = document.body;
const data = document.querySelector(".data");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  clearData(pokemonName);
  clearData(pokemonType);
  clearData(pokemonPicture);
  const userInput = searchInput.value;
  const rawPokemonData = await getPokemonAPI(userInput);
  changeColor(userInput, rawPokemonData);
  getPokemonName(rawPokemonData);
  getPokemonType(rawPokemonData);
  getPokemonPicture(rawPokemonData);
});

async function getPokemonAPI(name) {
  try {
    const currentPokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    const pokemonData = await fetch(currentPokemonURL);
    if (!pokemonData.ok) {
      console.log("Fetch could not be completed");
    } else {
      return await pokemonData.json();
    }
  } catch (e) {
    console.error("Failed: ", e);
  }
}

async function changeColor(name, rawPokemonData) {
  //getting pokemon's color from original rawPokemonData
  try {
    const speciesURL = rawPokemonData.species.url;
    const speciesData = await fetch(speciesURL);
    const rawSpeciesData = await speciesData.json();
    const pokemonColor = rawSpeciesData.color.name;
    bodyElement.style.backgroundColor = pokemonColor;
  } catch (e) {
    console.error("Failed: ", e);
  }
}

async function getPokemonName(rawPokemonData) {
  const div = document.createElement("div");
  div.innerText = rawPokemonData.name;
  pokemonName.append(div);
  div.classList.add("pokemon-added-data");
}

async function getPokemonType(rawPokemonData) {
  const div = document.createElement("div");
  div.innerText = rawPokemonData.types[0].type.name;
  pokemonType.append(div);
  div.classList.add("pokemon-added-data");
}

async function getPokemonPicture(rawPokemonData) {
  const img = document.createElement("img");
  img.src = rawPokemonData.sprites.front_default;
  pokemonPicture.append(img);
  img.classList.add("pokemon-added-data");
}

function clearData(itemName) {
  while (itemName.children[0] != null || undefined) {
    itemName.removeChild(itemName.children[0]);
  }
}

function listErrors() {}

//TODO:
//list all errors on screen
//clean up CSS
//make README
