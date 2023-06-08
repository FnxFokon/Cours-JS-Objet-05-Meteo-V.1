const iconCDN = 'https://openweathermap.org/img/wn/';

class Weather {


    // Propriétés
    description;
    icon;

    constructor(weatherLiteral) {
        this.description = weatherLiteral.description;
        this.icon = weatherLiteral.icon;
    }

    getDom() {
        const weather = document.createElement('div');
        weather.innerHTML = `
            <div class="d-flex align-items-center">             
                <img src="${iconCDN}${this.icon}.png" alt="weather icon">
                <span>${this.description}</span>                 
            </div>        
        `;
        return weather;
    }


}

export default Weather;