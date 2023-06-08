class Main {
    // On déclare ses propriétés
    temp;
    feels_like;
    pressure;
    humidity;
    temp_min;
    temp_max;

    constructor(mainLiteral) {
        this.temp = mainLiteral.temp;
        this.feels_like = mainLiteral.feels_like;
        this.pressure = mainLiteral.pressure;
        this.humidity = mainLiteral.humidity;
        this.temp_min = mainLiteral.temp_min;
        this.temp_max = mainLiteral.temp_max;
    }

    getDom() {
        const main = document.createElement('div');
        main.innerHTML =
            `<div class="d-flex flex-column>
                <div class="d-flex align-items-center">
                    <i class="bi bi-thermometer-half mx-2"></i>
                    <span>Température: ${this.temp}°C (Ressenti: ${this.feels_like}°C) </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-thermometer-low mx-2"></i>
                    <span>Température min: ${this.temp_min}°C </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-thermometer-high mx-2"></i>
                    <span>Température max: ${this.temp_max}°C </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-cloud-download-fill mx-2"></i>
                    <span>Pession: ${this.pressure}Hpa </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-cloud-download-fill mx-2"></i>
                    <span>Humidité: ${this.humidity}% </span>
                </div>
            </div>
            `;
        return main;
    }
}

export default Main;