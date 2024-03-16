import { DepotBean } from "./DepotBean.model";
import { RetourBean } from "./RetourBean.model";

export class ObjectDepotRetour {
    idDepot: number;
    nbRetour: number;
    idMotif: number;

    constructor(idDepot: number, nbRetour: number, idMotif: number){
        this.idDepot=idDepot;
        this.nbRetour=nbRetour;
        this.idMotif=idMotif;
    }

    public getIdDepot(){
        return this.getIdDepot;
    }
    public setIdDepot(idDepot: number){
        this.idDepot=idDepot;
    }

}