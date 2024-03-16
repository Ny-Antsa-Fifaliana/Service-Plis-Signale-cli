import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { DepotAgenceBean } from "../models/DepotAgenceBean.model";
import { ObjectDepotAgenceDeposeur } from "../models/ObjectDepotAgenceDeposeur.model";
import { ObjectDepotAgenceDeposeurDelete } from "../models/ObjectDepotAgenceDeposeurDelete.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
  export class Depot_agenceService {
    private depot_agencesUrl: string;
    refreshSubject$ = new Subject<void>();
    objectDepotAgenceDeposeur!: ObjectDepotAgenceDeposeur;
    objectDepotAgenceDeposeurDelete!: ObjectDepotAgenceDeposeurDelete;

    //For notification admin-template.component
    private emitChangeSource = new Subject<any>();
    ChangeEmitted$= this.emitChangeSource.asObservable();

    private matBadgeChangeSource= new Subject<any>();
    ChangeEmittedMatBadge$= this.matBadgeChangeSource.asObservable();

    constructor(private env: EnvService,
                private http: HttpClient) { 
        this.depot_agencesUrl = env.getBaseUrl();
      }

    //For notification admin-template.component
    emitChange(Change: any){
      this.emitChangeSource.next(Change);
    }
    
    emitChangeBadgeValue(value: any){
      this.matBadgeChangeSource.next(value);
    }


    public ListerDepotAgenceByAnnee(annee: number): Observable<DepotAgenceBean[]> {
      let queryParams=new HttpParams(); 
        queryParams= queryParams.append("annee", annee);
        return this.http.get<DepotAgenceBean[]>(this.depot_agencesUrl+'/depotAgencesByAnnee', {params:queryParams});
    }

    public ListerDepotAgence(): Observable<DepotAgenceBean[]> {
        return this.http.get<DepotAgenceBean[]>(this.depot_agencesUrl+'/depotAgences');
    }

    public SaveDepotAgence(nbDepotAgence: number, idDeposeur:number, date:Date): Observable<any>{
      
      this.objectDepotAgenceDeposeur= new ObjectDepotAgenceDeposeur(nbDepotAgence,idDeposeur,date);
        
         return this.http.post<any>(this.depot_agencesUrl+'/depotAgence',this.objectDepotAgenceDeposeur).pipe(
          tap(()=>{this.refreshSubject$.next();}));
    }

    public deleteDepotAgenceByIdDepotAgence(idDepotAgence: number, idDeposeur: number){
        this.objectDepotAgenceDeposeurDelete= new ObjectDepotAgenceDeposeurDelete(idDepotAgence,idDeposeur);
    
        this.http.delete(this.depot_agencesUrl+'/depotAgence', {body:this.objectDepotAgenceDeposeurDelete}).pipe(
          tap(()=>{this.refreshSubject$.next();})
        ).subscribe();
    }

    public getDepotAgenceByIdDepotAgence(idDepotAgence: number): Observable<DepotAgenceBean>{
        let queryParams=new HttpParams(); 
        queryParams= queryParams.append("idDepotAgence", idDepotAgence);
        return this.http.get<DepotAgenceBean>(this.depot_agencesUrl+'/depotAgence', {params:queryParams});
    }

  }