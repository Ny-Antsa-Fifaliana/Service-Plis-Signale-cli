import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { MotifBean } from "../models/MotifBean.model";
import { EnvService } from "./env.service";

@Injectable({
    providedIn: 'root'
  })
  export class MotifService{
    private motifsUrl: string;
    refreshSubject$ = new Subject<void>();

    constructor(private env: EnvService,
                private http: HttpClient){
      this.motifsUrl=env.getBaseUrl();
    }

    public ListerMotif(): Observable<MotifBean[]> {
        return this.http.get<MotifBean[]>(this.motifsUrl+'/motifs');
      }
  
      public SaveMotif(motif: MotifBean): Observable<any>{
        return this.http.post<any>(this.motifsUrl+'/motif', motif).pipe(
          tap(()=>{this.refreshSubject$.next();}));
      }
  
      public UpdateMotif(motif: MotifBean): Observable<any>{
        return this.http.put<any>(this.motifsUrl+'/motif', motif);
      }
  
      public DeleteMotifByIdMotif(idMotif: number){
        let queryParams1=new HttpParams(); 
        queryParams1= queryParams1.append("idMotif",idMotif);
    
        this.http.delete(this.motifsUrl+'/motif',{params:queryParams1}).pipe(
          tap(()=>{this.refreshSubject$.next();})).subscribe();
      }
  
      public getMotifByIdMotif(idMotif: number): Observable<MotifBean>{
        let queryParams=new HttpParams(); 
        queryParams= queryParams.append("idMotif", idMotif);
        return this.http.get<MotifBean>(this.motifsUrl+'/motif', {params:queryParams});
      }
  }