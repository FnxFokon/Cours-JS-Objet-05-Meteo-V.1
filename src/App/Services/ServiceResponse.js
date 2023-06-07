class ServiceResponse {
    ok; // Boolean => renvoie true si la reponse est "ok";
    error; // Si ok est false, renvoie un objet error;
    data; // Si ok est true, renvoie l'objet data (reponse de l'API)

    constructor(ok, error, data) {
        this.ok = ok;
        this.error = error;
        this.data = data;
    }
}

export default ServiceResponse;