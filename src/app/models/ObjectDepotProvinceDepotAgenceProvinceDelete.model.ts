export class ObjectDepotProvinceDepotAgenceProvinceDelete{
    idDepotProvince: number;
    idDepotAgence: number;
    codeProvince:  number;

    constructor(idDepotProvince: number, idDepotAgence: number, codeProvince:  number){
        this.idDepotProvince=idDepotProvince;
        this.idDepotAgence= idDepotAgence;
        this.codeProvince=codeProvince;
    }
}