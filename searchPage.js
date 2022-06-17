let timerId;
function debounce(fetchData, delay) {
  if (timerId) clearTimeout(timerId);
  let input = document.querySelector("#inputSearch").value;

  fetchData(input);

  timerId = setTimeout(() => {}, delay);
}

let input = localStorage.getItem("searchInput");

fetchData(input);

async function fetchData(inputData) {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    // const authToken= "BQDS9iZ37Rlc2Sigj7SsZ4o84e1tUqbtV8WMRxxPnx4LViiqNeI0VBOXNKWUQR9f8_650jv-PS2l-88orDxZ5R0V6NgWzDuCyVWGBB7k-NY7U7g9hG5HCXnaDk1yZClxPoYUx5DF1S6EvDItMmvXw6ivdTzsZ8CcgJEtBDmP0nprv8rvHPl_mIZIruaRAI7ZIRAV"

    console.log(authToken);
    let res = await fetch(
      `https://api.spotify.com/v1/search?q=${inputData}&type=track,artist,album,playlist,episode%2Cartist&market=IN&limit=6&offset=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    let data = await res.json();

    // console.log(data);
    let { artists, tracks, albums, playlists, episodes } = data;

    displayArtists(artists.items);

    displayAlbum(albums.items);

    displayPlaylist(playlists.items);

    displayEpisodes(episodes.items);

    displayTopResult(tracks.items[0]);

    displaySong(tracks.items);
    // displayTracks(tracks.items)
  } catch (error) {
    console.log(error);
  }
}

function displayArtists(artists) {
  document.querySelector("#artists").innerHTML = "";

  artists.forEach((artist) => {
    let box = document.createElement("div");

    let image = document.createElement("img");
    image.src = artist.images[0].url;

    let nameDiv = document.createElement("div");

    let name = document.createElement("h3");
    name.textContent = artist.name;
    nameDiv.append(name);

    let type = document.createElement("p");
    type.textContent =
      artist.type.charAt(0).toUpperCase() + artist.type.slice(1);

    box.append(image, nameDiv, type);

    document.querySelector("#artists").append(box);
  });
}

function displayAlbum(albums) {
  document.querySelector("#albums").innerHTML = "";

  albums.forEach((album) => {
    let box = document.createElement("div");

    box.addEventListener("click", function () {
      console.log(album);
      function AlbumInfo(
        images,
        name,
        release_date,
        albumType,
        total_tracks,
        artists
      ) {
        this.img = images;
        this.name = name;
        this.release_date = release_date;
        this.albumType = albumType;
        this.totalTracks = total_tracks;
        this.artists = artists;
      }

      let { images, name, release_date, album_type, total_tracks, artists } =
        album;
      // console.log(images,name,release_date)
      let albumInfo = new AlbumInfo(
        images,
        name,
        release_date,
        album_type,
        total_tracks,
        artists
      );
      console.log(albumInfo);
      localStorage.setItem("albumInfo", JSON.stringify(albumInfo));

      localStorage.setItem("trackID", album.id);
      window.location.href = "trackPage.html";
      // console.log()
    });

    let image = document.createElement("img");
    image.src = album.images[0].url;

    let name = document.createElement("h3");
    name.textContent = album.name;

    let release_date = album.release_date;

    let info = document.createElement("p");
    info.textContent = `${release_date.substring(0, 4)} • ${
      album.artists[0].name
    }`;

    box.append(image, name, info);

    document.querySelector("#albums").append(box);
  });
}

function displayPlaylist(playlists) {
  document.querySelector("#playlists").innerHTML = "";

  playlists.forEach((playlist) => {
    let box = document.createElement("div");

    let image = document.createElement("img");
    image.src = playlist.images[0].url;

    let name = document.createElement("h3");
    name.textContent = playlist.name;

    let owner = document.createElement("p");
    owner.textContent = "by " + playlist.owner.display_name;

    box.append(image, name, owner);

    document.querySelector("#playlists").append(box);
  });
}

function displayEpisodes(episodes) {
  document.querySelector("#episodes").innerHTML = "";

  episodes.forEach((episode) => {
    let box = document.createElement("div");

    let image = document.createElement("img");
    image.src = episode.images[0].url;

    let name = document.createElement("h3");
    name.textContent = episode.name;

    let release_date = episode.release_date;

    let info = document.createElement("p");
    info.textContent = ` ${release_date.substring(0, 4)} •	 ${Math.floor(
      episode.duration_ms / 60000
    )} MIN `;

    box.append(image, name, info);

    document.querySelector("#episodes").append(box);
  });
}

function displayTopResult(track) {
  document.querySelector("#topResult").innerHTML = "";

  let {
    album: { name },
    album: { images },
    artists,
  } = track;

  let box = document.createElement("div");

  let imageElement = document.createElement("img");
  imageElement.src = images[0].url;

  let nameElement = document.createElement("h1");
  nameElement.textContent = name;

  let infoElement = document.createElement("p");
  let info = "";
  artists.forEach((artist) => {
    info = info + artist.name + ",";
  });
  const space = "";
  infoElement.textContent =
    info.slice(0, -1) + "   " + track.type.toUpperCase();

  box.append(imageElement, nameElement, infoElement);

  document.querySelector("#topResult").append(box);
}

function displaySong(tracks) {
  document.querySelector("#songs").innerHTML = "";
  let count = 0;
  tracks.forEach((track) => {
    let mainBox = document.createElement("div");

    let imgBox = document.createElement("div");

    let image = document.createElement("img");
    image.src = track.album.images[0].url;

    imgBox.append(image);

    let name = document.createElement("h3");
    name.textContent = track.name;

    let infoBox = document.createElement("div");

    let infoElement = document.createElement("p");
    let info = "";
    track.artists.forEach((artist) => {
      info = info + artist.name + ",";
    });

    infoElement.textContent = info.slice(0, -1);

    infoBox.append(name, infoElement);

    let timeBox = document.createElement("div");
    timeBox.textContent = (track.duration_ms / 60000)
      .toFixed(2)
      .toString()
      .replace(".", ":");

    mainBox.append(imgBox, infoBox, timeBox);

    count++;

    if (count <= 4) {
      document.querySelector("#songs").append(mainBox);
      // break;
    }
  });
}
