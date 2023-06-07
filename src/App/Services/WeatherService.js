import HttpUtils from "../Tools/HttpUtils";

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
    }
}