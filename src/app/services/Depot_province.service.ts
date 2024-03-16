import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { DepotProvinceBean } from "../models/DepotProvinceBean.model";
import { ObjectDepotProvinceDepotAgenceProvince } from "../models/ObjectDepotProvinceDepotAgenceProvince.model";
import { ObjectDepotProvinceDepotAgenceProvinceDelete } from "../models/ObjectDepotProvinceDepotAgenceProvinceDelete.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })

  export class Depot_provinceService{
    private depot_provinceUrl: string;
    refreshSubject$ = new Subject<void>();
    objectDepotProvinceDepotAgenceProvince!: ObjectDepotProvinceDepotAgenceProvince;
    objectDepotProvinceDepotAgenceProvinceDelete!: ObjectDepotProvinceDepotAgenceProvinceDelete;

    constructor(private env: EnvService,
                private http: HttpClient) { 
        this.depot_provinceUrl = env.getBaseUrl();
    }


    public getDepotProvinceByIdDepotProvince(idDepotProvince: number): Observable<DepotProvinceBean>{
        let queryParams=new HttpParams(); 
        queryParams= queryParams.append("idDepotProvince", idDepotProvince);
        return this.http.get<DepotProvinceBean>(this.depot_provinceUrl+'/depotProvince', {params:queryParams});
    }

// not refresh so using pipe-------------------------------
    public SaveDepotProvince(nbDepotProvince: number, IdDepotAgence:number, codeProvince: number): Observable<any>{
        this.objectDepotProvinceDepotAgenceProvince= new ObjectDepotProvinceDepotAgenceProvince(nbDepotProvince,IdDepotAgence,codeProvince);
         
          return this.http.post<any>(this.depot_provinceUrl+'/depotProvince',this.objectDepotProvinceDepotAgenceProvince).pipe(
          tap(()=>{this.refreshSubject$.next();}));
     }
    
    public deleteDepotProvinceByIdDepotProvince(idDepotProvince: number, idDepotAgence: number, codeProvince: number){
        this.objectDepotProvinceDepotAgenceProvinceDelete= new ObjectDepotProvinceDepotAgenceProvinceDelete(idDepotProvince,idDepotAgence,codeProvince);
    
        this.http.delete(this.depot_provinceUrl+'/depotProvince', {body:this.objectDepotProvinceDepotAgenceProvinceDelete}).pipe(
          tap(()=>{this.refreshSubject$.next();})
        ).subscribe();
    }

    

  }