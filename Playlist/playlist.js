const playlistTrackId=[
    {
        trackId:"0mHU8dcIvGrGDazLMmQpSg"
    },
    {
        trackId:"3oWxFNsXstcancCR1wODR4"
    },
    {
        
        trackId:"5w0Xpt2YHT2Y3z3e4UUJP7"
    }
]

playlistTrackId.forEach(track=>{
   
    fetchData(track.trackId)

})

let flag=true;
async function fetchData(trackId){
   
        
        try {
            const authToken= localStorage.getItem("authToken")
            
          
            let res= await fetch(`https://api.spotify.com/v1/tracks/${trackId}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
            
        })
    
            let data= await res.json();
            // console.log(data.tracks.items);
            
            displayTracks(data);
            // console.log(data);


            if(flag){
                displayAlbumInfo(data)
                flag=false;
            }
          
    
        } catch (error) {
            console.log(error);
        }
 
}

function displayTracks(track){
    console.log(track);
    // document.querySelector("#title").innerHTML=""

    // tracks.forEach(track => {
   
    let mainBox= document.createElement("div")

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

    mainBox.append(imgBox,infoBox,timeBox)
    document.querySelector("#title").append(mainBox);

}

function displayAlbumInfo(track){

    // console.log(track);

    let imgBox= document.createElement("div");

    let img=document.createElement("img");
    img.src=track.album.images[0].url;

    imgBox.append(img);

    let infoBox= document.createElement("div");

    let albumTypeBox=document.createElement("div")
    let albumType=document.createElement("h2");
    albumType.textContent="PLAYLIST";
    albumTypeBox.append(albumType);

    let nameBox=document.createElement("div")
    let name=document.createElement("h1");
    name.textContent="My Playlist";
    nameBox.append(name);

    let albumInfo=document.createElement("div");
    let info=document.createElement("span");
    info.textContent=`${playlistTrackId.length} songs `;

    infoBox.append(albumTypeBox,nameBox,albumInfo);

    document.querySelector("#playlistInfo").append(imgBox,infoBox);

}