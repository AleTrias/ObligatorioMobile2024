init()

function init() {
    document.querySelector("#home").style.display = "none"
    document.querySelector("#signup").style.display = "none"
    document.querySelector("#newEvent").style.display = "none"


    // Login
    document.querySelector("#btnLogin").addEventListener("click", handlerLogin)
    document.querySelector("#btnSignUpLogin").addEventListener("click", handlerSignUpLogin)

    // Signup
    document.querySelector("#btnLoginSignUp").addEventListener("click", handlerLoginSignUp)
    document.querySelector("#btnSignUp").addEventListener("click", handlerSignUp)
    document.querySelector("#selectStates").addEventListener("change", populateCities)

    // Endsession
    document.querySelector("#btnEndSession").addEventListener("click", handlerEndSession)

    // NewEvent
    document.querySelector("#btnNewEvent").addEventListener("click", handlerNewEvent)

    //CreateEvent
    document.querySelector("#btnCreateEvent").addEventListener("click", handlerCreateEvent)

    // If user is logged then redirect to home
    if (localStorage.getItem("user") != undefined) {
        document.querySelector("#login").style.display = "none"
        document.querySelector("#home").style.display = "block"
        return
    }
}
function handlerCreateEvent(){
    let user = localStorage.getItem("user")
    const categoryID = document.querySelector("#txtCategories").value
    const details = document.querySelector("#txtDetails").value
    let datetime = document.querySelector("#txtDateTime").value
    if (categoryID == "") {
        document.querySelector("#pNewEventoMessage").innerHTML = 'El campo categoria es obligatorio.'
        return
    }
    // como se le coloca la fecha y hora si el usuario no la pone
    if (datetime == ""){
        datetime = Date.now();
    }
    user =  JSON.parse(user);
    console.log(user)
    Event.insert(user.userID, categoryID, details, datetime, user.apiKey)
    
}

function handlerNewEvent(){
    document.querySelector("#home").style.display = "none"
    document.querySelector("#newEvent").style.display = "block"
}


function handlerLogin() {
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

function handlerSignUpLogin() {
    document.querySelector("#login").style.display = "block"
    document.querySelector("#signup").style.display = "none"
}

function handlerSignUp(){
    const user = document.querySelector("#txtSignUpUser").value
    const password = document.querySelector("#txtSignUpPassword").value
    const passwordValidate = document.querySelector("#txtSignUpPasswordValidate").value
    const stateID = document.querySelector("#selectStates").value
    const cityID = document.querySelector("#txtSignUpCityID").value

    if (user == "" || password == "" || passwordValidate == "" || stateID == "" || cityID == "") {
        document.querySelector("#pSignUpMessage").innerHTML = 'Todos los campos son obligatorios.'
        return
    }

    if (password != passwordValidate) {
        document.querySelector("#pSignUpMessage").innerHTML = "La validación de la contraseña debe coincidir."
        return
    }

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

function handlerLoginSignUp() {
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
    }))
}

function populateCities() {
    let stateID = document.getElementById('selectStates').value
    User.cities(stateID)
    .then((cities) => {
        if (cities.error != undefined) {
            console.log("error on http cities: ", cities.error)
            document.querySelector("#pSignUpMessage").innerHTML = userSignup.error
            return
        }

        document.querySelector("#selectCities").style.display = "block"
        // iterate stats and add options
        for (let i = 0; i < cities.length; i++) {
            document.querySelector("#selectCities").innerHTML += `<option value=${cities[i].id}>${cities[i].nombre}</option>`
        }
    })
}

function homeUI() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "none"
    document.querySelector("#home").style.display = "block"
}

function handlerEndSession(){
    localStorage.clear()
    document.querySelector("#home").style.display = "none"
    document.querySelector("#login").style.display = "block"
}