localStorage.setItem("authToken", JSON.stringify("BQBPWdYVSr_SZY0ExvR4xK7BSukLGDUiUDwlY2rqjtUlNxg2DFo6nVVY_xWgT3H9w4BqZuP6lGd6MvWAfiWMNKixjNTx1RFkhQcdIC-0REH9q9Z3F2xAG_59ToNaomhGbzG-SRv7-TdCsdxMIpmMC8pqCpQWq9ayuNA"));

    localStorage.setItem("trackId", JSON.stringify("7sRyejjZ7Ebkgo1sy6Gmfj"))

    let trackId = JSON.parse(localStorage.getItem("trackId"));
    let authToken = JSON.parse(localStorage.getItem("authToken"));

    let getMusic = async function (trackId) {
        console.log(trackId)
        try {

            //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
            //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds


            let res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=IN`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            console.log(data);
            displayData(data)
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

    let audioSrc = "";
    function displayData(data) {
        audioSrc ="https://p.scdn.co/mp3-preview/2c6ca43e20b7b02fe17d29ed44e88aea75596fee?cid=774b29d4f13844c495f206cafdad9c86";
        // console.log(audioSrc)


        trackImg.src = data.album.images[2].url;
        title.textContent = data.name;
        singerName.textContent = data.album.artists[0].name;
        setTimeout(() => {
            trackRange.max = data.duration_ms / 1000;
            songTime.innerHTML = toMin(data.duration_ms)
            // console.log(data.duration_ms / 1000)
            // data.duration_ms
        }, 300)
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
        // console.log(1)
        let img = document.getElementById("pouseImg");
        if (img.src == "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png") {
            img.src = "https://icon-library.com/images/play-icon-png-transparent/play-icon-png-transparent-28.jpg";
        } else {
            img.src = "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png";
        }
        ;
        audio.src = audioSrc;
        console.log(audioSrc)
        "https://p.scdn.co/mp3-preview/4e69d142cceaca1fa4bc8db7a319ab7a0b8ffd82?cid=774b29d4f13844c495f206cafdad9c86";
        if (img.src == "https://www.pngall.com/wp-content/uploads/5/Pause-Button-PNG-HD-Image.png") {
            audio.play();
        }

    }
    // setTimeout(imgChange) ;