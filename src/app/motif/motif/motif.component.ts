import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MotifBean } from 'src/app/models/MotifBean.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotifService } from 'src/app/services/MotifService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motif',
  templateUrl: './motif.component.html',
  styleUrls: ['./motif.component.scss']
})
export class MotifComponent implements OnInit, AfterViewInit, OnDestroy {

  motifs!: MotifBean[];

  dtOptions: DataTables.Settings={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;
  constructor(private motifService: MotifService,
              private router: Router,
              public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers'
    };
    this.motifService.refreshSubject$.subscribe(()=>{
      this.reloadMotif();
      })
    this.reloadMotif();
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

  public reloadMotif(){
    this.motifService.ListerMotif().subscribe(data=>{
      this.motifs=data; 
      this.rerender();
      }); 
  }

  public viewAddMotifForm(){
    this.router.navigate(['/sps','motif','add']);
  }

  public viewUpdateMotif(nomMotif: string, idMotif: number){
    this.router.navigate(['/sps','motif','update',nomMotif,idMotif]);
  }

  public deleteMotifByIdMotif(idMotif: number){
    this.motifService.DeleteMotifByIdMotif(idMotif);
    
  }
  public deleteWarning(motif: MotifBean){
    const nom =motif.nomMotif;
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
        this.deleteMotifByIdMotif(motif.idMotif);
        Swal.fire(
          'Supprimer!',
          nom+' a été supprimer avec succès!',
          'success'
        )
      }
    })
  }

}
