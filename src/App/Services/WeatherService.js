import HttpUtils from "../Tools/HttpUtils";
import ServiceResponse from "./ServiceResponse";

class WeatherService {
    // On va déclarer des propriétés
    apiKey;
    options;

    constructor(apiKey, userOptions = {}) {
        this.apiKey = apiKey;
        // Options par default à chaques appels de service
        this.options = {
            units: 'metric',
            lang: 'fr',
        }

        Object.assign(this.options, { appid: apiKey }, userOptions);
        // this.options ={
        //     units: 'metric',
        //     lang: 'fr',
        //     appid: apiKey
        // }
    }

    getCurrent(coords) {
        const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

        // On va fusionner les options avec les coordonnées pour construire l'url
        Object.assign(this.options, coords);

        // On va construire l'url
        const url = HttpUtils.buildUrl(baseUrl, this.options);
        // this.options = {
        //     appid: '',
        //     units: 'metric',
        //     lang:'fr',
        //     lat: 48.8534,
        //     lon: 2.3488,
        //     q: 'Paris'
        // }

        // On va faire un appel à l'API
        return new Promise(resolve => {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    // On check le code de retour de l'API
                    // code 400 = erreur de requête
                    // code 404 = ville non trouvé
                    if (data.cod == 400 || data.cod == 404) {
                        resolve(new ServiceResponse(false, data.message, null))
                    }
                    resolve(new ServiceResponse(true, null, data))

                })
                .catch(error => {
                    resolve(new ServiceResponse(false, error, null))
                });
        })
    }
}

export default WeatherService;