let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=950";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  //button information
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //adding an event listener
    button.addEventListener("click", function (event) {
      // showDetails(pokemon);
      showModal(pokemon);
    });
  }

  //promise to load the link
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //getting the pokemon details
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  ////////////////////////////////////////////

  function showModal(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const height = json.height;
        const frontImage = json.sprites.front_default;

        let modalBody = document.querySelector(".modal-body");
        //clear existing modal content
        modalBody.innerHTML = "";
        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerText = pokemon.name;

        //add new modal content
        //let closeButtonElement = document.createElement("button");
        //closeButtonElement.classList.add("modal-close");
        //closeButtonElement.innerText = "Close";

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name; ////////

        let contentElement = document.createElement("p");
        contentElement.innerHTML += "Height: " + height + "<br>"; /////////
        contentElement.innerHTML += `<img src=${frontImage} width="100" height="100">`;

        //modalBody.appendChild(closeButtonElement);
        modalBody.appendChild(titleElement);
        modalBody.appendChild(contentElement);
        //modalBody.appendChild(modal);
      });
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      //hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//printing button
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    console.log(pokemon);
    pokemonRepository.addListItem(pokemon);

    //document.write("<br>");
  });
});
