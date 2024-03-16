import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotBean } from 'src/app/models/DepotBean.model';
import { MotifBean } from 'src/app/models/MotifBean.model';
import { RetourBean } from 'src/app/models/RetourBean.model';
import { DepotService } from 'src/app/services/Depot.service';
import { MotifService } from 'src/app/services/MotifService.service';
import { RetourService } from 'src/app/services/Retour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retour',
  templateUrl: './retour.component.html',
  styleUrls: ['./retour.component.scss']
})
export class RetourComponent implements OnInit, AfterViewInit, OnDestroy {

  currentDepot: DepotBean={} as DepotBean;
  currentRetour!: RetourBean; 
  nbDepotagence!: number;
  nbDepotprovince!: number;
  idDepot!: number;
  idDepotprovince!: number;
  idDepotagence!: number;
  lienEtat: string="";
  lienDepotzone: string="";
  lienDepotprovince: string="";

  FormEtat_addRetour!: FormGroup;
  newMotifRetour!: string;
  newDepot!: DepotBean;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  R: number=0;
  count: number=0;

  percent!: number;
  bool: boolean=false;
  nomZone!: string;

  motifs!: MotifBean[];
  selectMotifValue!: number;
  ObjectMotifSelected!: MotifBean;

  constructor(
              private retourService: RetourService,
              private depotService: DepotService,
              private motifService: MotifService,
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
       title:'Retour',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Retour',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Retour',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Retour',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4]
          } 
         }
      ,
      {
       extend:'print',
       title:'Retour',
       text:'Imprimer',
       exportOptions:{
        columns:[0,1,2,3,4]
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

    this.retourService.refreshSubjectRetour$.subscribe(()=>{
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
    this.FormEtat_addRetour=this.formBuilder.group({
      nbRetour: ['', Validators.required],
      motifRetour: ['', Validators.required]
    });
  }

  reloadDepot(){
    this.depotService.getDepotByIdDepot(this.idDepot).subscribe(data=>{
      this.currentDepot=data;
      this.percent=0;
      this.R=0;

      for(this.count=0; this.count<this.currentDepot.etatByDepot_list.length; this.count++){
        this.R+= this.currentDepot.etatByDepot_list[this.count].mvtRetour;
      }
      this.percent=(this.R*100)/this.currentDepot.nbDepot;
      this.nomZone=this.currentDepot.zoneByDepot.nomZone;
      this.bool=true;
      this.reloadMotif();
      this.rerender();
    });
  }

  public reloadMotif(){
    this.motifService.ListerMotif().subscribe(data=>{
      this.motifs=data;
      });
  }


  ChangeSelectMotif(e: any){
    this.selectMotifValue=e.value;
    this.motifService.getMotifByIdMotif(this.selectMotifValue).subscribe(data=>{
      this.ObjectMotifSelected= data;
    });
  }
  
  deleteRetourByIdRetour(idRetour: number, idMotif: number){
    this.retourService.deleteRetourByIdRetour(this.currentDepot.idDepot,idRetour,idMotif);
 }

 onAddRetour(){
  const nbRetour= this.FormEtat_addRetour.get('nbRetour')?.value;
  const motifRetour= this.FormEtat_addRetour.get('motifRetour')?.value;
  this.newMotifRetour=motifRetour;

  this.retourService.SaveEtatRetour(this.currentDepot.idDepot,nbRetour,this.ObjectMotifSelected.idMotif).subscribe({
    next:(data)=>{
    this.newDepot=data;
    if(data.body!=null){
      if(data.message.includes("Verifier")){
        this.popupError(data.message);
      }
      else if(this.currentDepot.nbDepot< nbRetour){
        this.popupError("Le nombre que vous avez saisi est incorrect! Veuillez verifier le nombre de dépôt dans cette agence!!");
      }
  
      else{
        this.popup(data.message);
        this.FormEtat_addRetour.reset();
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
  const nbRetour= this.FormEtat_addRetour.get('nbRetour')?.value;
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


  deleteWarning(retour: RetourBean){
    const nbRetour= retour.nbRetour;
    const motif= retour.motifRetour;
    const date= retour.dateRetour;
    Swal.fire({
      title: 'Supprimer '+nbRetour +' retour(s), motif: '+ motif+' du '+date+' ?',
      text: "Il sera supprimé définitivement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRetourByIdRetour(retour.idRetour, retour.motifByRetour.idMotif);
        Swal.fire(
          'Supprimer!',
          nbRetour+' retour(s) a été supprimer avec succès!',
          'success'
        )
      }
    })

  }
}
