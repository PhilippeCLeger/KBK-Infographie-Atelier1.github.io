import { Graphique } from "./Modules/Graphique.mjs"

const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const ventes = [6500, 5550, 4200, 4525, 2500, 1500, 500, 1000, 1750, 2300, 3700, 3500];
const titre = "Ventes 2022";
const traiterEtiquettes = (valeur) => `$ ${valeur}`;
const gradPrimaire = 1000;
const seuils = {
    1000: "red",
    3000: "orange",
    5000: "yellow",
    7000: "green"
};

const monGraphique = new Graphique(titre);