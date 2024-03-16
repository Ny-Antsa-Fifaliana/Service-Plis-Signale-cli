import { RetourBean } from "./RetourBean.model";

export class MotifBean{
    idMotif!: number;
    nomMotif!: string;
    retourByMotif_list!: RetourBean[];

    constructor(nomMotif: string, retourByMotif_list: RetourBean[]){
        this.nomMotif=nomMotif;
        this.retourByMotif_list=retourByMotif_list;
    }

    public getIdMotif(): number{
        return this.idMotif;
    }

    public setIdMotif(idMotif: number): void{
        this.idMotif=idMotif;
    }
}