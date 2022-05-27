async function create_userdata(){
try {
    let user_email=document.getElementById("signup_email").value;
    let user_conform_email=document.getElementById("Signup_user_conform_email").value;

    let user_password=document.getElementById("signup_userpassword").value;
    let user_profilename=document.getElementById("user_profilename").value;
    let user_dobyear=document.getElementById("signup_dobyear").value;
    let user_dobmonth=document.getElementById("Signup_month").value;
    let user_dobday=document.getElementById("signup_day").value;
    let userIsmale=document.getElementById("Male")
    let userIsfemale=document.getElementById("Female")
    let userIsother=document.getElementById("Non-binary")
    var user_genderr_final;
    if(userIsmale.checked==true){
        user_genderr_final=userIsmale.value
    }
    else if(userIsfemale.checked==true){
        user_genderr_final=userIsfemale.value
    }
    else{
        user_genderr_final=userIsother.value
    }
    console.log(user_email,user_conform_email,user_password,user_profilename,user_dobyear,user_dobmonth,user_dobday,user_genderr_final)
    let body={
        "user_email":user_email,
        "user_conform_email":user_conform_email,
        "user_password":user_password,
        "user_profilename":user_profilename,
        "uer_DOByear":user_dobyear,
        "user_DOBmonth":user_dobmonth,
        "user_DOBday":user_dobday,
        "user_gender":user_genderr_final
    };
    let res=await fetch(`http://localhost:3000/user_data`,{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            "Content-Type":"application/json"
        }
    })

} catch (error) {
    console.log(error)
}
location.href="../login_page/login.html"
}
function gotologinpage(){
    
    location.href="../login_page/login.html"
}
function rightSymbol(){
    let robotr=document.getElementById("robot_id")
    robotr.innerHTML=""
    robotr.textContent="✔"
}