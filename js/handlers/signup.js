
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