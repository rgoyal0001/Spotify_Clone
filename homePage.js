let authToken = "BQDxEG1zmh_hNX2d4sNm-RQPZgUDHje-WWVjoUi5_u_ldX0C6j3k2eWsfsYNAPgemg-6mXBfSXsIbX7Yqbo-3UmqLB5xCYBQcEA6ChU2OQHGOR-cFXjmSBmuiqlKurW0e6jAWpJ8BDsAtU4RmoUB9splJfddQdYD45WQpZFugmGyeJo6pQkE";

    let getCategroies = async function () {
        try {

            //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
            //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds


            let res = await fetch(`https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            console.log(data);
            playlistsIds(data.categories.items);
        } catch (error) {
            console.log(error);
        }
    }
    getCategroies();

    function playlistsIds(data) {
        data.forEach(categories => {
            let categorie = categories.id;
            getPlaylist(categorie);

        });
    }

    let getPlaylist = async function (categorie) {
        try {
            

            //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
            //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds

            let res = await fetch(`https://api.spotify.com/v1/browse/categories/${categorie}/playlists?country=IN&limit=20&offset=5`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            if (!data.error) {
                // console.log(categorie)
                console.log(data);
                appendData(data.playlists.items);
            }
        } catch (error) {
            console.log(error);
        }
    }

    let getGonre = async function () {
        try {
            let res = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            console.log(data);
            localStorage.setItem("genre", JSON.stringify(data.genres))
            // console.log(data.categories.items)
            // playlistsIds(data.categories.items);
        } catch (error) {
            console.log(error);
        }
    }
    getGonre()
    let genres = JSON.parse(localStorage.getItem("genre"));
    let i = 0;





    const appendData = function (gotData) {
        // console.log(1)
       
        // console.log(a,gotData)
        if (gotData.length !== 0) {

            let main = document.createElement("div");

            let genreAndButton = document.createElement("div");
            genreAndButton.className = "genre";
            let genre = document.createElement("h1");
            genre.textContent = genres[i];
            i++
            // console.log(2)
            let seeAllButtonDiv = document.createElement("div");
            genreAndButton.append(genre);
            let seeAllButton = document.createElement("button");
            seeAllButton.className = "showAll";
            seeAllButton.onclick = "storeId()";
            seeAllButton.textContent = "SEE ALL";
            seeAllButtonDiv.append(seeAllButton);
            genreAndButton.append(seeAllButtonDiv);
            seeAllButton.addEventListener('click', () => {
                localStorage.setItem("seeAllData",JSON.stringify(gotData));
                console.log("hello")
                location.href = "./seeAll.html";
            })
            // console.log(1)
            main.append(genreAndButton);

            let playlists = document.createElement("div")
            playlists.className = "playlists";
            console.log(gotData);
            // gotData.splice(0,6);

            

            gotData.splice(0, 6).forEach(data => {



                const div = document.createElement("div");

                const imgDiv = document.createElement("div");
                imgDiv.className = "imgDiv";
                const img = document.createElement("img");
                img.src = data.images[0].url;
                imgDiv.append(img);

                const playButtonDiv = document.createElement("span");
                playButtonDiv.className = "playButton";

                const playButton = document.createElement("button");
                playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>`;
                playButtonDiv.append(playButton);
                imgDiv.append(playButtonDiv);

                const titleDiv = document.createElement("div");
                titleDiv.className = "title";
                const title = document.createElement("h2");
                title.textContent = data.name;
                titleDiv.append(title);
                const pDiv = document.createElement("div");
                pDiv.className = "description";
                const description = document.createElement("p");
                description.textContent = data.description;
                pDiv.append(description);
                div.append(imgDiv, titleDiv, pDiv);

                playlists.append(div);
                main.append(playlists)
            });
            // console.log(1)
            document.getElementById("container").append(main);
            // console.log(2)
            
        //     let show = document.getElementsByClassName("showAll")
        //     addEventListener("click",function(){
        //     // localStorage.setItem("seeAllPageData",json.stringify(gotData))
        //     console.log("helloo")

        // })
        
        
        }

    }
    //  document.getElementsByClassName("showAll").addEventListener("onclick",storeId);
    // document.addEventListener
    //     console.log(1)
    //  let check = document.querySelectorAll(".showAll")
    // console.log(check)
    // for(let i =0; i<check.length;i++){
    //     check[i].addEventListener("click", () => {
    //         alert(i)
    //     });
    // }
    
    function storeId(){
            console.log("hello")
        }
          