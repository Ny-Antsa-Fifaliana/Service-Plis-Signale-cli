import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotAgenceBean } from 'src/app/models/DepotAgenceBean.model';
import { EtatBean } from 'src/app/models/EtatBean.model';
import { ObjectDepotagenceWithInstance } from 'src/app/models/ObjectDepotagenceWithInstance.model';
import { DepotService } from 'src/app/services/Depot.service';
import { Depot_agenceService } from 'src/app/services/Depot_agence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depot-agence',
  templateUrl: './depot-agence.component.html',
  styleUrls: ['./depot-agence.component.scss']
})
export class DepotAgenceComponent implements OnInit, AfterViewInit, OnDestroy {

  Form!: FormGroup;

  selectYearValue!: number;
  ObjectYearSelected!: number;

  currentDepotAgence!: DepotAgenceBean;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  depotagences_and_instances: ObjectDepotagenceWithInstance[]= [];
  totalDepotagence: number=0;


  years: any=[];
  currentYear : number;
  count: number;
  yearVar!: number;
  i: number=0;  


  constructor(private formBuilder: FormBuilder,
              public depotAgenceService: Depot_agenceService,
              private router: Router,
              private depotService: DepotService) {
                this.currentYear=new Date().getFullYear();
                this.count=this.currentYear-500;
                
               }

  ngOnInit(): void {
    this.depotAgenceService.emitChange(this.currentYear);
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'LISTE DES DEPOT AGENCES',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'LISTE DES DEPOT AGENCES',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
      {
          extend:'csv',
          title:'LISTE DES DEPOT AGENCES',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3]
          } 
      }
      ,
      {
          extend:'copy',
          title:'LISTE DES DEPOT AGENCES',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3]
          } 
         }
      ,
      {
       extend:'print',
       title:'LISTE DES DEPOT AGENCES',
       text:'Imprimer',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      },
      {
        extend:'colvis',
        text:'visibilité des colonnes'
      }
    ]
    };
    this.iniForm();
    this.depotAgenceService.refreshSubject$.subscribe(()=>{
    
      this.reloadDepotAgence();
      })
    this.reloadDepotAgence();
  }


  ngOnDestroy(): void {
    this.depotAgenceService.emitChange(this.currentYear);
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

  iniForm() {
    this.Form=this.formBuilder.group({
      annee: ['', Validators.required]
    });
  }


  public reloadDepotAgence(){
    this.i=0;
    this.yearVar=this.currentYear;
    
    for(this.yearVar; this.yearVar >= this.count; this.yearVar--){
      this.years[this.i]= this.yearVar;
      this.i++;
    }
      
    this.depotService.ListeDepotagenceWithInstance(this.currentYear).subscribe(data=>{
      this.depotagences_and_instances=data;

      this.totalDepotagence=0;
      this.depotagences_and_instances.forEach(elt=>{
        this.totalDepotagence+=elt.nb_depotagence;
      });

       this.rerender();
    });
  }

  ChangeSelectYear(e: any){
    this.depotAgenceService.emitChangeBadgeValue(false);
    this.selectYearValue=e.value;
    if(this.selectYearValue!=null){
      this.depotAgenceService.emitChange(this.selectYearValue);

       this.depotService.ListeDepotagenceWithInstance(this.selectYearValue).subscribe(data=>{
        this.depotagences_and_instances=data;

        this.totalDepotagence=0;
        this.depotagences_and_instances.forEach(elt=>{
          this.totalDepotagence+=elt.nb_depotagence;
        });

         this.rerender();
      });

    }
  }

  public viewAddDepotAgenceForm(){
    this.router.navigate(['/sps','depotagence','add']);
  }

  public viewDepotProvinceOfDepotAgence(idDepotAgence: number){
    this.router.navigate(['/sps','depotprovince',idDepotAgence]);
  }


  deleteDepotAgenceByIdDepotAgence(idDepotAgence: number){
    this.depotAgenceService.getDepotAgenceByIdDepotAgence(idDepotAgence).subscribe(data=>{
    this.currentDepotAgence=data;
    this.depotAgenceService.deleteDepotAgenceByIdDepotAgence(idDepotAgence,this.currentDepotAgence.deposeurByDepotAgence.idDeposeur);
    });
 }


 public deleteWarning(depotAgence: any){
  const nb =depotAgence.nb_depotagence;
  Swal.fire({
    title: 'Voulez-vous supprimer le dépôt '+nb+'?',
    text: "Il sera supprimé définitivement !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor:'#d33',
    cancelButtonColor:  '#3085d6',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Oui, Supprimer!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteDepotAgenceByIdDepotAgence(depotAgence.id_depotagence);
      Swal.fire(
        'Supprimer!',
        ' Dépôt '+nb+' du '+depotAgence.nom_deposeur+' a été supprimer avec succès!',
        'success'
      ) 
    }
  })
}


}
