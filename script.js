//L' url de l'API
const root = "http://localhost:8000/api/v1/titles/";

const body = document.body;

//la fenêtre modale
const modal = document.getElementById("itemModal");
const closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function () {
  console.log("close");
  modal.style.display = "none";
  modalContent = modal.querySelector(".modal-content");
  textArea = modalContent.querySelector(".textArea");
  textArea.innerHTML = "";
};

//Caroussel
const slideNext = (evt) => {
  let tracks = document.getElementsByClassName("track");
  let track = tracks[evt.currentTarget.id];
  if (track.offsetWidth - track.index * 200 < 1000) {
  } else {
    track.index++;
    track.style.transform = `translateX(-${track.index * 200}px)`;
  }
};

const slidePrev = (evt) => {
  let tracks = document.getElementsByClassName("track");
  let track = tracks[evt.currentTarget.id];
  if (track.index <= 0) {
    console.log("triggered");
    evt.currentTarget.classList.remove("show");
  } else {
    track.index--;
    track.style.transform = `translateX(-${track.index * 200}px)`;
  }
};

// Créer le Modal pour l' API
const createModal = async (itemId) => {
  let target = root.concat(itemId);
  // attend la réponse sur le point de terminaison spécifique du film
  response = await axios.get(target);
  modalContent = modal.querySelector(".modal-content");
  textArea = modalContent.querySelector(".textArea");

  // récupérer les données de la réponse
  // et remplir la fenêtre modale avec les données pertinentes
  let item = response.data;
  let image = document.createElement("img");
  image.src = `${item.image_url}`;
  textArea.appendChild(image);
  let title = document.createElement("h1");
  title.textContent = `${item.title}`;
  let genres = document.createElement("p");
  genres.textContent = `Genres: ${item.genres}`;
  let releaseDate = document.createElement("p");
  releaseDate.textContent = `Release Date: ${item.date_published}`;
  let year = document.createElement("p");
  year.textContent = `${item.year}`;
  let rated = document.createElement("p");
  rated.textContent = `Rated: ${item.rated}`;
  let imdbScore = document.createElement("p");
  imdbScore.textContent = `IMDB Score: ${item.imdb_score}`;
  let directors = document.createElement("p");
  directors.textContent = `Director: ${item.directors}`;
  let actors = document.createElement("p");
  actors.textContent = `Actors: ${item.actors}`;
  let duration = document.createElement("p");
  duration.textContent = `Duration: ${item.duration} mins`;
  let country = document.createElement("p");
  country.textContent = `Country: ${item.countries}`;
  let boxOffice = document.createElement("p");
  boxOffice.textContent = `Box Office: ${item.budget_currency} ${item.worldwide_gross_income}`;
  let summary = document.createElement("p");
  summary.textContent = `Summary: ${item.long_description}`;

  textArea.appendChild(title);
  textArea.appendChild(genres);
  textArea.appendChild(releaseDate);
  textArea.appendChild(rated);
  textArea.appendChild(imdbScore);
  textArea.appendChild(directors);
  textArea.appendChild(actors);
  textArea.appendChild(duration);
  textArea.appendChild(country);
  textArea.appendChild(boxOffice);
  textArea.appendChild(summary);

  // une fois que toutes les données sont analysées dans la fenêtre modale
  // afficher la modale
  modal.style.display = "block";
};

const createSection = (items, id) => {
  // obtenir le carrousel avec l'identifiant correspondant
  let carouselContainer = document.getElementById(id);
  console.log("carouselContainer: " + carouselContainer);
  let carouselInner =
    carouselContainer.getElementsByClassName("carousel-inner")[0];
  let track = carouselInner.getElementsByClassName("track")[0];
  track.id = id;
  track.index = 0;

  // créer la flèche vers la gauche
  let leftArrow = document.createElement("a");
  leftArrow.classList.add("arrow__btn", "left-arrow");
  leftArrow.textContent = "‹";
  leftArrow.id = id;
  leftArrow.addEventListener("click", slidePrev);
  carouselContainer.appendChild(leftArrow);

  // pour chaque élément obtenu de l'API, créer l'élément
  // et l'ajouter au carrousel.
  items.forEach((item) => {
    console.log(item);
    let divItem = document.createElement("div");
    divItem.classList.add("item");
    console.log("item.id " + item.id);
    itemId = item.id;
    divItem.setAttribute("onclick", "createModal(" + itemId.toString() + ")");
    let image = document.createElement("img");
    image.src = `${item.image_url}`;

    // let modal = createModal(item)
    divItem.appendChild(image);
    body.appendChild(modal);

    // ajouter chaque élément à la section
    track.appendChild(divItem);
  });

  // créer et ajouter la flèche à droite
  let rightArrow = document.createElement("a");
  rightArrow.classList.add("arrow__btn", "right-arrow");
  rightArrow.textContent = "›";
  rightArrow.id = id;
  console.log(typeof id);
  rightArrow.addEventListener("click", slideNext);
  carouselContainer.appendChild(rightArrow);
};

// fonction asynchrone qui charge les données de l'api afin de créer un carrousel
async function getMovieDetails(id, dict) {
  // récupère uniquement les pages 1 et 2 (seulement que les 7 films) de l'api
  dict.page = 1;
  console.log("calling page 1");
  let pageOne = await axios.get(root, {
    params: dict,
  });
  dict.page = 2;
  console.log("calling page 2");
  let pageTwo = await axios.get(root, {
    params: dict,
  });

  // les éléments sont tous les 5 films de la page 1 + 2 films de la page 2
  let items = pageOne.data.results.concat(pageTwo.data.results.slice(0, 2));
  console.log(items);
  createSection(items, id);
}

async function updateCarousel(root, carouselId) {
  try {
    const response = await axios.get(root);
    const data = response.data.results;
    const carouselData = [];

    // Format the data for the carousel
    data.forEach((item) => {
      carouselData.push({
        title: item.title,
        image: item.image_url,
        year: item.year,
        imdb: item.imdb_score,
      });
    });

    // Update the carousel with the new data
    const carousel = document.querySelector(`#${carouselId}`);
    const carouselInner = carousel.querySelector("carousel-container");

    // Clear the current items in the carousel
    carouselInner.innerHTML = "";

    // Add the new items to the carousel
    for (let i = 0; i < carouselData.length; i++) {
      const item = carouselData[i];
      const active = i === 0 ? "active" : "";

      const carouselItem = `
        <div class="carousel-item ${active}">
          <img src="${item.image}" class="d-block w-100" alt="${item.title}">
          <div class="carousel-caption d-none d-md-block">
            <h5>${item.title}</h5>
            <p>${item.year} | IMDB ${item.imdb}</p>
          </div>
        </div>
      `;

      carouselInner.insertAdjacentHTML("beforeend", carouselItem);
    }
  } catch (error) {
    console.error(error);
  }
}

// cette fonction récupère le film n°1 par imdb_score et affiche les informations
// dans le héros.
function getTopRatedMovies() {
  axios
    .get(root, {
      params: {
        sort_by: "-imdb_score",
      },
    })
    .then(function (response) {
      // obtenir le premier film
      let movieId = response.data.results[0].id;
      console.log(movieId);
      let target = root.concat(movieId);

      // une fois la promesse résolue, nous utilisons les données en réponse
      // pour créer le composant héros
      axios.get(target).then(function (response) {
        movie = response.data;
        console.log(movie.image_url);
        let title = document.createElement("h3");
        title.textContent = `${movie.title}`;
        let heroContent = document.getElementsByClassName("heroContent")[0];
        heroContent.appendChild(title);
        const hero = document.getElementsByClassName("hero")[0];
        hero.style.backgroundImage = "url(" + movie.image_url + ")";
        let button = document.createElement("button");
        button.textContent = "Info";
        button.setAttribute(
          "onclick",
          "createModal(" + movieId.toString() + ")"
        );
        heroContent.appendChild(button);
        let description = document.createElement("p");
        description.textContent = `${movie.long_description}`;
        heroContent.appendChild(description);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Appelle de toutes les fonctions pour afficher les données de l'API dans la page.

getTopRatedMovies();

getMovieDetails("bestMovies", {
  sort_by: "-imdb_score",
});

getMovieDetails("categorie1", {
  sort_by: "-imdb_score",
  genre_contains: "Animation",
});

getMovieDetails("categorie2", {
  sort_by: "-imdb_score",
  genre_contains: "Family",
});

getMovieDetails("categorie3", {
  sort_by: "-imdb_score",
  genre_contains: "Film-Noir",
});
