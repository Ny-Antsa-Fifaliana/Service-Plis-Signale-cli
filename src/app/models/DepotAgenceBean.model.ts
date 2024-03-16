import { DeposeurBean } from "./DeposeurBean.model";
import { DepotProvinceBean } from "./DepotProvinceBean.model";

export class DepotAgenceBean{
    idDepotAgence!: number;
    nbDepotAgence: number;
    dateDepotAgence!: string;
    deposeurByDepotAgence!: DeposeurBean;
    depotProvinceByDepotAgence_list!: DepotProvinceBean[];

    constructor(nbDepotAgence: number){
        this.nbDepotAgence=nbDepotAgence;
    }

    public getIdDepotAgence(){
        return this.idDepotAgence;
    }
    public setIdDepotAgence(idDepotAgence: number){
        this.idDepotAgence=idDepotAgence;
    }
}