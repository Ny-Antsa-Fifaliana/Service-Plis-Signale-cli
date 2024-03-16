import { Time } from "@angular/common";
import { DepotBean } from "./DepotBean.model";

export class EtatBean{

    idEtat!: number;
    nbLivree: number;
    nbInstance: number;
    nbRetour!: number;
    dateEtat!: Date;
    timeEtat!: Time;
    mvtLivree!: number;
    mvtRetour!: number;

    constructor(nbLivree: number, nbInstance: number){
        this.nbLivree=nbLivree;
        this.nbInstance=nbInstance;
    }

    public getIdEtat(): number{
        return this.idEtat;
    }

    public setIdEtat(idEtat: number): void{
        this.idEtat=idEtat;
    }
}