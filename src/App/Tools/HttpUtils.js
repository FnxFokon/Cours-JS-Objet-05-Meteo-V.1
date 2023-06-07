// Cette classe va contenir des méthodes utilitaires pour gérer les requêtes HTTP

class HttpUtils {
    // Créer une méthode qui permet de construire une URL à partir d'une URL de base et de paramètres

    static buildUrl(baseUrl, params = {}) {
        // baseUrl = https://monapi.com
        // params = {
        //     nom: 'toto',
        //     age: 25,
        //     ville: 'Paris'
        // }
        // => https://monapi.com?,nom=toto&age=25&ville=Paris

        // On récupère les clés de l'objet params
        let paramsKeys = Object.keys(params);
        // paramsKeys = ['nom', 'age', 'ville']

        // Si je n'ai pas de paramètres, je retourne l'url de base
        if (paramsKeys.length <= 0) return baseUrl;

        // Je créer un tableau qui va contenir les paramètres
        let paramsArray = [];

        // Je parcours les clés de l'objet params dans une boucle
        for (let key in params) {
            // Pour trouver la valeur d'une proproétés on peut: 
            // 1- Si on connais le nom de la clé: obj.maClé
            // 2- Si le nom de ma clé est une chaine: obj['maClé']
            let pairedParam = `${key}=${params[key]}`;
            // pairedParam = 'nom=toto'
            paramsArray.push(pairedParam);
            //paramsArray = ['nom=toto', 'age=25', 'ville=Paris']
        }
        return `${baseUrl}?${paramsArray.join('&')}`
        // return 'https://monapi.com?nom=toto&age=25&ville=Paris'
    }
}

export default HttpUtils;