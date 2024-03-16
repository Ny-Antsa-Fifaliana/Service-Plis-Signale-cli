import { DepotBean } from "./DepotBean.model";
import { DepotProvinceBean } from "./DepotProvinceBean.model";
import { ZoneBean } from "./ZoneBean.model";

export class ObjectDepotDepotProvinceZone{

    newDepot: DepotBean;
    idZone: number;
    idDepotProvince: number;
    constructor(newDepot: DepotBean, idZone: number, idDepotProvince: number){
        this.newDepot=newDepot;
        this.idZone=idZone;
        this.idDepotProvince=idDepotProvince;
    }

}