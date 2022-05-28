

let accessToken = "BQCGmEqnY4rIUzr8v3n2t-q-59pr-qne5589StwJ0Sbj8CfUDfKMo0G-9js1-9NbwzkcVSpja9uqH8bhBcr-actc5LH7p52UdgCjUB3szd8o2w2lupI9iMCDA7u1pRfz5plaiwefFqFFqsUNU2O_CIP5yCjr1cjHCt4"

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
    window.location.href = "http://127.0.0.1:5500/playlist.html"
}

