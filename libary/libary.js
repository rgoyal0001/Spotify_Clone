async function playlist(){
    try {
        let play_list_cont=document.getElementById('playlistdisplay')
        let res=await fetch(`http://localhost:3000/playlist`)
    let dataa=await res.json()
    // console.log(dataa)

    dataa.forEach(e => {

        let single_playlist=document.createElement("div")
        single_playlist.className="single_playlist"
        let imag_div=document.createElement("div")
        let song_img=document.createElement("img")
        song_img.className="song_img"
        let url=localStorage.getItem("song_img_dis")
        if(url){

            song_img.src=url
        }
        else{
            
            song_img.src="music_logo.png"
        }
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
let playlist_cont=document.getElementById("palylist_container")
let playlist=document.createElement("a")
        playlist.className=`playlistadd` 
        playlist.textContent=e.Number_of_play_list+e.id
        playlist_cont.append(playlist)
    });
    } catch (error) {
        console.log(error)
    }
}
playlist()

function likesong_cont(){
    let like_song=JSON.parse(localStorage.getItem("info"))
    console.log(like_song)
    let likeson_title=document.getElementById("nameoflikesong_disply")
    var str=""
    like_song.forEach(e=>{
str+=e.title+" . "
    })
    let song_name=document.createElement("b")
    song_name.textContent=str
    // likeson_title.append(song_name)

}
likesong_cont()
async function playlistdisplay(){
    try {
        
        let res=await fetch(`http://localhost:3000/playlistTrackId`)
        let dataa=await res.json()
        // console.log(dataa)
        dataa.forEach(e=>{
            getsong(e.trackId)
        })
    }catch(error){
console.log(error)
    }
}
playlistdisplay()
async function getsong(trackID){
    let song_id=trackID
    console.log(song_id)
    try {
        const token="BQDfeQ4NKczEpw74WTrJcDiSLe1nkkKE5luQjeLQrY3z9joCiWLENZ5ND8lytp54JoIK2jubaAYZawwzQRs_NWOBJWMGqfrmF4k_L2fjmGKVC_WQutgSD3fETtHmLXBqN3IkIMfh2apJ0U4eTNJtyd9meiMC2lFc_dY"
     let res= await fetch(`https://api.spotify.com/v1/tracks/${song_id}`,{
     method:"GET",
     headers:{
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
     }
     
     })
     let song=await res.json()
    //  console.log(song)
    //  let img_display=document.getElementsByClassName("song_img")
    //  img_display.src="song.album.images[0].url"
    //  img_display
    // console.log(song.album.images[0].url)
    // return song.album.images[0].url
    // playlist(song.album.images[0].url)
    
        // let img_display=document.getElementsByClassName("song_img")
        img_display=song.album.images[0].url
        localStorage.setItem("song_img_dis",img_display)
    
    } catch (error) {
        console.log(error)
    }
    
 
}
function gotolikepage(){
    location.href="../likepage/like_page.html"
}