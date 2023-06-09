import Main from "./Main";
import Sun from "./Sun";
import Weather from "./Weather";
import Wind from "./Wind";

// On déclare une constante pour récupérer les icones de l'api
const iconCDN = 'https://openweathermap.org/img/wn/';

class MainWeather {
    // On déclare nos propriétés
    clouds;
    dt;
    main;
    rain;
    snow;
    sun;
    visibility;
    weather;
    wind;


    constructor(mainWeatherLiteral) {

        this.clouds = mainWeatherLiteral.clouds.all;

        this.dt = mainWeatherLiteral.dt;

        this.main = new Main(mainWeatherLiteral.main);

        // Si j'ai des données de pluie je les récupère
        if (mainWeatherLiteral.hasOwnProperty('rain')) {
            this.rain = mainWeatherLiteral.rain['1h'];
        }

        // Si j'ai des données de neige je les récupère
        if (mainWeatherLiteral.hasOwnProperty('snow')) {
            this.snow = mainWeatherLiteral.snow['1h'];
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
            locationName: mainWeatherLiteral.name,
            country: mainWeatherLiteral.sys.country,
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
            <h3 class="card-title">Informations générales</h3>
        `;
        tab1.append(this.weather.getDom());

        const tab2 = document.createElement('div');
        tab2.className = "tab-pane fade";
        tab2.id = 'tab2';
        tab2.setAttribute('role', 'tabpanel');
        tab2.setAttribute('aria-labelledby', 'tab2-tab');
        tab2.innerHTML = `
            <h3 class="card-title">Température</h3>
        `;
        tab2.append(this.main.getDom());

        const tab3 = document.createElement('div');
        tab3.className = "tab-pane fade";
        tab3.id = 'tab3';
        tab3.setAttribute('role', 'tabpanel');
        tab3.setAttribute('aria-labelledby', 'tab3-tab');
        tab3.innerHTML = `
            <h3 class="card-title">Info sur le vent</h3>
        `;
        tab3.append(this.wind.getDom());

        const tab4 = document.createElement('div');
        tab4.className = "tab-pane fade";
        tab4.id = 'tab4';
        tab4.setAttribute('role', 'tabpanel');
        tab4.setAttribute('aria-labelledby', 'tab4-tab');
        tab4.innerHTML = `
            <h3 class="card-title">Info sur le soleil</h3>
        `;
        tab4.append(this.sun.getDom())

        const tab5 = document.createElement('div');
        tab5.className = "tab-pane fade";
        tab5.id = "tab5";
        tab5.setAttribute('role', 'tabpanel');
        tab5.setAttribute('aria-labelledby', 'tab5-tab');
        tab5.innerHTML = `
                <h5 class="card-title">Précipitations</h5>
            `;
        // if (this.rain) {
        //     const rain = document.createElement('div');
        //     rain.innerHTML = `
        //             <div class="d-flex align-items-center">
        //                 <i class="bi bi-cloud-drizzle mx-2"></i>
        //                 <span>Cumul de pluie: ${this.rain} mm</span>
        //             </div>
        //         `;
        //     tab5.append(rain);
        // }
        // if (this.snow) {
        //     const snow = document.createElement('div');
        //     snow.innerHTML = `
        //             <div class="d-flex align-items-center">
        //                 <i class="bi bi-snow2 mx-2"></i>
        //                 <span>Cumul de neige: ${this.snow} mm</span>
        //             </div>
        //         `;
        //     tab5.append(snow);
        // }

        // Version améliorer
        this.rain ?
            tab5.innerHTML += `
                    <div class="d-flex align-items-center">
                        <i class="bi bi-cloud-drizzle mx-2"></i>
                        <span>Cumul de pluie: ${this.rain} mm</span>
                    </div>
                `
            :
            tab5.innerHTML += `
                    <div class="d-flex align-items-center">
                        <i class="bi bi-snow2 mx-2"></i>
                        <span>Cumul de neige: ${this.snow} mm</span>
                    </div>
                `;

        const tabList = document.createElement('ul');
        tabList.className = "nav nav-tabs card-header-tabs ms-0";
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


        if (this.rain || this.snow) {
            const precipitations = document.createElement('li');
            precipitations.className = "nav-item";
            precipitations.setAttribute('role', 'presentation');
            precipitations.innerHTML = `
            <a class="nav-link" id="tab5-tab" data-bs-toggle="tab" href="#tab5" role="tab" aria-controls="tab5" aria-selected="false">Précipitations</a>
            `;
            tabList.append(precipitations);
        };

        // Technique de la concaténation au lieu d'utiliser une constante
        // if(this.rain || this.snow){
        //     tabList.innerHTML += `
        //         </li>
        //             <li class="nav-item" role="presentation">
        //             <a class="nav-link" id="tab5-tab" data-bs-toggle="tab" href="#tab5" role="tab" aria-controls="tab5"                      aria-selected="false">Précipitations</a>
        //         </li>
        //     `;
        // }

        // Créer l'élément pour le contenu de la carte
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
                ${tab1.outerHTML}
                ${tab2.outerHTML}
                ${tab3.outerHTML}
                ${tab4.outerHTML}
                ${tab5.outerHTML}
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
        return cardContainer;
    }
}

export default MainWeather;