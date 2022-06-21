// localStorage.setItem("authToken", JSON.stringify(""));

    

    let trackId = JSON.parse(localStorage.getItem("trackId"));
    setInterval(()=>{
        let newId = JSON.parse(localStorage.getItem("trackId"))
        if(newId!=trackId){
            trackId = newId;
            getMusic(newId)
        }
    },1000)
    let authToken = JSON.parse(localStorage.getItem("authToken"));
   
    let getMusic = async function (trackId) {
        // 
        console.log("playerTRackid",trackId)
        try {

            //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
            //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds


            let res = await fetch(`https://api.spotify.com/v1/albums/${trackId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            console.log("Player trackData",data);
            displayData(data)
            // displayData(data)
            // playlistsIds(data.categories.items);
        } catch (error) {
            console.log(error);
        }
    }
    getMusic(trackId);

    let trackImg = document.getElementById("trackImg");
    let title = document.getElementById("trackH3");
    let singerName = document.getElementById("singerName");
    let trackRange = document.getElementById("trackRange");
    let songTime = document.getElementById("songTimeing");
    let currentTime = document.getElementById("currentTimeing");
    let audio = document.getElementById("audio")

    let audioSrc = "https://p.scdn.co/mp3-preview/001c281b4ce4fd123f725726b559901e7d84c242?cid=774b29d4f13844c495f206cafdad9c86";
    function displayData(data) {
        audioSrc = data.tracks.items[0].preview_url;
        console.log( "displaydata mp3",data.tracks.items[0].preview_url)
        // ""
        // console.log(audioSrc)


        trackImg.src = data.images[2].url;
        title.textContent = data.name;
        singerName.textContent = data.artists[0].name;
        setTimeout(() => {
            trackRange.max = data.duration_ms / 1000;
            songTime.innerHTML = "00:30"
            // toMin(data.duration_ms)
            // console.log(toMin(data.duration_ms))
            // console.log(data.duration_ms / 1000)
            // data.duration_ms
        }, 300)
        playerPlay()
    }

    function toMin(num){
        let ms = num;
            min = Math.floor((ms / 1000 / 60) << 0),
            sec = Math.floor((ms / 1000) % 60);

        return min + ':' + sec;
    }
    setInterval(() =>{
        trackRange.value = audio.currentTime;
        if(parseInt(audio.currentTime) < 10){
            currentTime.innerHTML = "00:0"+parseInt(audio.currentTime);
        }else{
            currentTime.innerHTML = "00:"+parseInt(audio.currentTime);
        }
        // console.log(audio.currentTime,currentTime,toMin(audio.currentTime))
    },500)

    

    document.getElementById("playPouseButton").addEventListener("click", imgChange);
    function imgChange() {
        audio.src = audioSrc;
        let img = document.getElementById("pouseImg");
        if (img.src == "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png") {
            img.src = "https://icon-library.com/images/play-icon-png-transparent/play-icon-png-transparent-28.jpg";
        } else {
            
            img.src = "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png";
        }
        if (img.src == "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png") {
            audio.play();
        }

    }
    function playerPlay(){
        audio.src = audioSrc;
        let img = document.getElementById("pouseImg");
        img.src = "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png"
        audio.play()
    }
    // 
    
    // setTimeout();