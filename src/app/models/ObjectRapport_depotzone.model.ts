export class ObjectRapport_depotzone{
    id_depotzone: number;
    nom_zone: string;
	nb_depot: number;
	date_depot: string;
	total_livree: number;
	total_retour: number;
	total_instance: number;

    constructor(id_depotzone: number, nom_zone: string,nb_depot: number,date_depot: string,total_livree: number,total_retour: number,total_instance: number){
        this.id_depotzone=id_depotzone;
        this.nom_zone=nom_zone;
        this.nb_depot=nb_depot;
        this.date_depot=date_depot;
        this.total_livree=total_livree;
        this.total_retour=total_retour;
        this.total_instance=total_instance;
    }
}