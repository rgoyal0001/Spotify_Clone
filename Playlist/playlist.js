// const playlistTrackId=[
//     {
//         trackId:"0mHU8dcIvGrGDazLMmQpSg"
//     },
//     {
//         trackId:"3oWxFNsXstcancCR1wODR4"
//     },
//     {
        
//         trackId:"5w0Xpt2YHT2Y3z3e4UUJP7"
//     }
// ]
async function getid(){
    try {
        
        let res=await fetch(`http://localhost:3000/playlistTrackId`)
        let data=await res.json()
        // console.log(data)
 

data.forEach(track=>{
   
    fetchData(track.trackId)

})
} catch (error) {
    console.log(error)
}
}

let flag=true;
getid()
async function fetchData(trackId){
   
        
        try {
            // const authToken= localStorage.getItem("authToken")
            const authToken="BQDWOX8h3e0EBrtceHYtRlWX4b9o7dDv4TcergFImb6h3-SlI6b3gL1DWsVCYmow8FDOAgHa-XJnFzR3XTGd7cpHUebI6bRMDELto498vtNRZRQWdmnZ0XhvQBTRx3EoLITjiuIIGgAfhQeBO_zht62tt0Ioe1AsYpY"
          
            let res= await fetch(`https://api.spotify.com/v1/tracks/${trackId}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
            
        })
    
            let data= await res.json();
            // console.log(data.tracks.items);
            // displayTracks(data);
            // console.log(data);

            // if(flag){
                
            //     flag=false;
            // }
          
    
        } catch (error) {
            console.log(error);
        }
 
}

function displayTracks(track){
    // console.log(track);
    // document.querySelector("#title").innerHTML=""

    // tracks.forEach(track => {
   let song_cont=document
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
    // console.log(imgBox,infoBox,timeBox)
    mainBox.append(imgBox,infoBox,timeBox)
    document.querySelector("#title").append(mainBox);

}

function displayAlbumInfo(track){

    console.log(track);

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

    // let albumInfo=document.createElement("div");
    // let info=document.createElement("span");
    // info.textContent=`${playlistTrackId.length} songs `;
// console.log(albumTypeBox,nameBox)

    infoBox.append(albumTypeBox,nameBox);
    
    playlistinfo.append(infoBox)

    // document.querySelector("#playlistInfo").append(imgBox,infoBox);

}