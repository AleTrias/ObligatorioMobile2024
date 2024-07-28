init()

function init() {
    document.querySelector("#home").style.display = "none"
    document.querySelector("#signup").style.display = "none"

    // Login
    document.querySelector("#btnLogin").addEventListener("click", btnLogin)

    // Signup
    document.querySelector("#btnLoginSignUp").addEventListener("click", btnLoginSignUp)
    document.querySelector("#btnSignUp").addEventListener("click", btnSignUp)

    // Endsession
    document.querySelector("#btnEndSession").addEventListener("click", btnEndSession)

    // If user is logged then redirect to home
    if (localStorage.getItem("user") != undefined) {
        document.querySelector("#login").style.display = "none"
        document.querySelector("#home").style.display = "block"
        return
    }
}

function btnLogin() {
    const user = document.querySelector("#txtLoginUser").value
    const password = document.querySelector("#txtLoginPassword").value

    if (user == "" || password == "") {
        document.querySelector("#pLoginMessage").innerHTML = 'Todos los campos son obligatorios.'
        return
    }

    User.login(user, password)
    .then((userLogin) => {
        if (userLogin.error != undefined) {
            console.log("err on http login: ", userLogin.error)
            document.querySelector("#pLoginMessage").innerHTML = userLogin.error
            return
        }

        // Save user on localstorage for another steps
        localStorage.setItem("user", JSON.stringify(userLogin))
        homeUI()
    })
}

function btnSignUp(){
    const user = document.querySelector("#txtSignUpUser").value
    const password = document.querySelector("#txtSignUpPassword").value
    const stateID = document.querySelector("#txtSignUpStateID").value
    const cityID = document.querySelector("#txtSignUpCityID").value

    console.log(user, password, stateID, cityID)

    User.signup(user, password, stateID, cityID)
    .then((userSignup) => {
        if (userSignup.error != undefined) {
            console.log("err on http signup: ", userSignup.error)
            document.querySelector("#pSignUpMessage").innerHTML = userSignup.error
            return
        }

        // Save user on localstorage for another steps
        console.log(userSignup)
        localStorage.setItem("user", JSON.stringify(userSignup))
        homeUI()
    })
}

function btnLoginSignUp() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "block"

    // set states on select
    User.states()
    .then((states => {
        if (states.error != undefined) {
            console.log("error on http departamentos: ", states.error)
            document.querySelector("#pSignUpMessage").innerHTML = userSignup.error
            return
        }

        // iterate stats and add options
        for (let i = 0; i < states.length; i++) {
            document.querySelector("#selectStates").innerHTML += `<option value=${states[i].id}>${states[i].nombre}</option>`
        }

        let stateID = document.querySelector("#selectStates").value
        console.log(stateID)


        // TODO add cities by states
    }))
}

function homeUI() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "none"
    document.querySelector("#home").style.display = "block"
}

function btnEndSession(){
    localStorage.clear()
    document.querySelector("#home").style.display = "none"
    document.querySelector("#login").style.display = "block"
}