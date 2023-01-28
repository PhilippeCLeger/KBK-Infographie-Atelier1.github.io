import * as svg from "./Outils.svg.mjs";
import { Rectangle } from "./Primitives.mjs";


const FractionalTitleLayoutBox = new Rectangle(0, 0.015, 1, 0);
const FractionalYLabelsLayoutBox = new Rectangle(0, 0.15, 0.15, 0.75);
const FractionalXLabelsLayoutBox = new Rectangle(0.1, 0.9, 0.9, 0.1);
const FractionalGridLayoutBox = new Rectangle(0.155, 0.13, 0.69, 0.74);

export class Graphique{
    constructor(titre, mainGraduation, seuils, processLabel, donnees, width = 1090, height = 1000){
        this.titre = titre;
        this.mainGraduation = mainGraduation;
        this.seuils = seuils;
        this.processLabel = processLabel;
        this.dataSet = donnees;
        this.layout = this.#BuildLayout(width, height);
    }

    AddGraph(container){
        const viewport = document.createElementNS(svg.svgns, "svg");
        container.appendChild(viewport);
        viewport.setAttribute("viewBox", `0 0 ${this.layout.All.width} ${this.layout.All.height}`);
        this.#CreateGraph(viewport);
        return viewport;
    }

    #BuildLayout(width, height){
        const dimensions = {width, height};
        return {
            All: new Rectangle(0, 0, dimensions.width, dimensions.height),
            Title: this.#BuildLayoutBox(dimensions, FractionalTitleLayoutBox),
            YLabels: this.#BuildLayoutBox(dimensions, FractionalYLabelsLayoutBox),
            XLabels: this.#BuildLayoutBox(dimensions, FractionalXLabelsLayoutBox),
            Grid: this.#BuildLayoutBox(dimensions, FractionalGridLayoutBox),
        }
    }

    #BuildLayoutBox(dimensions, fractionalLayoutBox){
        return new Rectangle(
            fractionalLayoutBox.x * dimensions.width, 
            fractionalLayoutBox.y * dimensions.height, 
            fractionalLayoutBox.width * dimensions.width, 
            fractionalLayoutBox.height * dimensions.height);
    }

    #CreateGraph(viewport){
        this.#AddTitle(viewport);
        this.#AddGraduations(viewport);
        this.#AddData(viewport);
        viewport.appendChild(svg.rect(0, 0, this.layout.All.width, this.layout.All.height, "none", "black", 1));
    }

    #AddTitle(viewport){
        const layoutBox = this.layout.Title;
        const titre = svg.textAlign(viewport, this.titre, svg.TextAlign.TOP_CENTER, layoutBox, 0, 2);
        titre.setAttribute("font-weight", "bold");
        viewport.appendChild(svg.rect(layoutBox.x, layoutBox.y, layoutBox.width, layoutBox.height, "none", "black", 1));
    }

    #AddGraduations(viewport){
        const maxGraduation = 7000;
        const minGraduation = 0;
        const nbMainGraduations = (maxGraduation - minGraduation + 1) / this.mainGraduation;
        const mainGraduationsSpacing = this.layout.Grid.height / nbMainGraduations;
        const secondaryGraduationsSpacing = mainGraduationsSpacing / 10;

        const startX = this.layout.Grid.x;
        const startY = this.layout.Grid.y;
        const endX = this.layout.Grid.x + this.layout.Grid.width;
        for(let i = 0; i < nbMainGraduations ; ++i ){
            const mainY = startY + i * mainGraduationsSpacing;
            viewport.appendChild(svg.line(startX, mainY, endX, mainY, "black", 2));
            this.#AddGraduationLabel(viewport, maxGraduation - i * this.mainGraduation, mainY)
            if (i < nbMainGraduations - 1)
                for (let j = 1; j < 10; ++j){
                    const secY = mainY + j * secondaryGraduationsSpacing;
                    viewport.appendChild(svg.line(startX, secY, endX, secY, "hsl(0 0% 60%)", 1));
                }
        }
    }

    #AddGraduationLabel(viewport, key, y){
        const labelText = this.processLabel(key);
        const layoutBox = new Rectangle(0, y, this.layout.YLabels.width, 0);
        const label = svg.textAlign(viewport, labelText, svg.TextAlign.MIDDLE_RIGHT, layoutBox, 0, 1.75);
        return label;
    }

    #AddData(viewport, maxGraduation = 7000){
        const margin = 12;
        const width = (this.layout.Grid.width - margin) / this.dataSet.length - margin;
        const baseY = this.layout.Grid.y + this.layout.Grid.height;
        for(let i in this.dataSet){
            this.#DrawDataBar(viewport, i, maxGraduation, baseY, width, margin);
        }
    }

    #DrawDataBar(viewport, i, maxGraduation, baseY, width, margin){
        const { label, value } = this.dataSet[i];
        const height = this.layout.Grid.height * value / maxGraduation
        const r = new Rectangle(
            this.layout.Grid.x + margin + i * (margin + width),
            baseY - height,
            width,
            height
        )
        const bar = svg.rect(r.x, r.y, r.width, r.height, this.#GetColor(value));
        viewport.appendChild(bar);
        this.#DrawDataValue(viewport, value, r);
        this.#DrawDataLabel(viewport, label, r);
    }

    #GetColor(value){
        for(let [seuil, color] of Object.entries(this.seuils)){
            if(value <= seuil) return color;
        }
        return "None";
    }

    #DrawDataValue(viewport, value, barRectangle){
        const margin = 20;
        const angle = 0;
        const fontSize = 1.4;
        const layoutBox = new Rectangle(
            barRectangle.x, 
            barRectangle.y - margin, 
            barRectangle.width, 
            0);
        svg.textAlign(
            viewport, 
            this.processLabel(value), 
            svg.TextAlign.MIDDLE_CENTER, 
            layoutBox, 
            angle, 
            fontSize);
    }

    #DrawDataLabel(viewport, label, barRectangle){
        const margin = 20;
        const angle = 45;
        const fontSize = 1.4;
        viewport.appendChild(
            svg.text(
                barRectangle.x, 
                barRectangle.y + barRectangle.height + margin, 
                label, 
                angle, 
                fontSize));
    }
}