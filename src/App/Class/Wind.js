class Wind {
    deg;
    speed;
    gust;

    constructor(windLiteral) {
        this.deg = windLiteral.deg;
        this.speed = windLiteral.speed;
        this.gust = windLiteral.gust;
    }

    getDirection(degrees) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N',]
        const index = Math.round(degrees / 45);
        return directions[index];
    }

    getDom() {
        const wind = document.createElement('div');
        wind.innerHTML = `
        <div class="d-flex flex-column>
            <div class="d-flex align-items-center">
                <i class="bi bi-speedometer mx-2"></i>
                <span>Vitesse du vent: ${Math.floor(this.speed * 3.6)} Km/h</span>
            </div>
            <div class="d-flex align-items-center">
                <i class="bi bi-compass mx-2"></i>
                <span>Orientation du vent: ${this.getDirection(this.deg)}</span>
            </div>
        </div>`;

        // Si il y a des rafalesn on les affiches :
        if (this.gust) {
            const gust = document.createElement('div')
            gust.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="bi bi-wind mx-2"></i>
                    <span>Rafales: ${Math.floor(this.gust * 3.6)} Km/h</span>
                </div>`;

            wind.append(gust);
        }
        return wind;
    }
}

export default Wind;