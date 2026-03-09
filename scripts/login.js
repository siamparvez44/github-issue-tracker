const signinBtn = document.getElementById("signin-btn");
const username = document.getElementById("username");
const password = document.getElementById("password");

signinBtn.addEventListener("click", function () {
    if (username.value === "admin" && password.value === "admin123" ) {
        window.location.href ="/main.html"
    }
})