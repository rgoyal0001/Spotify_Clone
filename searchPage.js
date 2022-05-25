

let timerId;
function debounce(fetchData,delay)
{
    if(timerId) clearTimeout(timerId);

    timerId=setTimeout(() => {
        let input= document.querySelector("#inputSearch").value;

        fetchData(input);
 
    }, delay);
}


async function fetchData(inputData){

    try {
        
        const authToken= "BQD0_CPssYym8dxZr8SCN9_IIm31mlL9SODxnuxZBGgKlzRxUKGp6e6kUSBlxGz1XnZ-lU6eTd92PfWN3zwl4XFlSIADFa80dbBtJ9zZdRG6gMhcPFyBowNxx3oM_LX_mTfgEdUWJYmOX9m1JNfcfrvcWdFB4BjRjrI"

        let res= await fetch(`https://api.spotify.com/v1/search?q=${inputData}&type=track,artist,album,playlist,episode%2Cartist&market=IN&limit=6&offset=5`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        }
        
        })

        let data= await res.json();


        // console.log(data);
        let { artists ,tracks,albums,playlists,episodes}=data

        
        displayArtists(artists.items);

        displayAlbum(albums.items);
        
        displayPlaylist(playlists.items)
        
        displayEpisodes(episodes.items)
        
        console.log(tracks.items[0])
        displayTopResult(tracks.items[0])

        displaySong(tracks.items)
        // displayTracks(tracks.items)

    } catch (error) {
        console.log(error);
    }

    


}

function displayArtists(artists){
    document.querySelector("#artists").innerHTML="";

    
    artists.forEach((artist) => {
        
        let box= document.createElement("div");

        let image=document.createElement("img");
        image.src=artist.images[0].url;

        let name=document.createElement("h3")
        name.textContent=artist.name;

        let type=document.createElement("p")
        type.textContent=artist.type.charAt(0).toUpperCase() + artist.type.slice(1);

        box.append(image,name,type);

        document.querySelector("#artists").append(box)
    });
}


function displayAlbum(albums){

    document.querySelector("#albums").innerHTML="";

    
    albums.forEach(album => {
        
        

        let box= document.createElement("div");

        let image=document.createElement("img");
        image.src=album.images[0].url;

        let name=document.createElement("h3")
        name.textContent=album.name;

        let release_date=album.release_date;

        let info=document.createElement("p")
        info.textContent=`${release_date.substring(0,4)} • ${album.artists[0].name}`;

        box.append(image,name,info);

        document.querySelector("#albums").append(box)
    });

}


function displayPlaylist(playlists){


    document.querySelector("#playlists").innerHTML="";

    
    playlists.forEach(playlist => {
        
        

        let box= document.createElement("div");

        let image=document.createElement("img");
        image.src=playlist.images[0].url;

        let name=document.createElement("h3")
        name.textContent=playlist.name;

        let owner=document.createElement("p")
        owner.textContent="by "+ playlist.owner.display_name;

        box.append(image,name,owner);

        document.querySelector("#playlists").append(box)
    });

}


function displayEpisodes(episodes){
    document.querySelector("#episodes").innerHTML="";

    episodes.forEach(episode => {
        
        let box= document.createElement("div");

        let image=document.createElement("img");
        image.src=episode.images[0].url;

        let name=document.createElement("h3")
        name.textContent=episode.name;

        let release_date=episode.release_date;

        let info=document.createElement("p")
        info.textContent=` ${release_date.substring(0,4)} •	 ${Math.floor(episode.duration_ms/60000) } MIN `;

        box.append(image,name,info);

        document.querySelector("#episodes").append(box)
    });
}

function  displayTopResult(track){
    document.querySelector("#topResult").innerHTML="";

    let { album:{name},album:{images},artists }=track;

    let box= document.createElement("div");

    let imageElement= document.createElement("img");
    imageElement.src=images[0].url

    let nameElement= document.createElement("h1");
    nameElement.textContent=name;

    let infoElement=document.createElement("p");
    let info=""
    artists.forEach(artist=>{
        info=info+artist.name+","
    })
    const space=""
    infoElement.textContent= info.slice(0,-1)+"   "  +track.type.toUpperCase();
   
    box.append(imageElement,nameElement,infoElement);

    document.querySelector("#topResult").append(box);
    
    
}

function displaySong(tracks){
    console.log(tracks)
    document.querySelector("#songs").innerHTML="";
    let count=0;
    tracks.forEach(track => {
        
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
        console.log(track.duration_ms)
        mainBox.append(imgBox,infoBox,timeBox)

        count++;
        
        if(count<=4)
        {
            document.querySelector("#songs").append(mainBox)
            // break;
        }
    });
}
