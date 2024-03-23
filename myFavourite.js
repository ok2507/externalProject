//function to get local stroage favorite list
function getFavStorage() {
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
  }
  
  //Function to add favorite list in local list
  function setfavStorage(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem("favorite", dataString);
  }
  
  //function is call when user click on favorite button on homepage character card
  function updateMyFavorite(e) {
    let data = JSON.parse(e.getAttribute("data-character"));
    let MyfavoriteList = getFavStorage();
  
    // loop to check if the character is already in the fav list or not
    for (let character = 0; character < MyfavoriteList.length; character++) {
      if (MyfavoriteList[character].id == data.id) {
          MyfavoriteList.splice(character, 1);
        e.setAttribute("value", "Favorite");
        setfavStorage(MyfavoriteList);
        return;
      }
    }
    MyfavoriteList.push(data);
    setfavStorage(MyfavoriteList);
    e.setAttribute("value", "UnFavorite");
  }
  
  //function to display favorite list on add to favorite page
  function renderMyFavorite(MyfavoriteContainer) {
    // get my favorite list from local storage
    let myFavoriteList = getFavStorage();
    
    if(myFavoriteList.length > 0) {
      MyfavoriteContainer.innerHTML = "";
    }
    for (let character = 0; character < myFavoriteList.length; character++) {
      const { id, name, path } = myFavoriteList[character];
  
      // create a seperate div container for each character and append it to the parent node
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
      let detailsPath = `./superherodetails.html#${id}`;
      div.innerHTML = `
          <img class="poster" src=${path}.jpg alt="">
          <div class="card-body">
          <a href=${detailsPath}>${name}</a>
          <input type="button" value="Remove" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateMyFavorite(this)"/>
          </div>
      `;
      MyfavoriteContainer.appendChild(div);
    }
  }
  
  // render favorite page only if user visits on My favorite page
  let MyfavoriteContainer = document.getElementById('favorite-characters');
  if(MyfavoriteContainer != null) {
      renderMyFavorite(MyfavoriteContainer);
  }
