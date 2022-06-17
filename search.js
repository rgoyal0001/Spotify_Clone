const clientId = "e358f27f1cf744e49b880aaf0807be8c";
const clientSecret = "4204725dea5941b2a7c17ab60372d054";
// let authToken;
const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    // authToken=data.access_token
        localStorage.setItem("authToken", JSON.stringify(data.access_token) )
    console.log(data.access_token)
}
_getToken()


const accessToken= JSON.parse(localStorage.getItem("authToken"))
let timerId;
        function debounce(fetchData,delay){
            if(timerId) clearTimeout(timerId);
        timerId=setTimeout(() => {
            let input= document.querySelector("#inputSearch").value;
    
            fetchData(input);
     
        }, delay);
        }
    
        function fetchData(input){
            localStorage.setItem("searchInput",input);
            

            window.location.href="searchPage.html"
        }

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

            appendData(data.categories.items)
    
} catch (error) {
    console.log(error)
}

   
}

getdata()

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
        showPlaylist(element.id);
    }, false);
});

}

function showPlaylist(id){
    localStorage.setItem("catID",id)
    window.location.href = "playlist.html"
}

