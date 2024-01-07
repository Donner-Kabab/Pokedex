let pokemonList = [
  {
    name: "Ivysaur (height: 1)",
    height: 1,
    type: ["grass", "poison"],
  },

  {
    name: "Ninetales (height: 1.1)",
    height: 1.1,
    type: ["fire"],
  },

  {
    name: "Arcanine (height: 1.9)",
    height: 1.9,
    type: ["fire"],
  },

  {
    name: "Charizard (height: 1.7)",
    height: 1.7,
    type: ["fire", "flying"],
  },

  {
    name: "Snorlax (height: 2.1)",
    height: 2.1,
    type: ["normal"],
  },
];
//There has to be a comma after the quotations above or it won't print

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name);
  if (pokemonList[i].height > 2) {
    document.write(pokemonList[i].name + " - Wow, that's big!");
  }
}
