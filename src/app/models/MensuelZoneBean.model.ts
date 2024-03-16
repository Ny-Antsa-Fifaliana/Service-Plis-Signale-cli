
export class MensuelZoneBean{

    total_livree !: number;
    total_retour !: number;
    mois!: string;

    constructor(total_livree: number, total_retour: number, mois: string){
        this.total_livree=total_livree;
        this.total_retour=total_retour;
        this.mois=mois;
    }
}