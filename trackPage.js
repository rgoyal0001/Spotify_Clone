



async function fetchTrackData(){ 
    let id= localStorage.getItem("trackID");
    // console.log(id)
    try {
        
        const authToken= JSON.parse(localStorage.getItem("authToken"));

        let res= await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        }
        
        })

        let data= await res.json();
        
       
        const albumInfo=JSON.parse(localStorage.getItem("albumInfo"));
        displayAlbumInfo(albumInfo)

        displayTrackData(data.items);

        fetchSuggestion(data.items[0]);

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
        
        let breakLine = document.createElement("br");

        let optionButton=document.createElement("button");
        optionButton.textContent=" ··· "
        
        let optionBox1=document.createElement("div");
        let optionBox=document.createElement("div");
        let button1=document.createElement("button");
        button1.textContent="Add to queue"
        let button2=document.createElement("button");
        button2.textContent="Go to song radio";
        let button3=document.createElement("button");
        button3.textContent="Go to artist";
        let button4=document.createElement("button");
        button4.textContent="Go to album";
        let button5=document.createElement("button");
        button5.textContent="show credits";
        let button6=document.createElement("button");
        button6.textContent="Add to Playlist";

        button6.addEventListener("click",function(){
            console.log(track)
            hideOptions();
            addToPlaylist(track);

            async function addToPlaylist(track){
                console.log(track.id)
                try {
                    let body={
                        "trackId":track.id
                        
                    }
                    
                    console.log(body)
                    let res=await fetch(`http://localhost:3000/playlistTrackId`,{
                        method:"POST",
                        body:JSON.stringify(body),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })

              
                    // let res=await fetch(`http://localhost:3000/playlist`,{
                    //     method:"POST",
                    //     body:JSON.stringify(body),
                    // headers:{
                    //         "Content-Type":"application/json"
                    //     }
                        
                    // })

                    
                } catch (error) {
                    console.log(error);
                }
            }
        })
        let button7=document.createElement("button");
        button7.textContent="Open in Desktop app";

        
        
        // optionBox.append(button1,breakLine,button2,breakLine,button3,breakLine,button4,breakLine,button5,breakLine,button6,breakLine,button7)
        optionBox.append(button4,breakLine,breakLine,button6)

        optionBox1.append(optionBox)
        
        
    function hideOptions() {
        optionBox.style.display="none"
    }

    hideOptions();

    function showOptions() {
        optionBox.style.display="block"
    }

        optionButton.addEventListener("click",function(){
            showOptions()
        })

        mainBox.append(numBox,infoBox,timeBox,optionButton,optionBox1)

        document.querySelector("#title").append(mainBox)

    });

}

async function fetchSuggestion(trackData){
    

    try {
        const authToken= localStorage.getItem("authToken")
        let inputData=trackData.name;
      
        let res= await fetch(`https://api.spotify.com/v1/search?q=${inputData}&type=track%2Cartist&market=IN&limit=15&offset=5`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        }
        
        })

        let data= await res.json();
        // console.log(data.tracks.items);
        displaySuggestion(data.tracks.items);

      

    } catch (error) {
        console.log(error);
    }
}

function displaySuggestion(tracks){

    document.querySelector("#recommendedSongs").innerHTML=""

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

    let breakLine = document.createElement("br");

    let optionButton=document.createElement("button");
    optionButton.textContent=" ··· "
    
    let optionBox1=document.createElement("div");
    let optionBox=document.createElement("div");
    let button1=document.createElement("button");
    button1.textContent="Add to queue"
    let button2=document.createElement("button");
    button2.textContent="Go to song radio";
    let button3=document.createElement("button");
    button3.textContent="Go to artist";
    let button4=document.createElement("button");
    button4.textContent="Go to album";
    let button5=document.createElement("button");
    button5.textContent="show credits";
    let button6=document.createElement("button");
    button6.textContent="Add to Playlist";

    button6.addEventListener("click",function(){
        console.log(track)
        hideOptions();
        addToPlaylist(track);

            async function addToPlaylist(trackId){
                try {
                    let body={
                        "trackId":trackId,
                        
                    }
        
                    let res=await fetch(`http://localhost:3000/playlistTrackId`,{
                        method:"POST",
                        body:JSON.stringify(body),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            }
    })

    optionBox.append(button4,breakLine,breakLine,button6)

    optionBox1.append(optionBox)

            
    function hideOptions() {
        optionBox.style.display="none"
    }

    hideOptions();

    function showOptions() {
        optionBox.style.display="block"
    }

        optionButton.addEventListener("click",function(){
            showOptions()
        })
    mainBox.append(imgBox,infoBox,timeBox,optionButton,optionBox1)
    document.querySelector("#recommendedSongs").append(mainBox);

  });
}


function displayAlbumInfo(album){
   

    let imgBox= document.createElement("div");

    let img=document.createElement("img");
    img.src=album.img[0].url;

    imgBox.append(img);

    let infoBox= document.createElement("div");
    
    

    
    
    let albumTypeBox=document.createElement("div")
    let albumType=document.createElement("h2");
    albumType.textContent=album.albumType.toUpperCase();
    albumTypeBox.append(albumType);
    
    
    

    let nameBox=document.createElement("div")
    let name=document.createElement("h1");
    name.textContent=album.name;
    nameBox.append(name);
    
    let albumInfo=document.createElement("div");

    let artistImg=document.createElement("img");
    artistImg.src=album.img[0].url;

    if(album.artists.length>1){
        artistName= "Various Artist";
        
    }
    else{
        artistName=album.artists[0].name;
    }

    let info=document.createElement("span");
    info.textContent=`  ${ artistName} • ${album.release_date.substring(0,4)} • ${album.totalTracks} songs`;

    albumInfo.append(artistImg,info)

    infoBox.append(albumTypeBox,nameBox,albumInfo);

    document.querySelector("#albumInfo").append(imgBox,infoBox);

}

