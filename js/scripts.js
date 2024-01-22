let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  img = document.createElement("img");
  imgUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  img.src = imgUrl;

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
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //adding an event listener
    button.addEventListener("click", function (event) {
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

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let titleElement = document.querySelector("#titleModal");
      titleElement.textContent = item.name;

      let contentElement = document.querySelector(".modal-body");
      contentElement.innerHTML = ""; // Clear existing content

      let imgElement = document.createElement("img");
      imgElement.src = item.imgUrl;
      imgElement.alt = item.name;
      imgElement.classList.add("img-fluid");
      contentElement.appendChild(imgElement);

      let heightItem = document.createElement("p");
      heightItem.textContent = "Height: " + item.height + "'";
      contentElement.appendChild(heightItem);
      let titleTypes = document.createElement("span");
      titleElement.classList.add("spanType");
      titleTypes.innerText = "Type: ";

      let containerTypes = document.createElement("div");
      containerTypes.classList.add("type-container", "container", "row");
      contentElement.appendChild(containerTypes);
      containerTypes.appendChild(titleTypes);

      item.types.forEach((element) => {
        let typeElement = document.createElement("button");
        typeElement.classList.add("btn-lg", "type-content");
        typeElement.innerText = element.type.name;
        containerTypes.appendChild(typeElement);
      });
    });
  }

  function showDialog(title, text) {
    let modalContainer = document.querySelector("#modal-container");
    //clear existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    //add new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    //closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal("Modal title", "This is the modal content!");
  });

  /*document.querySelector("show-modal").addEventListener("click", () => {
    showModal();
  });*/

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  modalContainer.addEventListener("click", (e) => {
    let targer = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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

    //document.write("<br>");
  });
});
