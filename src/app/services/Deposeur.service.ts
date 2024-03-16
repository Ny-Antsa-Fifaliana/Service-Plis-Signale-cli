import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { DeposeurBean } from "../models/DeposeurBean.model";
import { ResponseMessage } from "../models/ResponseMessage.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
  export class DeposeurService{
    private deposeursUrl: string;
    refreshSubject$ = new Subject<void>();

    constructor(private env: EnvService,
                private http: HttpClient){
      this.deposeursUrl=env.getBaseUrl();
    }

    public ListerDeposeur(): Observable<DeposeurBean[]> {
      return this.http.get<DeposeurBean[]>(this.deposeursUrl+'/deposeurs');
    }

    public SaveDeposeur(deposeur: DeposeurBean): Observable<any>{
      return this.http.post<any>(this.deposeursUrl+'/deposeur', deposeur).pipe(
        tap(()=>{this.refreshSubject$.next();}));
    }

    public UpdateDeposeur(deposeur: DeposeurBean): Observable<any>{
      return this.http.put<any>(this.deposeursUrl+'/deposeur', deposeur);
    }

    public DeleteDeposeurByIdDeposeur(idDeposeur: number){
      let queryParams1=new HttpParams(); 
      queryParams1= queryParams1.append("idDeposeur",idDeposeur);
  
      this.http.delete(this.deposeursUrl+'/deposeur',{params:queryParams1}).pipe(
        tap(()=>{this.refreshSubject$.next();})).subscribe();
    }

    public getDeposeurByIdDeposeur(idDeposeur: number): Observable<DeposeurBean>{
      let queryParams=new HttpParams(); 
      queryParams= queryParams.append("idDeposeur", idDeposeur);
      return this.http.get<DeposeurBean>(this.deposeursUrl+'/deposeur', {params:queryParams});
    }
    
  }