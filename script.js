let currentPage = 2;
function getMovieListJSON() {
  let searchInput = document.querySelector(".searchInput").value;
  return fetch(
    `http://www.omdbapi.com/?s=${searchInput}&apikey=d7790324&page=${currentPage}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
function getSingleMovieJSON(Id) {
  return fetch(`http://www.omdbapi.com/?i=${Id}&apikey=d7790324`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
function movieListOnScreen() {
  getMovieListJSON()
    .then((i) => {
      for (let film of i.Search) {
        // console.log(film);
        oneMovieInListOnScreen(film);
      }
    })
    .then(() => {
      Array.from(document.querySelectorAll(".imageTemplate")).forEach((xxx) => {
        xxx.addEventListener("click", (event) =>
          movieDetailsModalOnScreen(event)
        );
      });
    });
}
function oneMovieInListOnScreen(film) {
  let template = `<div class="template">
  <img class="imageTemplate" dataId="${film.imdbID}" src="${film.Poster}">
  <h2 class="titleTemplate">${film.Title}</h2>
  <h3 class="yearTemplate">Type and Year: ${film.Type}, ${film.Year}</h3>
   
  </div>`;
  document.querySelector(".moviesList").innerHTML += template;
}
function movieDetailsModalOnScreen(event) {
  getSingleMovieJSON(event.target.attributes.dataId.value).then((film) => {
    document.querySelector(".popup").innerHTML = `
  <img class="imageTemplate" dataId="${film.imdbID}" src="${film.Poster}">
  <h2 class="titleTemplate">${film.Title}</h2>
  <h3 class="yearTemplate">Type and Year: ${film.Type}, ${film.Year}</h3>
   `;
    document.querySelector(".popup").classList.add("popup_opened");
    console.log(film);
  });
}
function searchUserButton() {}

document
  .querySelector(".searchButton")
  .addEventListener("click", movieListOnScreen);

// {Title: "The Godfather Family: A Look Inside", Year: "1990", Rated: "N/A", Released: "12 Jul 1990", Runtime: "73 min", …}
// Actors: "Francis Ford Coppola, Mario Puzo, Marlon Brando, James Caan"
// Awards: "N/A"
// BoxOffice: "N/A"
// Country: "USA"
// DVD: "N/A"
// Director: "Jeff Werner"
// Genre: "Documentary"
// Language: "English, Italian"
// Metascore: "N/A"
// Plot: "A documentary on the making of the three Godfather films, with interviews and recollections from the film makers and cast. This feature also includes the original screen tests of some of ..."
// Poster: "https://m.media-amazon.com/images/M/MV5BZTMyNzE0NWEtOGZjYi00ODU0LWE0OTItMzY5YTllYTcyYzgyXkEyXkFqcGdeQXVyODAyNDE3Mw@@._V1_SX300.jpg"
// Production: "N/A"
// Rated: "N/A"
// Ratings: (2) [{…}, {…}]
// Released: "12 Jul 1990"
// Response: "True"
// Runtime: "73 min"
// Title: "The Godfather Family: A Look Inside"
// Type: "movie"
// Website: "N/A"
// Writer: "David Gilbert"
// Year: "1990"
// imdbID: "tt0101961"
// imdbRating: "7.8"
// imdbVotes: "990"
