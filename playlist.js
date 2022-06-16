
let accessToken =
  "BQDnJiYxujxeVm4g5FRjaj-yuGqHEYzLkOwlyFdAnzgFpudt60ydnFICYhUrBC8-FTnycedft3KOuYeLft1-rUYapHTNAr02-XoPX7pPMTOl7jA4kMwffP8ogVldEFUdbet6hkKAytm_ZzDAZSiZKBFOOUdf4SgnJFyoHrIaaSAhKdkfIIiB87wJJaJd8fYZs7un";
=======
let accessToken = "BQCWYZya-LkmBKs0BnaKVsws0SIwRn-qJWeLvnWqRNA-d94y8-bq_zDt2i3qJ0XSilFkZn0XjjZne5MwgO5fLkP0gipg6diMgAf7XNZd99l6mHUCZ30ns1IKYBidBkYne1UxfFqLgHZEkPdf8OgP6oVGU1Vsv9qmZgc"


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

var loc = localStorage.getItem("cat")
var cat = loc.split(",")
let id = cat[0]
getPlaylistdata(id)

let cat_name = cat[1]
document.getElementById("categoryheader").textContent = cat_name



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
