class Event {
    constructor() {
        this.category = null;
        this.datetime = null;
        this.details = null;
    }

    static async insert(userID, categoryID, detail, datetime, apiKey ){
        let data = {
            idCategoria: categoryID,
            idUsuario: userID,
            detalle: detail,
            fecha: datetime          
        }
        
        await fetch("http://babytracker.develotion.com/eventos.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey" : apiKey,
                "iduser": userID
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            console.log(response);
        })
        .then((responseBody) => {
            console.log(responseBody);
           
        })
        .catch((error) => {
            console.log(error);
        });
    }
}