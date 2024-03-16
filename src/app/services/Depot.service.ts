import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { DepotBean } from "../models/DepotBean.model";
import { DepotByZoneBean } from "../models/DepotByZoneBean.model";
import { DepotProvinceBean } from "../models/DepotProvinceBean.model";
import { EtatBean } from "../models/EtatBean.model";
import { ObjectDepotagenceWithInstance } from "../models/ObjectDepotagenceWithInstance.model";
import { ObjectDepotDepotProvinceZone } from "../models/ObjectDepotDepotProvinceZone";
import { ObjectdepotprovinceWithInstance } from "../models/ObjectDepotprovinceWithInstance.model";
import { ObjectDepotzoneWithInstance } from "../models/ObjectDepotzoneWithInstance.model";
import { ZoneBean } from "../models/ZoneBean.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
  export class DepotService {
    
    private depotsUrl: string;
    refreshSubject$ = new Subject<void>();
    object!: ObjectDepotDepotProvinceZone;
    ObjectDepotDepotProvinceZones!: ObjectDepotDepotProvinceZone;

    constructor(private env: EnvService,
                private http: HttpClient) { 
        this.depotsUrl = env.getBaseUrl();
      }

      //not refresh so using pipe -------------------
    public SaveDepot(newDepot: DepotBean, idZone: number, idDepotProvince: number): Observable<any>{
     this.object= new ObjectDepotDepotProvinceZone(newDepot,idZone,idDepotProvince);
    
      return this.http.post<any>(this.depotsUrl+'/depot',this.object).pipe(
      tap(()=>{this.refreshSubject$.next();}));
    }


    public getDepotByIdDepot(idDepot: number): Observable<DepotBean>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("idDepot", idDepot);
      return this.http.get<DepotBean>(this.depotsUrl+'/depot', {params:queryParams});
    }
    

    public deleteDepotByIdDepot(newDepot: DepotBean, zone: ZoneBean, depotProvince: DepotProvinceBean){ 
      this.ObjectDepotDepotProvinceZones= new ObjectDepotDepotProvinceZone(newDepot,zone.idZone,depotProvince.idDepotProvince);
    
      this.http.delete(this.depotsUrl+'/depot', {body:this.ObjectDepotDepotProvinceZones}).pipe(
        tap(()=>{this.refreshSubject$.next();})
      ).subscribe(); 
    }


    public UpdateDepot(depot: DepotBean): Observable<DepotBean>{
      return this.http.put<DepotBean>(this.depotsUrl+'/depot',depot).pipe(
        tap(()=>{this.refreshSubject$.next();})
      );
    }


    public listeDepotByZone(idZone: number, annee: number): Observable<DepotByZoneBean[]>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("id_zone", idZone);
      queryParams= queryParams.append("annee", annee);
      return this.http.get<DepotByZoneBean[]>(this.depotsUrl+'/depot_zone', {params:queryParams});
    } 

    public ListerDernierLigneEtatParDepots(id_depotprovince: number): Observable<EtatBean[]>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("id_depotprovince", id_depotprovince);
      return this.http.get<EtatBean[]>(this.depotsUrl+'/lastEtatByDepot', {params:queryParams});
    }


    public ListerDernierLigneEtatParDepotsByDepotZone(id_depot: number): Observable<EtatBean>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("id_depot", id_depot);
      return this.http.get<EtatBean>(this.depotsUrl+'/lastEtatByDepotByDepotZone', {params:queryParams});
    }

    public ListerDernierLigneEtatParDepotsByDepotagence(id_depotagence: number): Observable<EtatBean[]>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("id_depotagence", id_depotagence);
      return this.http.get<EtatBean[]>(this.depotsUrl+'/lastEtatByDepotByDepotagence', {params:queryParams});
    }


    // for data and notification --------------------------------------
    //depotzone
    public ListeDepotzoneWithInstance(id_depotprovince: number): Observable<ObjectDepotzoneWithInstance[]>{
          let queryParams=new HttpParams(); 
          queryParams= queryParams.append("id_depotprovince", id_depotprovince);
          return this.http.get<ObjectDepotzoneWithInstance[]>(this.depotsUrl+'/depotzoneWithInstance', {params:queryParams});
    }

    //depotprovince
    public ListeDepotprovinceWithInstance(id_depotagence: number): Observable<ObjectdepotprovinceWithInstance[]>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("id_depotagence", id_depotagence);
      return this.http.get<ObjectdepotprovinceWithInstance[]>(this.depotsUrl+'/depotprovinceWithInstance', {params:queryParams});
    }

    //depotagence
    public ListeDepotagenceWithInstance(annee: number): Observable<ObjectDepotagenceWithInstance[]>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectDepotagenceWithInstance[]>(this.depotsUrl+'/depotagenceWithInstance', {params:queryParams});
    }



}