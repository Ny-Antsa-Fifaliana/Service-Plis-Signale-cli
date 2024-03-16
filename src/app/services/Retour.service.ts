import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { DepotBean } from "../models/DepotBean.model";
import { objectDepotDeleteRetour } from "../models/ObjectDepotDeleteRetour.model";
import { ObjectDepotRetour } from "../models/ObjectDepotRetour.model";
import { RetourBean } from "../models/RetourBean.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
export class RetourService{
    private retoursUrl: string;
    refreshSubjectRetour$ = new Subject<void>();
    retourForObject!: RetourBean;
    objectDepotRetour!: ObjectDepotRetour;
    objectDepotDeleteRetour!: objectDepotDeleteRetour;

    constructor(private env: EnvService,
                private http: HttpClient) { 
        this.retoursUrl = env.getBaseUrl();
    }

    public SaveEtatRetour(idDepot: number, nbRetour: number, idMotif: number):Observable<any> {

      this.objectDepotRetour=new ObjectDepotRetour(idDepot,nbRetour,idMotif);
      
      return this.http.post<any>(this.retoursUrl+'/retour',this.objectDepotRetour).pipe(
          tap(()=>{this.refreshSubjectRetour$.next();}));
  }

    public deleteRetourByIdRetour(idDepot: number, idRetour: number, idMotif: number){
  
      this.objectDepotDeleteRetour=new objectDepotDeleteRetour(idDepot,idRetour, idMotif);

        this.http.delete(this.retoursUrl+'/retour', {body:this.objectDepotDeleteRetour}).pipe(
            tap(()=>{this.refreshSubjectRetour$.next();})
          ).subscribe();
    }

}