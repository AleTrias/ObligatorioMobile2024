
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