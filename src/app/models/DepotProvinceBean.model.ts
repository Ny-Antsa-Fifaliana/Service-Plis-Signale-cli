import { DepotBean } from "./DepotBean.model";
import { ProvinceBean } from "./ProvinceBean.model";

export class DepotProvinceBean{
    idDepotProvince!: number;
    nbDepotProvince!: number;
    dateDepotProvince!: Date;
    depotByDepotProvince_list!: DepotBean[];
    provinceByDepotProvince!: ProvinceBean;

    constructor(nbDepotProvince: number){
        this.nbDepotProvince=nbDepotProvince;
    }

    public getIdDepotProvince(){
        return this.idDepotProvince;
    }

    public setIdDepotProvince(idDepotProvince: number){
        this.idDepotProvince=idDepotProvince;
    }
}