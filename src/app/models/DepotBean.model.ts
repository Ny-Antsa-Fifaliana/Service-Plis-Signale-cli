import { EtatBean } from "./EtatBean.model";
import { LivreeBean } from "./LivreeBean.model";
import { RetourBean } from "./RetourBean.model";
import { ZoneBean } from "./ZoneBean.model";

export class DepotBean{
    idDepot !: number;
    nbDepot : number;
    dateDepot!: Date;
    zoneByDepot!: ZoneBean;
    retourByDepot_list!: RetourBean[];
    etatByDepot_list!: EtatBean[];
    livreeByDepot_list!: LivreeBean[];
    

    constructor(nbDepot: number){
        this.nbDepot=nbDepot;
    }

     //getters and setters
	public getIdDepot(): number{
		return this.idDepot;
	}
	public setIdDepot(idDepot: number): void {
		this.idDepot = idDepot; 
	}
    public getDateDepot(): Date{
        return this.dateDepot;
    }
    public setDateDepot(date: Date): void{
        this.dateDepot=date;
    }
    public getZoneByDepot(){
        return this.zoneByDepot;
    }
    public setZoneByDepot(zoneByDepot:ZoneBean){
        this.zoneByDepot=zoneByDepot;
    }

}