import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ObjectZoneProvinceBean } from '../models/ObjectZoneProvinceBean.model';
import { ProvinceBean } from '../models/ProvinceBean.model';
import { ZoneBean } from '../models/ZoneBean.model';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zonesUrl: string;
  objectZoneProvince!: ObjectZoneProvinceBean;
  objectZoneProvinceDelete!: ObjectZoneProvinceBean;
  refreshSubjectDelete$ = new Subject<void>();

  constructor(private env: EnvService,
              private http: HttpClient) {
    this.zonesUrl = env.getBaseUrl();
  }

  public SaveZone(zone: ZoneBean, currentProvince:ProvinceBean): Observable<any>{
    this.objectZoneProvince= new ObjectZoneProvinceBean(zone,currentProvince);

    return this.http.post<any>(this.zonesUrl+'/zone',this.objectZoneProvince).pipe(
      tap(()=>{this.refreshSubjectDelete$.next();}));
  }

  public UpdateZone(zone: ZoneBean): Observable<any>{
    return this.http.put<any>(this.zonesUrl+'/zone',zone);
  }

  public getZoneByIdZone(idZone: number): Observable<ZoneBean>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("idZone", idZone);
    return this.http.get<ZoneBean>(this.zonesUrl+'/zone', {params:queryParams});
  }

  public deleteZoneByIdZone(zone: ZoneBean, currentProvince: ProvinceBean){
    this.objectZoneProvinceDelete= new ObjectZoneProvinceBean(zone,currentProvince);

    this.http.delete(this.zonesUrl+'/zone', {body:this.objectZoneProvinceDelete}).pipe(
      tap(()=>{this.refreshSubjectDelete$.next();})
    ).subscribe();
  }

  public getZoneByIdDepotProvince(codeProvince: number,idDepotProvince: number): Observable<ZoneBean[]>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("code_province",codeProvince);
    queryParams= queryParams.append("id_depotprovince",idDepotProvince);
    return this.http.get<ZoneBean[]>(this.zonesUrl+'/zonedepotzone',{params:queryParams});
  }


}
