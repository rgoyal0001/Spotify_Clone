async function displaylikesong(){
    let owoner_name=localStorage.getItem("user_name")
    let owoner_name_p=document.getElementById("owoner_name")
    owoner_name_p.textContent=owoner_name
     
const playlistTrackId=[
    {
        trackId:"0mHU8dcIvGrGDazLMmQpSg",
        id:1
    },
    {
        trackId:"3oWxFNsXstcancCR1wODR4",
        id:2
    },
    {
        
        trackId:"5w0Xpt2YHT2Y3z3e4UUJP7"
        ,  id:3
    }
    ,
    {
        
        trackId:"3ZVKzrWt3efdPVLmiYdr6M"
        ,  id:4
    }
    ,
    {
        
        trackId:"3gnWw0LToxswxfC6Eb8GBp"
        ,  id:5
    }
]
owoner_name_p.textContent=owoner_name+"  ○ "+playlistTrackId.length+" Song"
playlistTrackId.forEach(ele => {
    fetchData(ele.trackId,ele.id)
});
}

async function fetchData(trackId,id){
   
        
    try {
        // const authToken= localStorage.getItem("authToken")
        const authToken="BQDfeQ4NKczEpw74WTrJcDiSLe1nkkKE5luQjeLQrY3z9joCiWLENZ5ND8lytp54JoIK2jubaAYZawwzQRs_NWOBJWMGqfrmF4k_L2fjmGKVC_WQutgSD3fETtHmLXBqN3IkIMfh2apJ0U4eTNJtyd9meiMC2lFc_dY"
      
        let res= await fetch(`https://api.spotify.com/v1/tracks/${trackId}`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        }
        
    })

        let data= await res.json();
    
        
        displayTracks(data,id);
       
      

    } catch (error) {
        console.log(error);
    }

}

var count=0
function displayTracks(track,id){
console.log(id);

    
   let display_song=document.getElementById("display_song")
let mainBox= document.createElement("div")
let count=document.createElement("p")
count.textContent=id
count.className="count"
mainBox.className="mainBox"
// count.textContent=id
count.className="likesong_id"
let imgBox= document.createElement("div");

let image=document.createElement("img");
image.src=track.album.images[0].url;

imgBox.append(image);
imgBox.className="imgBox"


let name=document.createElement("h3")
name.textContent=track.name;

let infoBox= document.createElement("div");

infoBox.className="infoBox"
let infoElement=document.createElement("p");
let info=""
track.artists.forEach(artist=>{
    info=info+artist.name+","
})

infoElement.textContent= info.slice(0,-1);

infoBox.append(name,infoElement);

let timeBox=document.createElement("div");
timeBox.className="timeBox"
timeBox.textContent=(track.duration_ms/60000).toFixed(2).toString().replace(".",":")  ;
// console.log(imgBox,infoBox,timeBox)
localStorage.setItem("infobox",infoBox)
let info_local=localStorage.getItem("info")?JSON.parse(localStorage.getItem("info")):[]
let obj={}
obj.title=name.textContent
info_local.push(obj)
console.log(info_local)
localStorage.setItem("info",JSON.stringify(info_local))
mainBox.append(count,imgBox,infoBox,timeBox)
display_song.append(mainBox);


}

displaylikesong()
async function appendlist(){
    try {
        let play_list_cont=document.getElementById('playlistdisplay')
        let res=await fetch(`http://localhost:3000/playlist`)
    let dataa=await res.json()
    dataa.forEach(e=>{
        let playlist_cont=document.getElementById("palylist_container")
let playlist=document.createElement("a")
        playlist.className=`playlistadd` 
        playlist.textContent=e.Number_of_play_list+e.id
        playlist_cont.append(playlist)
    })
    } catch (error) {
        console.log(error)
    }
}
appendlist()