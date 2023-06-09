const iconCDN = 'https://openweathermap.org/img/wn/';

class Weather {


    // Propriétés
    description;
    icon;
    locationName;
    country;

    constructor(weatherLiteral) {
        this.description = weatherLiteral.description;
        this.icon = weatherLiteral.icon;
        this.locationName = weatherLiteral.locationName;
        this.country = weatherLiteral.country;
    }

    getDom() {
        const weather = document.createElement('div');
        weather.innerHTML = `
            <div class="d-flex my-2">
                <div class="h4">${this.locationName}, ${this.country}</div>
            </div>
            <div class="d-flex align-items-center">             
                <img src="${iconCDN}${this.icon}.png" alt="weather icon">
                <span>${this.description}</span>                 
            </div>       
        `;
        return weather;
    }


}

export default Weather;