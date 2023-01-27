const svgns = "http://www.w3.org/2000/svg";
export class Graphique{
    constructor(titre, gradPrimaire, seuils, traiterEtiquette, donnees){
        this.titre = titre;
        this.gradPrimaire = gradPrimaire;
        this.seuils = seuils;
        this.traiterEtiquette = traiterEtiquette;
        this.donnees = donnees;
    }

    CreerGraphique(){
        const viewport = document.createElementNS(svgns, "svg");

        return viewport;
    }

    #CreerGrille(viewport){

    }
}