var count = 0;
// document.getElementById("create_playlist").addEventListener("click",(e)=>{
//     e.preventDefault()
//     addplaylist(e)

// })
async function addplaylist() {
  // event.preventDefault()

  count++;
  // let pp=document.createElement("p")
  let pp = `My Playlist #`;
  try {
    let body = {
      Number_of_play_list: pp,
    };
    // console.log(body)
    let res = await fetch(`http://localhost:3000/playlist`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res)
    let data = await res.json();
    console.log(data);
    storinjson(event);
  } catch (error) {
    console.log("error");
  }
}
storinjson();
async function storinjson() {
  // event.preventDefault()

  // console.log(data)
  try {
    let playlist_cont = document.getElementById("palylist_container");
    playlist_cont.innerHTML = "";

    let res = await fetch(`http://localhost:3000/playlist`);
    let dataa = await res.json();
    console.log(dataa);
    dataa.forEach((ele) => {
      let playlist = document.createElement("a");
      playlist.className = `playlistadd`;

      playlist.textContent = ele.Number_of_play_list + ele.id;
      playlist_cont.append(playlist);
    });
  } catch (error) {
    console.log(error);
  }
}
