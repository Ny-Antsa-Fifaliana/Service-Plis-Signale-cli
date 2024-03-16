export class ObjectRapport_total_LR{
    mois: string;
	total_livree: number;
	total_retour: number;

    constructor(mois: string,total_livree: number,total_retour: number){
        this.mois=mois;
        this.total_livree=total_livree;
        this.total_retour=total_retour;
    }
}