import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError} from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IToken } from '../interfaces/IToken';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  refreshBoolean= false;

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
   
    

    let accessToken= this.authenticationService.getAccessToken();
    let refreshToken= this.authenticationService.getRefreshToken();

    
    if(accessToken!=null && !request.url.includes('refreshToken'))
    {
        const req= request.clone({
          setHeaders:{
            Authorization: 'Bearer '+accessToken
          }
        });

        return next.handle(req).pipe(catchError( (err: HttpErrorResponse) => {
              if((err.status===401 || err.status===403) && !this.refreshBoolean){
                this.refreshBoolean=true;

                let header= new HttpHeaders();
                header=header.set('Authorization','Bearer '+refreshToken);
                return this.http.post('http://localhost:9001'+'/refreshToken','',{headers:header}).pipe(
                  switchMap((res:any)=>{
                    localStorage.setItem("access_token",res.access_token);
                    localStorage.setItem("refresh_token",res.refresh_token);
                    accessToken=this.authenticationService.getAccessToken();
                    

                    return next.handle(request.clone({
                      setHeaders:{
                        Authorization: 'Bearer '+accessToken
                      }
                    })); 
                  })
                );
              }
          this.refreshBoolean=false;    
          return throwError(()=>err);
        }));
    }
    
    
    return next.handle(request);
  }
}
export const TokenInterceptorProvider={
  provide: HTTP_INTERCEPTORS,
  useClass:TokenInterceptor,
  multi: true
}