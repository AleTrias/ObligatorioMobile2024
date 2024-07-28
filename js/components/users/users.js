class User {
    constructor() {
        this.user = null;
        this.password = null;
        this.stateId = null;
        this.cityId = null;
        this.apiKey = null;
        this.userID = null;
    }

    static async signup(user, password, stateId, cityId){
        let response
        let data = {
            usuario : user,
            password : password,
            idDepartamento : stateId,
            idCiudad : cityId
        }
        
        await fetch("http://babytracker.develotion.com/usuarios.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()
        })
        .then((body) => {
            response = body
        })
        .catch((error) => {
            console.log(error)
            return "Ha ocurrido un error"
        });

        if (response.codigo == 200) {
            // If http status is 200 OK then response 
            // apiKey and userID from another request
            let user = new User()

            if (response.apiKey != undefined){
                user.apiKey = response.apiKey
            }
            if (response.id != undefined){
                user.userID = response.id
            }
            user.user = data.usuario
            user.password = data.password
            user.stateId = data.idDepartamento
            user.cityId = data.idCiudad

            return user
        }

        // If http status is other than 200 then return err
        let error = {
            error: response.mensaje
        }
        return error
    }

    static async login(user, password){
        let response
        let data = {
            usuario : user,
            password : password
        }
        await fetch("http://babytracker.develotion.com/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()
        })
        .then((body) => {
            response = body
        })
        .catch((error) => {
            console.log(error)
            return "Ha ocurrido un error"
        });

        if (response.codigo == 200) {
            // If http status is 200 OK then response 
            // apiKey and userID from another request
            let user = new User()

            if (response.apiKey != undefined){
                user.apiKey = response.apiKey
            }
            if (response.id != undefined){
                user.userID = response.id
            }
            user.user = data.usuario
            user.password = data.password

            return user
        }

        // If http status is other than 200 then return err
        let error = {
            error: response.mensaje
        }
        return error
    }

    static async states(){
        let response
        await fetch("http://babytracker.develotion.com/departamentos.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((body) => {
            response = body
        })
        .catch((error) => {
            console.log(error)
            return "Ha ocurrido un error"
        });

        if (response.codigo == 200) {
            // If http status is 200 OK then response 
            // save states for signup
            if (response.departamentos != undefined){
                return response.departamentos
            }
        }

        // If http status is other than 200 then return err
        let error = {
            error: response.mensaje
        }
        return error
    }

    static async cities(stateID){
        let response
        await fetch(`http://babytracker.develotion.com//ciudades.php?idDepartamento=${stateID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((body) => {
            response = body
        })
        .catch((error) => {
            console.log(error)
            return "Ha ocurrido un error"
        });

        if (response.codigo == 200) {
            // If http status is 200 OK then response 
            // save cities for signup
            if (response.ciudades != undefined){
                return response.ciudades
            }
        }

        // If http status is other than 200 then return err
        let error = {
            error: response.mensaje
        }
        return error
    }
}
