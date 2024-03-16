import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { DepotBean } from "../models/DepotBean.model";
import { ObjectDepotDeleteLivree } from "../models/ObjectDepotDeleteLivree.model";
import { ObjectDepotLivree } from "../models/ObjectDepotLivree.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
export class LivreeService{
    private livreesUrl: string;
    refreshSubjectLivree$ = new Subject<void>();
    objectDepotLivree!: ObjectDepotLivree;
    objectDepotDeleteLivree!: ObjectDepotDeleteLivree;

    constructor(private env: EnvService,
                private http: HttpClient) { 
        this.livreesUrl = env.getBaseUrl();
    }

    public SaveEtatLivree(idDepotActuel: number, nbLivree: number): Observable<any>{
        this.objectDepotLivree= new ObjectDepotLivree(idDepotActuel,nbLivree);
    
         return this.http.post<any>(this.livreesUrl+'/livree',this.objectDepotLivree).pipe(
          tap(()=>{this.refreshSubjectLivree$.next();}));
    }

    public deleteLivreeByIdLivree(idDepot: number, idLivree: number){
        this.objectDepotDeleteLivree=new ObjectDepotDeleteLivree(idDepot,idLivree);
  
          this.http.delete(this.livreesUrl+'/livree', {body:this.objectDepotDeleteLivree}).pipe(
              tap(()=>{this.refreshSubjectLivree$.next();})
            ).subscribe();
      }
}