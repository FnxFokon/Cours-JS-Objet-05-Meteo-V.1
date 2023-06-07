// Importer les styles de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importer les scripts de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importer les icones de bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

import WeatherService from './Services/WeatherService';

const apiKey = '8cd839c5fdafc91d2adc41462816ab09'; // apiKey du prof: 2dcb29d2362cd223eeb37cb8d032961d

class App {

    // On déclare des propriétés
    // Element du DOM
    elInputNewLon;
    elInputNewLat;
    elInputNewCity;

    // Pour le rendu de la météo
    elResultDiv;

    // Pour les différents services suivant la localisation
    weatherServiceFr;
    weatherServiceUk;
    weatherServiceUs;

    constructor() {
        // Service FR
        this.weatherServiceFr = new WeatherService(apiKey);

        // Service UK
        this.weatherServiceUk = new WeatherService(apiKey, { lang: 'en' });

        // Service Us
        this.weatherServiceUs = new WeatherService(apiKey, {
            lang: 'en',
            units: 'imperial'
        });
    }


    start() {
        console.log('App démarrée...');
        this.loadDom();
    }

    // Méthode qui afficher le formulaire de saisie des coordonnées et ville
    loadDom() {

        // On créer la div container
        const elContainer = document.createElement('div');
        elContainer.className = 'container mt-5';

        // On créer le h1 
        const elH1 = document.createElement('h1');
        elH1.textContent = 'Appli Météo';

        // On créer le h2 des coordonnées
        const elH2Coord = document.createElement('h2');
        elH2Coord.className = 'h4 mt-5';
        elH2Coord.textContent = 'Entrer les coordonnées géographique (latitude et longitude):';

        // On créer la div du form Lat
        const elFormGroupLat = document.createElement('div');
        elFormGroupLat.classList = 'form-group';

        // Label et input du form lat
        const elLabelLat = document.createElement('label');
        elLabelLat.setAttribute = ('for', 'latitude');
        elLabelLat.textContent = 'Latitude:';

        this.elInputNewLat = document.createElement('input');
        this.elInputNewLat.type = 'text';
        this.elInputNewLat.id = 'latitude';
        this.elInputNewLat.classList = 'form-control';

        elFormGroupLat.append(elLabelLat, this.elInputNewLat);

        // On créer la div du form Lon
        const elFormGroupLon = document.createElement('div');
        elFormGroupLon.className = 'form-group mt-5';

        // Label et input du form lon
        const elLabelLon = document.createElement('label');
        elLabelLon.setAttribute = ('for', 'longitude');
        elLabelLon.textContent = 'Longitude:';

        this.elInputNewLon = document.createElement('input');
        this.elInputNewLon.type = 'text';
        this.elInputNewLon.id = 'longitude';
        this.elInputNewLon.classList = 'form-control';

        elFormGroupLon.append(elLabelLon, this.elInputNewLon);

        // On créer le h2 de la ville
        const elH2City = document.createElement('h2');
        elH2City.className = 'h4 mt-5';
        elH2City.textContent = 'Entrer le nom de la ville:';

        // On créer la div du form city
        const elFormGroupCity = document.createElement('div');
        elFormGroupCity.classList = 'form-group';

        // Label et input du form city
        const elLabelCity = document.createElement('label');
        elLabelCity.setAttribute = ('for', 'city');
        elLabelCity.textContent = 'Ville:';

        this.elInputNewCity = document.createElement('input');
        this.elInputNewCity.type = 'text';
        this.elInputNewCity.id = 'city';
        this.elInputNewCity.classList = 'form-control';

        elFormGroupCity.append(elLabelCity, this.elInputNewCity);

        // On créer le bouton de recherche <button class="btn btn-primary my-3 form-control" onclick="getWeather()">Afficher la météo</button>
        const elBtnInfo = document.createElement('button');
        elBtnInfo.className = 'btn btn-primary my-3 form-control';
        elBtnInfo.textContent = 'Afficher la météo';
        elBtnInfo.addEventListener('click', this.getWeather.bind(this));

        // On créer la div Result <div id="result" class="mt-3"></div>


        elContainer.append(elH1, elH2Coord, elFormGroupLat, elFormGroupLon, elH2City, elFormGroupCity, elBtnInfo);
        document.body.appendChild(elContainer);
    }

    // Méthode qui affiche la météo
    getWeather() {
        console.log('getWeather');
        // On récupere les valeurs des inputs
        const newLatitude = this.elInputNewLat.value.trim();
        const newLongitude = this.elInputNewLon.value.trim();
        const newCity = this.elInputNewCity.value.trim();

        // TODO: faire appel au service pour récupérer la météo
        const newWeatherLiteral = {
            lon: newLongitude,
            lat: newLatitude,
            q: newCity
        };

        // On appel le service
        this.weatherServiceFr
            .getCurrent(newWeatherLiteral)
            .then(this.handleServiceResponse.bind(this));
    }

    handleServiceResponse(serviceResponse) {
        console.log('service', serviceResponse);
    }
}

const app = new App();


export default app;