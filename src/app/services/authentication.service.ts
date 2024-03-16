import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, tap } from 'rxjs';
import { AppRole } from '../models/AppRole.model';
import { AppUser } from '../models/AppUser.model';
import { RoleUserBean } from '../models/RoleUserBean.model';
import { IToken } from '../security/interfaces/IToken';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl: string;
  refreshSubject$ = new Subject<void>();
  users!: AppUser;


  stringArray!: string[];

  
  constructor(private env: EnvService,
              private http: HttpClient,
              private router: Router) { 
    this.loginUrl=env.getBaseUrl();
  }

  public ListerUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.loginUrl+'/users');
  } 

  public SaveUser(appUser: AppUser): Observable<any>{
    return this.http.post<any>(this.loginUrl+'/addusers', appUser).pipe(
      tap(()=>{this.refreshSubject$.next();}));
  }

  public UpdateUser(appUser: AppUser): Observable<any>{
    return this.http.put<any>(this.loginUrl+'/users', appUser);
  }

  public UpdateMdpUser(appUser: AppUser): Observable<any>{
    return this.http.put<any>(this.loginUrl+'/mdpusers', appUser);
  }

  public DeleteAppUserById(id: number){
    let queryParams1=new HttpParams(); 
    queryParams1= queryParams1.append("id",id);

    this.http.delete(this.loginUrl+'/users',{params:queryParams1}).pipe(
      tap(()=>{this.refreshSubject$.next();})).subscribe();
  }

  public getUserById(id: number): Observable<AppUser>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("id", id);
    return this.http.get<AppUser>(this.loginUrl+'/user', {params:queryParams});
  }

  // ---------------------------------------------------------

  public ListerRoles(): Observable<AppRole[]> {
    return this.http.get<AppRole[]>(this.loginUrl+'/roles');
  }
  
  public ListerRolesByAppUserRole(id: number): Observable<AppRole[]> {
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("id", id);
    return this.http.get<AppRole[]>(this.loginUrl+'/rolesByAppUserRole',{params:queryParams});
  }

  public SaveRole(appRole: AppRole): Observable<any>{
    return this.http.post<any>(this.loginUrl+'/roles', appRole).pipe(
      tap(()=>{this.refreshSubject$.next();}));
  }

  public UpdateRole(appRole: AppRole): Observable<AppRole>{
    return this.http.put<AppRole>(this.loginUrl+'/roles', appRole);
  }

  public DeleteAppRoleById(id: number){
    let queryParams1=new HttpParams(); 
    queryParams1= queryParams1.append("id",id);

    this.http.delete(this.loginUrl+'/roles',{params:queryParams1}).pipe(
      tap(()=>{this.refreshSubject$.next();})).subscribe();
  }

  public getRoleById(id: number): Observable<AppRole>{
    let queryParams=new HttpParams(); 
    queryParams= queryParams.append("id", id);
    return this.http.get<AppRole>(this.loginUrl+'/role', {params:queryParams});
  }

  // ------------------------------------------------------------------------------

  public login(username: string, password:string): Observable<IToken>{
    const formData= new FormData();
    formData.append('username',username);
    formData.append('password',password);

    return this.http.post<IToken>(this.loginUrl+'/login',formData ).pipe(
      tap(()=>{this.refreshSubject$.next();}));
  }

  public logout(): Observable<boolean>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("authUser");
    
    return of(true);
  }


  public addRoleToUser(roleUser: RoleUserBean){
    return this.http.post(this.loginUrl+'/addRoleToUser', roleUser).pipe(
      tap(()=>{this.refreshSubject$.next();}));
  }

  public removeRoleToUser(roleUser: RoleUserBean){
    return this.http.post(this.loginUrl+'/removeRoleToUser', roleUser).pipe(
      tap(()=>{this.refreshSubject$.next();}));
  }


  public GetProfile(): Observable<AppUser>{
    return this.http.get<AppUser>(this.loginUrl+'/profile');
  }

  public authenticateUser(appUser:AppUser): Observable<boolean>{
    localStorage.setItem("authUser",JSON.stringify(appUser));
    return of(true);  
  }

  public getLocalUserProfile(): Observable<string> {
    let principal=localStorage.getItem("authUser");
    if(principal){
      return of(principal);
    }
    return of('');
  }

  public hasRole(role: string): boolean{
    this.stringArray=[];
    this.users=JSON.parse(localStorage.getItem("authUser")+'');
    if(this.users!=null){
      let i=0
      for(i; i< this.users.appRoles.length; i++){
        this.stringArray.push(this.users.appRoles[i].roleName);
        
      }
    }
    return this.stringArray.includes(role);
  }

  public isAuthenticated(){
    return localStorage.getItem("authUser")!=null;
  }

  

  public getAccessToken(): string | null{
    return localStorage.getItem('access_token');
  }
  public getRefreshToken(): string | null{
    return localStorage.getItem('refresh_token');
  }

  public refreshToken(){
    let header= new HttpHeaders();
    header=header.set('Authorization','Bearer '+this.getRefreshToken());
   
    return this.http.post<IToken>(this.loginUrl+'/refreshToken',{headers:header});
  }
  
} 