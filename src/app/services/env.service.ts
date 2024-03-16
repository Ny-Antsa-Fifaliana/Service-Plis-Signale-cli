import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  private baseUrl;
  constructor() { 
    this.baseUrl=environment.apiUrl;
  }

  /**
   * getBaseUrl
   */
  public getBaseUrl() {
    return this.baseUrl;    
  }
}
