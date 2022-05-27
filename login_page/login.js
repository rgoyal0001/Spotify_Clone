async function loginuser(){
    let user_enter_data=document.getElementById("login_input").value;
    let flag=false
    let user_enter_password=document.getElementById("login_password").value;
    try {
        let res=await fetch(`http://localhost:3000/user_data`);
        let data=await res.json()
        // console.log(data)
        data.forEach(e => {
            if((e.user_email==user_enter_data)&&(e.user_password==user_enter_password)){
                flag=true
                localStorage.setItem("user_name",e.user_profilename)
               location.href="../landingPageLogin.html"
            }
        });
        if(flag==false){
            alert("enter correct password")
        }

    } catch (error) {
        console.log(error)
    }
}
function gotosignup_page(){
    location.href="../signup/signup.html"
}