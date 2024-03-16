import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { MensuelZoneBean } from "../models/MensuelZoneBean.model";
import { ObjectRapport_depotagence } from "../models/ObjectRapport_depotagence.model";
import { ObjectRapport_depotprovince } from "../models/ObjectRapport_depotprovince.model";
import { ObjectRapport_depotzone } from "../models/ObjectRapport_depotzone.model";
import { ObjectRapport_mois } from "../models/ObjectRapport_mois.model";
import { ObjectRapport_quinzieme } from "../models/ObjectRapport_quinzieme.model";
import { ObjectRapport_semaine } from "../models/ObjectRapport_semaine.model";
import { ObjectRapport_total_depotagence } from "../models/ObjectRapport_total_depotagence.model";
import { ObjectRapport_total_depotprovince_year } from "../models/ObjectRapport_total_depotprovince_year.model";
import { ObjectRapport_total_LR } from "../models/ObjectRapport_total_LR.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
  export class RapportService {
    
    private rapportsUrl: string;
    refreshSubject$ = new Subject<void>();

    constructor(private env: EnvService,
                private http: HttpClient) { 
        this.rapportsUrl = env.getBaseUrl();
      }
// annee---------------------------------------------
    public rapportAnneeDepotagence(annee: number): Observable<ObjectRapport_depotagence[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_depotagence[]>(this.rapportsUrl+'/rapport_depotagence', {params:queryParams});
    }

    public rapportDepotprovince(id_depotagence: number): Observable<ObjectRapport_depotprovince[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotagence", id_depotagence);
      return this.http.get<ObjectRapport_depotprovince[]>(this.rapportsUrl+'/rapport_depotprovince', {params:queryParams});
    }

    public rapportDepotzone(id_depotprovince: number): Observable<ObjectRapport_depotzone[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotprovince", id_depotprovince);
      return this.http.get<ObjectRapport_depotzone[]>(this.rapportsUrl+'/rapport_depotzone', {params:queryParams});
    }



// mois---------------------------------------------

    public rapportMoisDepotagence(id_depotagence: number): Observable<ObjectRapport_mois[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotagence", id_depotagence);
      return this.http.get<ObjectRapport_mois[]>(this.rapportsUrl+'/rapport_depotagence_mois', {params:queryParams});
    }

    public rapportMoisDepotprovince(id_depotprovince: number): Observable<ObjectRapport_mois[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotprovince", id_depotprovince);
      return this.http.get<ObjectRapport_mois[]>(this.rapportsUrl+'/rapport_depotprovince_mois', {params:queryParams});
    }

    public rapportMoisDepotzone(id_depot: number): Observable<ObjectRapport_mois[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depot", id_depot);
      return this.http.get<ObjectRapport_mois[]>(this.rapportsUrl+'/rapport_depotzone_mois', {params:queryParams});
    }


// Semaine---------------------------------------------

    public rapportSemaineDepotagence(id_depotagence: number): Observable<ObjectRapport_semaine[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotagence", id_depotagence);
      return this.http.get<ObjectRapport_semaine[]>(this.rapportsUrl+'/rapport_depotagence_semaine', {params:queryParams});
    }

    public rapportSemaineDepotprovince(id_depotprovince: number): Observable<ObjectRapport_semaine[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotprovince", id_depotprovince);
      return this.http.get<ObjectRapport_semaine[]>(this.rapportsUrl+'/rapport_depotprovince_semaine', {params:queryParams});
    }

    public rapportSemaineDepotzone(id_depot: number): Observable<ObjectRapport_semaine[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depot", id_depot);
      return this.http.get<ObjectRapport_semaine[]>(this.rapportsUrl+'/rapport_depotzone_semaine', {params:queryParams});
    }


// 15 em du mois---------------------------------------------

    public rapportQuinziemeDepotagence(id_depotagence: number): Observable<ObjectRapport_quinzieme[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotagence", id_depotagence);
      return this.http.get<ObjectRapport_quinzieme[]>(this.rapportsUrl+'/rapport_depotagence_quinzieme', {params:queryParams});
    }

    public rapportQuinziemeDepotprovince(id_depotprovince: number): Observable<ObjectRapport_quinzieme[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depotprovince", id_depotprovince);
      return this.http.get<ObjectRapport_quinzieme[]>(this.rapportsUrl+'/rapport_depotprovince_quinzieme', {params:queryParams});
    }

    public rapportQuinziemeDepotzone(id_depot: number): Observable<ObjectRapport_quinzieme[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("id_depot", id_depot);
      return this.http.get<ObjectRapport_quinzieme[]>(this.rapportsUrl+'/rapport_depotzone_quinzieme', {params:queryParams});
    }


// Dashboard ---------------------------------------------
    public rapportTotalLivreeRetourYear(annee: number): Observable<ObjectRapport_total_LR[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_total_LR[]>(this.rapportsUrl+'/rapport_total_LR', {params:queryParams});
    }


    public rapportTotalDepotagenceYear(annee: number): Observable<ObjectRapport_total_depotagence>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_total_depotagence>(this.rapportsUrl+'/rapport_total_depotagence', {params:queryParams});
    }


    public rapportTotalDepotprovinceYear(annee: number): Observable<ObjectRapport_total_depotprovince_year[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_total_depotprovince_year[]>(this.rapportsUrl+'/rapport_total_depotprovince', {params:queryParams});
    }


// Total ------------------------------------------------------------
    //mois
    public rapportMoisTotal(annee: number): Observable<ObjectRapport_mois[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_mois[]>(this.rapportsUrl+'/rapport_total_mois', {params:queryParams});
    }

    //Semaine
    public rapportSemaineTotal(annee: number): Observable<ObjectRapport_semaine[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_semaine[]>(this.rapportsUrl+'/rapport_total_semaine', {params:queryParams});
    }

    //15 em du mois
    public rapportQuinziemeTotal(annee: number): Observable<ObjectRapport_quinzieme[]>{
      let queryParams=new HttpParams();
      queryParams= queryParams.append("annee", annee);
      return this.http.get<ObjectRapport_quinzieme[]>(this.rapportsUrl+'/rapport_total_quinzieme', {params:queryParams});
    }

}