
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
        console.log(userLogin)
        localStorage.setItem("user", JSON.stringify(userLogin))
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