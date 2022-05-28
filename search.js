

let accessToken = "BQCWYZya-LkmBKs0BnaKVsws0SIwRn-qJWeLvnWqRNA-d94y8-bq_zDt2i3qJ0XSilFkZn0XjjZne5MwgO5fLkP0gipg6diMgAf7XNZd99l6mHUCZ30ns1IKYBidBkYne1UxfFqLgHZEkPdf8OgP6oVGU1Vsv9qmZgc"

async function getdata(){
try {

    let res = await fetch(`https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=50`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }

            })

            let data = await res.json();
            //console.log(data.categories.items);
            appendData(data.categories.items)
    
} catch (error) {
    console.log(error)
}

   
}

getdata()

// search bar
let timerId;
        function debounce(storeInput,delay){
            if(timerId) clearTimeout(timerId);
        timerId=setTimeout(() => {
            let input= document.querySelector("#inputSearch").value;
    
            storeInput(input);
     
        }, delay);
        }
    
        function storeInput(input){
            localStorage.setItem("searchInput",input);
            

            window.location.href="searchPage.html"
        }


function appendData(categories){

    let gridContainer = document.getElementById("gridContainer")

categories.forEach(element => {
    
    let div = document.createElement("div")
    let name = document.createElement("h3")
    name.textContent = element.name
    let img = document.createElement("img")
    img.src = element.icons[0].url

    div.append(name,img)
    gridContainer.append(div)

    div.addEventListener("click", function(){
        showPlaylist([element.id, element.name]);
    }, false);
});

}

function showPlaylist(cat){

    localStorage.setItem("cat",cat)
    window.location.href = "http://127.0.0.1:5500/playlist.html"
}

