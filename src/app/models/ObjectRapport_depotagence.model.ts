export class ObjectRapport_depotagence{
    id_depotagence: number;
    nb_depotagence: number;
    date_depotagence: string;
	total_livree: number;
	total_retour: number;
	total_instance: number;

    constructor(id_depotagence: number, nb_depotagence: number,date_depotagence: string,total_livree: number,total_retour: number,total_instance: number){
        this.id_depotagence=id_depotagence;
        this.nb_depotagence=nb_depotagence;
        this.date_depotagence=date_depotagence;
        this.total_livree=total_livree;
        this.total_retour=total_retour;
        this.total_instance=total_instance;
    }
}