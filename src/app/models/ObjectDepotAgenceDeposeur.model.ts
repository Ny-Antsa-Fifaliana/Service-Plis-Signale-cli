export class ObjectDepotAgenceDeposeur{
    nbDepotAgence: number;
    idDeposeur: number;
    date: Date;

    constructor( nbDepotAgence: number,idDeposeur: number,date: Date){
        this.nbDepotAgence=nbDepotAgence;
        this.idDeposeur=idDeposeur;
        this.date=date;
    }
}