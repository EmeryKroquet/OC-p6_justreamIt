// the main endpoint of the api
const root = "http://localhost:8000/api/v1/titles/";

const body = document.body;

// Code for the Modal

const modal = document.getElementById("itemModal");
const closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function () {
  console.log("close");
  modal.style.display = "none";
  modalContent = modal.querySelector(".modal-content");
  textArea = modalContent.querySelector(".textArea");
  textArea.innerHTML = "";
};

//Carousel

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

// API JS

const createModal = async (itemId) => {
  let target = root.concat(itemId);
  // await for the response on the specific endpoint of the movie
  response = await axios.get(target);
  modalContent = modal.querySelector(".modal-content");
  textArea = modalContent.querySelector(".textArea");
  // get the data from the response
  // populate the modal with the relevant data
  let item = response.data;
  let image = document.createElement("img");
  image.src = `${item.image_url}`;
  textArea.appendChild(image);

  let title = document.createElement("h1");
  title.textContent = `${item.title}`;
  textArea.appendChild(title);

  let genres = document.createElement("p");
  genres.textContent = `Genres: ${item.genres}`;
  textArea.appendChild(genres);

  let releaseDate = document.createElement("p");
  releaseDate.textContent = `Release Date: ${item.date_published}`;
  textArea.appendChild(releaseDate);

  let year = document.createElement("p");
  year.textContent = `${item.year}`;
  textArea.appendChild(textContent);

  let rated = document.createElement("p");
  rated.textContent = `Rated: ${item.rated}`;
  textArea.appendChild(rated);

  let imdbScore = document.createElement("p");
  imdbScore.textContent = `IMDB Score: ${item.imdb_score}`;
  textArea.appendChild(imdbScore);

  let directors = document.createElement("p");
  directors.textContent = `Director: ${item.directors}`;
  textArea.appendChild(directors);

  let actors = document.createElement("p");
  actors.textContent = `Actors: ${item.actors}`;
  textArea.appendChild(actors);

  let duration = document.createElement("p");
  duration.textContent = `Duration: ${item.duration} mins`;
  textArea.appendChild(duration);

  let country = document.createElement("p");
  country.textContent = `Country: ${item.countries}`;
  textArea.appendChild(country);

  let boxOffice = document.createElement("p");
  boxOffice.textContent = `Box Office: ${item.budget_currency} ${item.worldwide_gross_income}`;
  textArea.appendChild(boxOffice);

  let summary = document.createElement("p");
  summary.textContent = `Summary: ${item.long_description}`;
  textArea.appendChild(summary);

  // once all the data is parsed in the modal
  // display the modal
  modal.style.display = "block";
};

const createSection = (items, id) => {
  // get the carousel with the matching id
  let carouselContainer = document.getElementById(id);
  console.log("carouselContainer: " + carouselContainer);
  let carouselInner =
    carouselContainer.getElementsByClassName("carousel-inner")[0];
  let track = carouselInner.getElementsByClassName("track")[0];
  track.id = id;
  track.index = 0;
  // create the arrow left
  let leftArrow = document.createElement("a");
  leftArrow.classList.add("arrow__btn", "left-arrow");
  leftArrow.textContent = "‹";
  leftArrow.id = id;
  leftArrow.addEventListener("click", slidePrev);
  carouselContainer.appendChild(leftArrow);
  // for each item we got from the api response, create the item
  // and append it to the carousel
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
    // append each item to the section
    track.appendChild(divItem);
  });
  // create and append the arrow right
  let rightArrow = document.createElement("a");
  rightArrow.classList.add("arrow__btn", "right-arrow");
  rightArrow.textContent = "›";
  rightArrow.id = id;
  console.log(typeof id);
  rightArrow.addEventListener("click", slideNext);
  carouselContainer.appendChild(rightArrow);
};

// async function that loads the data from the api in order to create a carousel
async function loadCarousel(id, dict) {
  // gets page 1 and 2 only (need only 7 movies) from the api
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
  // items are all 5 movies of pageOne + 2 movies of pageTwo
  let items = pageOne.data.results.concat(pageTwo.data.results.slice(0, 2));
  console.log(items);
  createSection(items, id);
}

// this function gets the #1 movie by imdb_score and show the relevant
// information in the hero
function getBestMovie() {
  axios
    .get(root, {
      params: {
        sort_by: "-imdb_score",
      },
    })
    .then(function (response) {
      // get the first movie
      let movieId = response.data.results[0].id;
      console.log(movieId);
      let target = root.concat(movieId);
      // once the promise is resolved, we use the data in response
      // to create the hero component
      axios.get(target).then(function (response) {
        movie = response.data;
        console.log(movie.image_url);
        let title = document.createElement("h1");
        title.textContent = `${movie.title}`;
        let heroContent = document.getElementsByClassName("heroContent")[0];
        heroContent.appendChild(title);
        const hero = document.getElementsByClassName("hero")[0];
        hero.style.backgroundImage = "url(" + movie.image_url + ")";
        let button = document.createElement("button");
        button.textContent = "Plus d'Info";
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

// Calls all the functions to display the data from the api in the page

getBestMovie();

loadCarousel("bestMovies", {
  sort_by: "-imdb_score",
});

loadCarousel("bestBiographies", {
  sort_by: "-imdb_score",
  genre_contains: "Biography",
});

loadCarousel("bestOfComedy", {
  sort_by: "-imdb_score",
  genre_contains: "Comedy",
});

loadCarousel("bestOfDrama", {
  sort_by: "-imdb_score",
  genre_contains: "Drama",
});
