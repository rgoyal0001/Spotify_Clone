const nav=()=>{
    return`
    <div id="nav_cont">
        <div id="nav_img">
            <img src="./navbar/Screenshot 2022-05-22 102301.png" alt="" srcset="" onclick="home()">
        </div>
        <div id="nav_data">
            <div id="nav_fstpart">
                <div id="nav_premium" class="nav_data">
                    <a href="./premiumPage.html">Premium</a>
                </div>
                <div id="nav_support" class="nav_data">
                <a href="./support.html">Support</a>
                </div>
                <div id="nav_download" class="nav_data">
                <a href="./download.html">Download</a>
                </div>

            </div>
            <div id="break">
                <p>|</p>
            </div>
            <div id="nav_secondpart">
                <div id="nav_Sign" class="nav_data">

                <a href="./signup/signup.html">Sign up</a>
                </div>
                <div id="nav_log" class="nav_data">
                <a href="./login_page/login.html">Log in</a>
                </div>
            </div>

        </div>
    </div>
    `
}
export default nav