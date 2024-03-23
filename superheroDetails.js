window.onload = function () {
    let CharachterDetails = document.getElementById("characterWrapper");
  
  
    let windowurl = window.location.href;
    let id = windowurl.substring(windowurl.lastIndexOf("#") + 1) || 1017100;
  
    // to get the character details from api
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data.results);
        let character = data.data.results[0];
        const {name, description, thumbnail} = character;
        let div = document.createElement("div");
        div.classList.add("character-info-container");
  
        div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info">
            <h3>${name}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
        CharachterDetails.innerHTML = "";
        CharachterDetails.appendChild(div);
      })
      .catch((Exception) => {
        console.log(Exception);
      });
  
    //to result superhero related comics
    let comicsDetails = document.getElementById("comics");
    comicsDetails.innerHTML = "";
    url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let comics = res.data.results;
        // iterate over all the comics and render it on browser
        for (let comic of comics) {
          const { title, thumbnail, description } = comic;
          let div = document.createElement("div");
          div.classList.add("character-info-container");
  
          div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info">
            <h3>${title}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
        comicsDetails.appendChild(div);
        }
      })
      .catch((Exception) => {
        console.error(Exception);
      })
  };