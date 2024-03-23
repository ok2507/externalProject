let charactersContainer = document.getElementById("superhero-div");

// fetch data function to fetch the data prom api
async function fetchData() {
  const response = await fetch(
    "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa"
  );
  const data = await response.json();
  return data;
}

// funtion to get local favorite characters 
function getFavStorage() {
  let data = JSON.parse(localStorage.getItem("favorite")) || [];
  return data;
}

fetchData()
  .then((data) => {
   
    let favoriteData = getFavStorage();
    let arr = data.data.results;
    charactersContainer.innerHTML = "";

    //loop to render the output on the screen
    for (let i = 0; i < arr.length; i++) {
      let favorite = "Favorite";

      //iterate to check character is already favorite or not
      for (let j = 0; j < favoriteData.length; j++) {
        if (arr[i].id == favoriteData[j].id) {
          favorite = "UnFavorite";
          break;
        }
      }

      // create a character div and append it to the container
      const { id, thumbnail, name } = arr[i];
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
  
      let path = `./superherodetails.html#${id}`; 
      div.innerHTML = `
        <img class="poster" src=${thumbnail.path}.jpg alt="">
        <div class="card-body">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateMyFavorite(this)"/>
        </div>
      `;
      charactersContainer.appendChild(div);
    }
  })
  .catch((Exception) => {
    console.error(Exception);
  });

// search functionality to search the superHero 
let searchButton = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");

//click event on search button to give the result from api
searchButton.addEventListener("click", () => {
  let query = searchBox.value;
  searchBox.value = "";

  let url = `https://gateway.marvel.com/v1/public/characters?name=${query}&ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;

  // fetch data to give the result based on the query provided by user
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let result = data.data.results[0];
      const { id, name, thumbnail } = result;

      //variable to store get local favorite character list from local storage 
      let favoriteData = getFavStorage();

      let favorite = "favorite";
      // iterate to check the character is already added to favorite or not
      for (let j = 0; j < favoriteData.length; j++) {
        if (result.id == favoriteData[j].id) {
          favorite = "UnFavorite";
          break;
        }
      }

      searchResult.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.innerText = "Search Results :";
      searchResult.appendChild(h2);

      // Creating a charachter div
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
      let path = `./superherodetails.html#${id}`;
      div.innerHTML = `
        <img class="poster" src=${thumbnail.path}.jpg alt="">
        <div class="card-body">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateMyFavorite(this)"/>
        </div>
      `;
      searchResult.appendChild(div);
    })
    .catch((Exception) => {
      console.error(Exception);
    });
});
