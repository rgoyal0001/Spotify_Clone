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
playlistTrackId.forEach(ele => {
    fetchData(ele.trackId,ele.id)
});
}

async function fetchData(trackId,id){
   
        
    try {
        // const authToken= localStorage.getItem("authToken")
        const authToken="BQC8kGYRr5PEDmtelgfW_9CsB93Vd9RaYyf2VdJQHorYS5-u7v6rI7E4sHReLgBs0gwuNPJktOwxTBuN_JoTQNWyhXchNEAtwcmGdz7BEDQxjQhq95lPfNPlIc_7_M4IID-JWFUk31E_tbDerOAcXiPxN13pEurBYlU"
      
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
console.log(track);
// document.querySelector("#title").innerHTML=""

// tracks.forEach(track => {

let mainBox= document.createElement("div")
// let count=document.createElement("p")
// count.textContent=id
count.className="likesong_id"
let imgBox= document.createElement("div");

let image=document.createElement("img");
image.src=track.album.images[0].url;

imgBox.append(image);


let name=document.createElement("h3")
name.textContent=track.name;

let infoBox= document.createElement("div");

let infoElement=document.createElement("p");
let info=""
track.artists.forEach(artist=>{
    info=info+artist.name+","
})

infoElement.textContent= info.slice(0,-1);

infoBox.append(name,infoElement);

let timeBox=document.createElement("div");
timeBox.textContent=(track.duration_ms/60000).toFixed(2).toString().replace(".",":")  ;
// console.log(imgBox,infoBox,timeBox)
mainBox.append(count,imgBox,infoBox,timeBox)
document.querySelector("#title").append(mainBox);

}

displaylikesong()