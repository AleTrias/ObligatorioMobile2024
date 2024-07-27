/** TODO LIST:::
     * 
     *     1.  Agregar en el registro los departamentos y ciudades:
     *          a. Hacer el get a los departamentos y ponerlo en un select
     *          b. Hacer el get a las ciudades por un departamento id y agregarlos al select despues que seleccione el departamento
     * 
     *     2. Armar logout -> Se manda al login y se borra lo del localstorage
     * 
     *     3. Agregar los endpoints:
     *          a. Alta eventos
     *          b. Get eventos
     *          c. Informe de eventos
     *  
 */


let error

init()

function init() {
    document.querySelector("#home").style.display = "none"
    document.querySelector("#signup").style.display = "none"

    // Login
    document.querySelector("#btnLogin").addEventListener("click", btnLogin);
    document.querySelector("#btnLoginSignUp").addEventListener("click", btnLoginSignUp);

    // Signup
    document.querySelector("#btnSignUp").addEventListener("click", btnSignUp);
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
        console.log(userLogin)
        localStorage.setItem("user", JSON.stringify(userLogin))
        homeUI()
    })
}

function btnLoginSignUp() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "block"
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

function homeUI() {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "none"
    document.querySelector("#home").style.display = "block"
}