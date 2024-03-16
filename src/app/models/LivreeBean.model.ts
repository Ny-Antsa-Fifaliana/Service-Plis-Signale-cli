import { Time } from "@angular/common";

export class LivreeBean{
    idLivree!: number;
    nbLivree: number;
    dateLivree!: Date;
    timeLivree!: Time;

    constructor(nbLivree: number){
        this.nbLivree=nbLivree;
    }

    public getIdLivree() : number {
		return this.idLivree;
	}

	public setIdLivree(idLivree: number): void {
		this.idLivree = idLivree;
	}
}