import { ZoneBean } from "./ZoneBean.model";

export class ProvinceBean {
	 codeProvince!: number;
	 nomProvince!: string;
	 zoneByprovince_list!: ZoneBean[];

	constructor(nomProvince: string, zoneByprovince_list: ZoneBean[]){
		this.nomProvince=nomProvince;
		this.zoneByprovince_list=zoneByprovince_list;
	}
	
	//getters and setters
	public getCodeProvince(): number{
		return this.codeProvince;
	}
	public setCodeProvince(codeProvince: number): void {
		this.codeProvince = codeProvince;
	}
}