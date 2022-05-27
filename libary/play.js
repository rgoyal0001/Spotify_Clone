async function playlist(){
    try {
        let play_list_cont=document.getElementById('playlistdisplay')
        let res=await fetch(`http://localhost:3000/playlist`)
    let dataa=await res.json()
    console.log(dataa)

    dataa.forEach(e => {
        let single_playlist=document.createElement("div")
        single_playlist.className="single_playlist"
        let imag_div=document.createElement("div")
        let song_img=document.createElement("img")
        song_img.src="music_logo.png"
        imag_div.className="song_img"
        imag_div.append(song_img)

        const playButtonDiv = document.createElement("span");
                playButtonDiv.className = "playButton";

                const playButton = document.createElement("button");
                playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>`;
                playButtonDiv.append(playButton);
                imag_div.append(playButtonDiv);
        let name_of_the_palylist=document.createElement("b")

        name_of_the_palylist.className="name_of_the_palylist"
        name_of_the_palylist.textContent=e.Number_of_play_list+e.id
        let owoner_name=document.createElement("p")
        owoner_name.className="owoner_name"
        let name=localStorage.getItem("user_name")
        console.log(name)
        owoner_name.textContent="By "+name
        single_playlist.append(imag_div,name_of_the_palylist,owoner_name)
play_list_cont.append(single_playlist)
    });
    } catch (error) {
        console.log(error)
    }
}
playlist()