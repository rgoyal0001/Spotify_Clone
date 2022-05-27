async function displaylikesong(){
    let owoner_name=localStorage.getItem("user_name")
    let owoner_name_p=document.getElementById("owoner_name")
    owoner_name_p.textContent=owoner_name
     

}
displaylikesong()