let accessToken =JSON.parse(localStorage.getItem("authToken"));

async function getPlaylistdata(id) {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=IN`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data = await res.json();
    console.log(data.playlists.items);
    appendData(data.playlists.items);
  } catch (error) {
    console.log(error);
  }
}

var id = localStorage.getItem("catID");
getPlaylistdata(id);

// function appendData(playlists){

// let gridContainer = document.getElementById("gridContainer")

// playlists.forEach(element => {

//     let div = document.createElement("div")
//     let name = document.createElement("h3")
//     name.textContent = element.name
//     let img = document.createElement("img")
//     img.src = element.images[0].url

//     div.append(name,img)
//     gridContainer.append(div)

// });

// }

function appendData(playlist) {
  let main = document.createElement("div");
  let playlists = document.createElement("div");
  playlists.className = "playlists";

  playlist.forEach((element) => {
    const div = document.createElement("div");

    const imgDiv = document.createElement("div");
    imgDiv.className = "imgDiv";
    const img = document.createElement("img");
    img.src = element.images[0].url;
    imgDiv.append(img);

    const playButtonDiv = document.createElement("span");
    playButtonDiv.className = "playButton";

    const playButton = document.createElement("img");
    playButton.src = "./77g-Wc3h_400x400-modified.png";
    playButtonDiv.append(playButton);
    imgDiv.append(playButtonDiv);

    const titleDiv = document.createElement("div");
    titleDiv.className = "title";
    const title = document.createElement("h2");
    title.textContent = element.name;
    titleDiv.append(title);
    const pDiv = document.createElement("div");
    pDiv.className = "description";
    const description = document.createElement("p");
    description.textContent = element.description;
    pDiv.append(description);
    div.append(imgDiv, titleDiv, pDiv);

    playlists.append(div);
    main.append(playlists);
  });
  document.getElementById("container").append(main);
}
