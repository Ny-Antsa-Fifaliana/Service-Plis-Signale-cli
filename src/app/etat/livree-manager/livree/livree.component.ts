import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotBean } from 'src/app/models/DepotBean.model';
import { LivreeBean } from 'src/app/models/LivreeBean.model';
import { ZoneBean } from 'src/app/models/ZoneBean.model';
import { DepotService } from 'src/app/services/Depot.service';
import { LivreeService } from 'src/app/services/Livree.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livree',
  templateUrl: './livree.component.html',
  styleUrls: ['./livree.component.scss']
})
export class LivreeComponent implements OnInit ,AfterViewInit, OnDestroy{

  currentDepot: DepotBean={} as DepotBean;
  nbDepotagence!: number;
  nbDepotprovince!: number;
  idDepot!: number;
  idDepotprovince!: number;
  idDepotagence!: number;
  lienEtat: string="";
  lienDepotzone: string="";
  lienDepotprovince: string="";

  FormEtat_addLivree!: FormGroup;
  newDepot!: DepotBean;
  newNbLivree!: number;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  nomZone!: string;
  L: number=0;
  count: number=0;

  percent!: number;
  bool: boolean=false;
  constructor(
              private livreeService: LivreeService,
              private depotService: DepotService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'Livrée',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Livrée',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Livrée',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Livrée',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3]
          } 
         }
      ,
      {
       extend:'print',
       title:'Livrée',
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
    this.idDepot= this.route.snapshot.params['idDepot'];
    this.nbDepotagence= this.route.snapshot.params['nbDepotagence'];
    this.nbDepotprovince= this.route.snapshot.params['nbDepotprovince'];
    this.idDepotprovince= this.route.snapshot.params['idDepotprovince'];
    this.idDepotagence= this.route.snapshot.params['idDepotagence'];
    this.lienEtat="/sps/etat/"+this.nbDepotagence+"/"+this.nbDepotprovince+"/"+this.idDepot+"/"+this.idDepotprovince+"/"+this.idDepotagence;

    this.lienDepotzone="/sps/depot/"+this.nbDepotagence+"/"+this.idDepotprovince+"/"+this.idDepotagence;
    this.lienDepotprovince="/sps/depotprovince/"+this.idDepotagence;


    this.livreeService.refreshSubjectLivree$.subscribe(()=>{
      this.reloadDepot();
     });
     
     this.reloadDepot();
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
 

  iniForm() {
    this.FormEtat_addLivree=this.formBuilder.group({
      nbLivree: ['', Validators.required],
    });
  }

  reloadDepot(){
    this.depotService.getDepotByIdDepot(this.idDepot).subscribe(data=>{
      this.currentDepot=data;
      this.percent=0;
      this.L=0;
      for(this.count=0; this.count<this.currentDepot.etatByDepot_list.length; this.count++){
        this.L+= this.currentDepot.etatByDepot_list[this.count].mvtLivree;
      }
      this.nomZone=this.currentDepot.zoneByDepot.nomZone;
      
      this.percent=(this.L*100)/this.currentDepot.nbDepot;
      this.bool=true;
      this.rerender();
    });
  }

  deleteLivreeByIdLivree(idLivree: number){
    this.livreeService.deleteLivreeByIdLivree(this.currentDepot.idDepot,idLivree);
  }

  onAddLivree(){
    const nbLivree= this.FormEtat_addLivree.get('nbLivree')?.value;
    this.newNbLivree=nbLivree;
    
    this.livreeService.SaveEtatLivree(this.currentDepot.idDepot,this.newNbLivree).subscribe({
      next:(data)=>{
      this.newDepot=data;
      if(data.body!=null){
        if(data.message.includes("Verifier")){
          this.popupError(data.message);
        }
        else if(this.currentDepot.nbDepot<nbLivree){
          this.popupError("Le nombre que vous avez saisi est incorrect! Veuillez verifier le nombre de dépôt dans cette agence!!");
        }
        else{
          this.popup(data.message);
          this.FormEtat_addLivree.reset();
        }
      }
      
      else{
        this.popupError(data.message);
      }
      
      },
      error:(err)=>{
      //  this.popupError(data.message);
      }
    });
  }
  popupError(message: string){
    Swal.fire(" Erreur!", message, "warning");
  }
  popup(message:string){
    const nbLivree= this.FormEtat_addLivree.get('nbLivree')?.value;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: message
    })
  }


  deleteWarning(livree: LivreeBean){
    const nb =livree.nbLivree;
    const date= livree.dateLivree;
    Swal.fire({
      title: 'Supprimer '+nb+' livrée(s) du '+date+'?',
      text: "Il sera supprimé définitivement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteLivreeByIdLivree(livree.idLivree);
        Swal.fire(
          'Supprimer!',
          nb+' livrée(s) a été supprimer avec succès!',
          'success'
        )
      }
    })

  }
}
