import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class EtatService {
    refreshSubjectEtat$ = new Subject<void>();

constructor(){}

}