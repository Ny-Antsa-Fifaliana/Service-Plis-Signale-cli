import { Time } from "@angular/common";
import { DepotBean } from "./DepotBean.model";
import { MotifBean } from "./MotifBean.model";

export class RetourBean{
    idRetour!: number;
    nbRetour: number;
    motifRetour: string;
    dateRetour!: Date;
    timeRetour!: Time;
    motifByRetour!: MotifBean;
   

    constructor(nbRetour: number, motifRetour: string){
        this.nbRetour=nbRetour;
        this.motifRetour=motifRetour;
    }

    public getIdRetour(){
        return this.idRetour;
    }
    public setIdRetour(idRetour: number){
        this.idRetour=idRetour;
    }
 

}