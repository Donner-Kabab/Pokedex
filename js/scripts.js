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
    li.classList.add("col-6", "col-md-4");
    pokemonList.appendChild(li);

    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    listpokemon.appendChild(button);
    button.classList.add("btn", "btn-lg", "btn-block");
    button.setAttribute("data-target", "modal");
    button.setAttribute("data-toggle", "modal");
    addEventListenerToButton(button, pokemon);
  }
  function addEventListenerToButton(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
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
        item.imageUrlFront = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  let modal = document.querySelector(".modal");

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //function showDetails(pokemon) {
  //loadDetails(pokemon).then(function () {
  //console.log(pokemon);
  //});
  //}
  ////////////////////////////////////////////

  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalHeader = document.querySelector(".modal-header");
    modalBody.innerHTML = "";

    let modalTitle = document.querySelector(".modal-title");
    var capitalizedName = pokemon.name
      .split("")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    modalTitle.innerHTML = capitalizedName;

    let closeButtonElement = document.querySelector(".close");

    let imageFront = document.createElement("img");
    imageFront.classList.add("modal-img");
    imageFront.src = pokemon.imageUrlFront;
    imageFront.alt = "Front image of " + pokemon.name;

    let heightElement = document.createElement("p");
    heightElement.innerHTML = "Height: " + pokemon.height;

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButtonElement);
    modalBody.appendChild(imageFront);
    modalBody.appendChild(heightElement);
  }

  function hideModal() {
    modal.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modal.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modal) {
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
