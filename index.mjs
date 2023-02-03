import { Graphique } from "./Modules/Graphique.mjs"

const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const ventes = [6500, 5550, 4200, 4525, 2500, 1500, 500, 1000, 1750, 2300, 3700, 3500];
if(false){
    mois.push("other");
    ventes.push(6543.21);
}
const donnees = mois.map((m, i) => ({label: m, value: ventes[i]}));
const titre = "Ventes 2022";
const traiterEtiquette = (valeur) => `$ ${valeur}`;
const gradPrimaire = 1000;
const seuils = {
    1000: "red",
    3000: "orange",
    4500: "yellow",
    7000: "green"
};

const monGraphique = new Graphique(titre, gradPrimaire, seuils, traiterEtiquette, donnees);
const conteneurGraphique = document.getElementById("conteneur-graphique");
monGraphique.AddGraph(conteneurGraphique);