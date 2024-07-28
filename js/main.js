init()

function init() {
    document.querySelector("#home").style.display = "none"
    document.querySelector("#signup").style.display = "none"

    // Login
    document.querySelector("#btnLogin").addEventListener("click", btnLogin)

    // Signup
    document.querySelector("#btnLoginSignUp").addEventListener("click", btnLoginSignUp)
    document.querySelector("#btnSignUp").addEventListener("click", btnSignUp)

    endSession()
    // If user is logged then redirect to home
    if (localStorage.getItem("user") != undefined) {
        document.querySelector("#login").style.display = "none"
        document.querySelector("#home").style.display = "block"
        return
    }
}

function homeUI() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "none"
    document.querySelector("#home").style.display = "block"
}

function endSession(){
    localStorage.clear()
    document.querySelector("#login").style.display = "block"
}