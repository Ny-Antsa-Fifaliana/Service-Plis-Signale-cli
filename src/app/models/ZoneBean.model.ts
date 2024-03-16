import { DepotBean } from "./DepotBean.model";
import { EtatBean } from "./EtatBean.model";
import { ProvinceBean } from "./ProvinceBean.model";

export class ZoneBean {

    idZone!: number;
    nomZone!: string;
    provinceByZone!: ProvinceBean;
    depotByZone_list!: DepotBean[];
 

    constructor(nomZone: string,depotByZone_list: DepotBean[],){
        this.nomZone=nomZone;
        this.depotByZone_list=depotByZone_list;
    }


    //getters and setters
	public getIdZone(): number{
		return this.idZone;
	}
	public setIdZone(idzone: number): void {
		this.idZone = idzone;
	}

}