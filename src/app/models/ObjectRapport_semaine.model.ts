export class ObjectRapport_semaine{
    week: string;
    date: string;
    livree: number;
    retour: number;

    constructor(week: string,date: string,livree: number,retour: number){
        this.week=week;
        this.date=date;
        this.livree=livree;
        this.retour=retour;
    }
}