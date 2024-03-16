import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeposeurBean } from 'src/app/models/DeposeurBean.model';
import { DeposeurService } from 'src/app/services/Deposeur.service';
import { Subject, switchAll} from "rxjs";
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-deposeur',
  templateUrl: './deposeur.component.html',
  styleUrls: ['./deposeur.component.scss']
})
export class DeposeurComponent implements OnInit, AfterViewInit, OnDestroy{

  deposeurs!: DeposeurBean[];

  dtOptions: DataTables.Settings={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  constructor(private deposeurService: DeposeurService,
              private router: Router,
              public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers'
    };
    this.deposeurService.refreshSubject$.subscribe(()=>{
      this.reloadDeposeur();
      })
    this.reloadDeposeur();
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); 
  
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }
  rerender():void{
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next(null);
    }).catch(err=>{
      
    })
  }

  public reloadDeposeur(){
    this.deposeurService.ListerDeposeur().subscribe(data=>{
      this.deposeurs=data; 
      this.rerender();
      }); 
  }

  public viewAddDeposeurForm(){
    this.router.navigate(['/sps','deposeur','add']);
  }

  public viewUpdateDeposeur(nomDeposeur: string, idDeposeur: number){
    this.router.navigate(['/sps','deposeur','update',nomDeposeur,idDeposeur]);
  }

  public deleteDeposeurByCodeIdDeposeur(idDeposeur: number){
    this.deposeurService.DeleteDeposeurByIdDeposeur(idDeposeur);
    
  }

  public deleteWarning(deposeur: DeposeurBean){
    const nom =deposeur.nomDeposeur;
    Swal.fire({
      title: 'Voulez-vous supprimer '+nom+' ?',
      text: "Il sera supprimé définitivement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) { 
        this.deleteDeposeurByCodeIdDeposeur(deposeur.idDeposeur);
        Swal.fire(
          'Supprimer!',
          nom+' a été supprimer avec succès!',
          'success'
        )
      }
    })
  }

}
