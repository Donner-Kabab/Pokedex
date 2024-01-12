let pokemonRepository = (function () {
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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

//It wont print anything if I use console.log instead of document.write

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(pokemon.name);
  if (pokemon.height > 2) {
    document.write(pokemon.name + " - Wow, that's big!");
  }
  document.write("<br>"); //prints the data on different lines instead of the same line
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
