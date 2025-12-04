const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const userInput = searchInput.value;
  changeColor(userInput);
  const pokemonData = await getPokemonData(userInput);
});

async function getPokemonData(name) {
  try {
    const currentPokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    const pokemonData = await fetch(currentPokemonURL);
    if (!pokemonData.ok) {
      console.log("Fetch could not be completed");
    }
    return await pokemonData.json();
  } catch (e) {
    console.error("Failed: ", e);
  }
}

async function changeColor(name) {
  //change background color of page based on pokemon color
}
