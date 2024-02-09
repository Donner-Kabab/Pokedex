let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=950";

  function getAll() {
    return pokemonList;
  }

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


  //button information
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");

    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.setAttribute("data-target", "modal");
    button.setAttribute("data-toggle", "modal");
    button.classList.add("btn", "btn-lg", "btn-block");

    //adding an event listener
    button.addEventListener("click", function (event) {
      // showDetails(pokemon);
      showModal(pokemon);
      let li = document.createElement("li");
      li.classList.add("col-6", "col-md-4");
      pokemonList.appendChild(li);
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

        let modalContainer = document.querySelector("#modal-container");
        //clear existing modal content
        modalContainer.innerHTML = "";

        let modal = document.createElement("div");
        modal.classList.add("modal");

        //add new modal content
        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener("click", hideModal);

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name; ////////

        let contentElement = document.createElement("p");
        contentElement.innerHTML += "Height: " + height + "<br>"; /////////
        contentElement.innerHTML += `<img src=${frontImage} width="100" height="100">`;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");

        modalContainer.addEventListener("click", (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
      });
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
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
    pokemonRepository.addListItem(pokemon);
  });
});
