



async function fetchTrackData(){ 
    let id= localStorage.getItem("trackID");
    // console.log(id)
    try {
        
        const authToken= localStorage.getItem("authToken")

        let res= await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        }
        
        })

        let data= await res.json();
        
        console.log(data)
        const albumInfo=JSON.parse(localStorage.getItem("albumInfo"));
        displayAlbumInfo(albumInfo)

        displayTrackData(data.items);

    } catch (error) {
        console.log(error);
    }
}

fetchTrackData()



function displayTrackData(tracks){

    tracks.forEach(track => {
        
        let mainBox= document.createElement("div")

        let numBox= document.createElement("div");

        let number=document.createElement("h4");
        number.textContent=track.track_number;

        numBox.append(number);

        let name=document.createElement("h3")
        name.textContent=track.name;

        let infoBox= document.createElement("div");

        let infoElement=document.createElement("p");
        let info=""
        track.artists.forEach(artist=>{
            info=info+artist.name+","
        })
       
        infoElement.textContent = info.slice(0,-1);

        infoBox.append(name,infoElement);

        let timeBox=document.createElement("div");
        timeBox.textContent=(track.duration_ms/60000).toFixed(2).toString().replace(".",":")  ;
        
        mainBox.append(numBox,infoBox,timeBox)

        document.querySelector("#title").append(mainBox)
        
        
    });

}


function displayAlbumInfo(album){
    console.log(album);

    let imgBox= document.createElement("div");

    let img=document.createElement("img");
    img.src=album.img[0].url;

    imgBox.append(img);

    let infoBox= document.createElement("div");
    
    if(album.artists.length>1){
        artistName= "Various Artist";
        
    }
    else{
        artistName=album.artists[0].name;
    }
    
    let artistImg=document.createElement("img");
    artistImg.src=album.img[0].url;


    let albumType=document.createElement("h2");
    albumType.textContent=album.albumType.toUpperCase();

    let name=document.createElement("h1");
    name.textContent=album.name;


    let info=document.createElement("span");
    info.textContent=`  ${ artistName} • ${album.release_date.substring(0,4)} • ${album.totalTracks} songs`;

    infoBox.append(albumType,name,artistImg,info);

    document.querySelector("#albumInfo").append(imgBox,infoBox)




    
}