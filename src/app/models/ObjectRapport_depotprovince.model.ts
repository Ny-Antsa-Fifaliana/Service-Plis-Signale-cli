export class ObjectRapport_depotprovince{
    id_depotprovince: number;
    nom_province: string;
	nb_depotprovince: number;
	date_depotprovince: string;
	total_livree: number;
	total_retour: number;
	total_instance: number;

    constructor(id_depotprovince: number,nom_province: string,nb_depotprovince: number,date_depotprovince: string,total_livree: number,total_retour: number,total_instance: number){
        this.id_depotprovince=id_depotprovince;
        this.nom_province=nom_province;
        this.nb_depotprovince=nb_depotprovince;
        this.date_depotprovince=date_depotprovince;
        this.total_livree=total_livree;
        this.total_retour=total_retour;
        this.total_instance=total_instance;
    }
}