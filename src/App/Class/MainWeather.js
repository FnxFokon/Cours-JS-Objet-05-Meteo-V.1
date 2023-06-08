import Main from "./Main";
import Sun from "./Sun";
import Weather from "./Weather";
import Wind from "./Wind";

// On déclare une constante pour récupérer les icones de l'api
const iconCDN = 'https://openweathermap.org/img/wn/';

class MainWeather {
    // On déclare nos propriétés
    clouds;
    country;
    dt;
    locationName;
    main;
    rain;
    snow;
    sun;
    visibility;
    weather;
    wind;


    constructor(mainWeatherLiteral) {

        this.clouds = mainWeatherLiteral.clouds.all;

        this.country = mainWeatherLiteral.sys.country;

        this.dt = mainWeatherLiteral.dt;

        this.locationName = mainWeatherLiteral.name;

        this.main = new Main(mainWeatherLiteral.main);

        // Si j'ai des données de pluie je les récupère
        if (mainWeatherLiteral.hasOwnProperty('rain')) {
            this.rain = mainWeatherLiteral.rain['1h'];
        }

        // Si j'ai des données de neige je les récupère
        if (mainWeatherLiteral.hasOwnProperty('snow')) {
            this.rain = mainWeatherLiteral.snow['1h'];
        }

        // On crée l'instance de Sun en lui passant un objet avec les données de sun
        // this.sun = new Sun(mainWeatherLiteral.sys);
        // Equivalent de ce qu'il y a au dessus
        this.sun = new Sun({
            sunset: mainWeatherLiteral.sys.sunset,
            sunrise: mainWeatherLiteral.sys.sunrise,
        });

        this.visibility = mainWeatherLiteral.visibility;

        // On créer l'instance Weather en lui passant un objet avec les données de weather OU avec toutes les données
        // Toutes les données:
        // this.weather = new Weather(mainWeatherLiteral.weather[0])
        // Objet avec les données de weather:
        this.weather = new Weather({
            description: mainWeatherLiteral.weather[0].description,
            icon: mainWeatherLiteral.weather[0].icon,
        });

        this.wind = new Wind(mainWeatherLiteral.wind);
    }

    getDom() {
        const resultDiv = document.getElementById('result');

        // Créer les éléments pour les onglets
        const tab1 = document.createElement('div');
        tab1.className = "tab-pane fade show active";
        tab1.id = 'tab1';
        tab1.setAttribute('role', 'tabpanel');
        tab1.setAttribute('aria-labelledby', 'tab1-tab');
        tab1.innerHTML = `
            <h5 class="card-title">Informations générales</h5>
        `;
        tab1.append(this.weather.getDom());

        const tab2 = document.createElement('div');
        tab2.className = "tab-pane fade";
        tab2.id = 'tab2';
        tab2.setAttribute('role', 'tabpanel');
        tab2.setAttribute('aria-labelledby', 'tab2-tab');
        tab2.innerHTML = `
            <h5 class="card-title">Température</h5>
        `;
        tab2.append(this.main.getDom());

        const tab3 = document.createElement('div');
        tab3.className = "tab-pane fade";
        tab3.id = 'tab3';
        tab3.setAttribute('role', 'tabpanel');
        tab3.setAttribute('aria-labelledby', 'tab3-tab');
        tab3.innerHTML = `
            <h5 class="card-title">Info sur le vent</h5>
        `;
        tab3.append(this.wind.getDom());

        const tab4 = document.createElement('div');
        tab4.className = "tab-pane fade";
        tab4.id = 'tab4';
        tab4.setAttribute('role', 'tabpanel');
        tab4.setAttribute('aria-labelledby', 'tab4-tab');
        tab4.innerHTML = `
            <h5 class="card-title">Info sur le soleil</h5>
        `;
        tab4.append(this.sun.getDom())

        const tabList = document.createElement('ul');
        tabList.className = "nav nav-tabs card-header-tabs";
        tabList.id = "myTabs";
        tabList.setAttribute('role', 'tablist');
        tabList.innerHTML = `
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="tab1-tab" data-bs-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Général</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab2-tab" data-bs-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Température</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab3-tab" data-bs-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Vent</a>
        </li>
            <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab4-tab" data-bs-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Soleil</a>
        </li>
        `;

        // Créer l'élément pour le contenu de la carte
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
                ${tab1.outerHTML}
                ${tab2.outerHTML}
                ${tab3.outerHTML}
                ${tab4.outerHTML}
            </div>
        `;

        // Créer l'élément pour la carte
        const card = document.createElement('div');
        card.className = 'card';
        card.append(tabList, cardBody);

        // Créer l'élément pour le conteneur de la carte
        const cardContainer = document.createElement('div');
        cardContainer.className = 'container mt-4';
        cardContainer.append(card);

        resultDiv.innerHTML = '';
        resultDiv.appendChild(cardContainer);
    }
}

export default MainWeather;