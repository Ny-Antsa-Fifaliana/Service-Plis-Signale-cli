export class DepotByZoneBean{
     nb_depotagence: number;
     date_depotagence: Date;
     nb_depotzone: number;
     date_depotzone: Date;
     nom_deposeur: string;

     constructor(nb_depotagence: number, date_depotagence: Date, nb_depotzone: number,date_depotzone: Date,nom_deposeur: string){
        this.nb_depotagence=nb_depotagence;
        this.date_depotagence=date_depotagence;
        this.nb_depotzone=nb_depotzone;
        this.date_depotzone=date_depotzone;
        this.nom_deposeur=nom_deposeur;
     }
}