const sliders = document.querySelector("carouselbox");
var scrollperclick;
var ImagePadding = 20;

showMovieData();

async function showMovieData() {
  const url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";

  //const url = +apiUrl + "?sort_by=-imbd_score";
  var result = await axios.get(url);
  console.log(result);

  result = result.data.results;
  result.map(function (cur, index) {
    sliders.insertAdjacentHTML(
      "beforeend",
      `<img class="img-${index} slider-img src="${cur.image_url}"> `
    );
  });
  scrollperclick = document.querySelector(".img-1").clientWidth + ImagePadding;
}
