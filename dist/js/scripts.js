let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t && "detailsUrl" in t
      ? e.push(t)
      : console.log("Pokemon is not correct");
  }
  function n() {
    return e;
  }
  function o(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(e) {
    o(e).then(function () {
      console.log(e);
    });
  }
  return (
    window.addEventListener("keydown", (e) => {
      let t = document.querySelector("#modal-container");
      "Escape" === e.key && t.classList.contains("is-visible");
    }),
    {
      getAll: n,
      add: t,
      addListItem: function e(t) {
        let n = document.querySelector(".pokemon-list"),
          o = document.createElement("li"),
          i = document.createElement("button");
        (i.innerText = t.name),
          i.classList.add("btn", "btn-primary"),
          i.setAttribute("data-toggle", "modal"),
          i.setAttribute("data-target", "#exampleModal"),
          o.appendChild(i),
          n.appendChild(o),
          i.addEventListener("click", function (e) {
            var n;
            (n = t),
              fetch(n.detailsUrl)
                .then(function (e) {
                  return e.json();
                })
                .then(function (e) {
                  let t = e.height,
                    o = e.sprites.front_default,
                    i = document.querySelector(".modal-body"),
                    r = document.querySelector(".modal-title");
                  (r.innerText = ""),
                    (i.innerHTML = ""),
                    (r.innerText = n.name);
                  let l = document.createElement("h1");
                  l.innerText = n.name;
                  let a = document.createElement("p");
                  (a.innerHTML += "Height: " + t + "<br>"),
                    (a.innerHTML += `<img src=${o} width="100" height="100">`),
                    i.appendChild(l),
                    i.appendChild(a);
                });
          });
      },
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=950")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              t({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: o,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    console.log(e), pokemonRepository.addListItem(e);
  });
});
