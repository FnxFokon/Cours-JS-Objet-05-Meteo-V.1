class Sun {
    // Propriétés
    sunset;
    sunrise;

    constructor(sunLiteral) {
        this.sunset = sunLiteral.sunset;
        this.sunrise = sunLiteral.sunrise;
    }

    getTimeFromTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getDom() {
        const sun = document.createElement('div');
        sun.innerHTML = `
            <div class="d-flex flex-column>
                    <div class="d-flex align-items-center">
                        <i class="bi bi-sunrise mx-2"></i>
                        <span>Lever du Soleil: ${this.getTimeFromTimestamp(this.sunrise)}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="bi bi-sunset mx-2"></i>
                        <span>Coucher du Soleil: ${this.getTimeFromTimestamp(this.sunset)}</span>
                    </div>
            </div>        
        `;
        return sun;
    }
}

export default Sun;