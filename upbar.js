
import navBar from "../component/getNavbar.js";
console.log(navBar())
document.getElementById("up-bar").innerHTML = navBar();



let locationHref = JSON.parse(localStorage.getItem("locationHref")) || [];
let loactionAt = locationHref.length - 1;
console.log(locationHref)


let forwardAt = JSON.parse(localStorage.getItem("forwardAt"));

if(locationHref[forwardAt] == window.location.href ){

}else{
    locationHref.push(window.location.href);
}
let backAt = JSON.parse(localStorage.getItem("backAt")) || locationHref.length - 1;


localStorage.setItem("locationHref", JSON.stringify(locationHref));

document.getElementById("leftArrow").addEventListener("click", goBack);

document.getElementById("rightArrow").addEventListener("click", goForward);



function goBack() {
    console.log("PressBack")
    if(backAt >= 1){
        console.log(backAt)
        backAt--;
    location.href = locationHref[backAt];
    
    forwardAt = backAt + 1;
    }
    console.log(backAt)

    localStorage.setItem("forwardAt", JSON.stringify(forwardAt));
    localStorage.setItem("backAt", JSON.stringify(backAt));
}

function goForward() {
    console.log("PressForward")

    if (forwardAt && locationHref[forwardAt]) {
        location.href = locationHref[forwardAt];
        if (locationHref[forwardAt++]) {
            forwardAt++;
            backAt++;
        }
        localStorage.setItem("forwardAt", JSON.stringify(forwardAt));
        localStorage.setItem("backAt", JSON.stringify(backAt))
    }

}