import { DepotAgenceBean } from "./DepotAgenceBean.model";
import { DepotBean } from "./DepotBean.model";

export class DeposeurBean{

    idDeposeur!: number;
    nomDeposeur!: string;
    depotAgenceByDeposeur_list!: DepotAgenceBean[];

    constructor(nomDeposeur: string, depotAgenceByDeposeur_list: DepotAgenceBean[]){
        this.nomDeposeur=nomDeposeur;
        this.depotAgenceByDeposeur_list=depotAgenceByDeposeur_list;
    }

    public getIdDeposeur(): number{
        return this.idDeposeur;
    }

    public setIdDeposeur(idDeposeur: number): void{
        this.idDeposeur=idDeposeur;
    }
    
}