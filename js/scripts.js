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

  //button information
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //adding an event listener
    button.addEventListener('click', function (event) {
      console.log(event);
    })
  }

  showDetails(pokemon) {
    console.log(pokemon),

  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();
//It wont print anything if I use console.log instead of document.write

//printing button
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);

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
