import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ProvinceBean } from '../models/ProvinceBean.model';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private provincesUrl: string;
  refreshSubject$ = new Subject<void>();


  constructor(private env: EnvService,
              private http: HttpClient) { 
    this.provincesUrl = env.getBaseUrl();
  }


  public ListerProvince(): Observable<ProvinceBean[]> {
    return this.http.get<ProvinceBean[]>(this.provincesUrl+'/provinces');
  }

  public getProvinceByCodeProvince(codeProvince: number): Observable<ProvinceBean>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("codeProvince",codeProvince);
    return this.http.get<ProvinceBean>(this.provincesUrl+'/province',{params:queryParams});
  }

  public getProvinceByIdZone(idZone: number): Observable<ProvinceBean>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("idZone",idZone);
    return this.http.get<ProvinceBean>(this.provincesUrl+'/province_by_idzone',{params:queryParams});
  }

  public SaveProvince(province: ProvinceBean): Observable<any>{
    return this.http.post<any>(this.provincesUrl+'/province',province).pipe(
      tap(()=>{this.refreshSubject$.next();}));
  }

  public UpdateProvince(province: ProvinceBean): Observable<any>{
    return this.http.put<any>(this.provincesUrl+'/province',province);
  }

  public DeleteProvinceByCodeProvince(codeProvince: number){
    let queryParams1=new HttpParams(); 
    queryParams1= queryParams1.append("codeProvince",codeProvince);

    this.http.delete(this.provincesUrl+'/province',{params:queryParams1}).pipe(
      tap(()=>{this.refreshSubject$.next();})
    ).subscribe();
  }



  public getProvinceByIdDepotAgence(idDepotAgence: number): Observable<ProvinceBean[]>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("id_depotagence",idDepotAgence);
    return this.http.get<ProvinceBean[]>(this.provincesUrl+'/province_by_depotagence',{params:queryParams});
  }
 



}









/*
Izay tsy miova page iany no pipena 
ex: delete
.pipe(
      tap(()=>{this.refreshSubject$.next();})
    );
*/