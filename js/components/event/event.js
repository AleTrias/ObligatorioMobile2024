class Event {
    constructor() {
        this.category = null;
        this.datetime = null;
        this.details = null;
    }

    static async insert(userID, categoryID, detail, datetime){
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
                "apikey": "a834268a4550eaef16ce0125a1c5ba6a",
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