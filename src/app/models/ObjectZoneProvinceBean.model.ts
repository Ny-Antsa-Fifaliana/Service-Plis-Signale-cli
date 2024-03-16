import { ProvinceBean } from "./ProvinceBean.model";
import { ZoneBean } from "./ZoneBean.model";

export class ObjectZoneProvinceBean
{
    zone!: ZoneBean;
    province!:ProvinceBean;
    constructor(zone:ZoneBean, province:ProvinceBean){
        this.zone=zone;
        this.province=province;
    }
}