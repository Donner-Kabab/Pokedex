let pokemonList = [
  {
    name: "Ivysaur",
    height: 1,
    type: ["grass", "poison"],
  },

  {
    name: "Ninetales",
    height: 1.1,
    type: ["fire"],
  },

  {
    name: "Arcanine",
    height: 1.9,
    type: ["fire"],
  },

  {
    name: "Charizard",
    height: 1.7,
    type: ["fire", "flying"],
  },

  {
    name: "Snorlax",
    height: 2.1,
    type: ["normal"],
  },
];

//It wont print anything if I use console.log instead of document.write
pokemonList.forEach(function (pokemonList) {
  document.write(pokemonList.name + "(height: " + pokemonList.height + ")");
  if (pokemonList.height > 2) {
    document.write(" - Wow, that's big!");
  }
  document.write("<br>");
});

//This was a normal loop that was originally used instead of the one above
/*for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    pokemonList[i].name + "(height: " + pokemonList[i].height + ")"
  );
  if (pokemonList[i].height > 2) {
    document.write(" - Wow, that's big!");
  }
  document.write("<br>");
}*/
