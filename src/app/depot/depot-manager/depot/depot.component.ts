import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotBean } from 'src/app/models/DepotBean.model';
import { DepotProvinceBean } from 'src/app/models/DepotProvinceBean.model';
import { EtatBean } from 'src/app/models/EtatBean.model';
import { ObjectDepotzoneWithInstance } from 'src/app/models/ObjectDepotzoneWithInstance.model';
import { ZoneBean } from 'src/app/models/ZoneBean.model';
import { DepotService } from 'src/app/services/Depot.service';
import { Depot_provinceService } from 'src/app/services/Depot_province.service';
import { ZoneService } from 'src/app/services/Zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit ,AfterViewInit, OnDestroy{

  currentDepotProvince: DepotProvinceBean={} as DepotProvinceBean;
  nomProvinceActuel!: string; 
  idDepotProvince!: number;
  nbDepotagence!: number;
  currentDepot!: DepotBean;
  FormDepot_add!: FormGroup;
  newDepot!: DepotBean;

  zones!: ZoneBean[];
  selectZoneValue!: number;
  ObjectZoneSelected!: ZoneBean;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  depotzones_and_instances: ObjectDepotzoneWithInstance[]=[]; 
  totalDepotzone: number=0;
  idDepotagence!: number;
  lienDepotprovince: string="";


  constructor(private router: Router,
              private depotService: DepotService,
              private depotProvinceService: Depot_provinceService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private zoneService: ZoneService ) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'LISTE DES DEPOTS PAR ZONE',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'LISTE DES DEPOTS PAR ZONE',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
      {
          extend:'csv',
          title:'LISTE DES DEPOTS PAR ZONE',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3]
          } 
      }
      ,
      {
          extend:'copy',
          title:'LISTE DES DEPOTS PAR ZONE',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3]
          } 
         }
      ,
      {
       extend:'print',
       title:'LISTE DES DEPOTS PAR ZONE',
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
    this.idDepotProvince= this.route.snapshot.params['idDepotprovince'];
    this.nbDepotagence= this.route.snapshot.params['nbDepotagence'];
    this.idDepotagence= this.route.snapshot.params['idDepotagence'];
    
    this.lienDepotprovince="/sps/depotprovince/"+this.idDepotagence;

    this.depotService.refreshSubject$.subscribe(()=>{
      this.reloadDepotProvince();
     });
     this.reloadDepotProvince();
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
    this.FormDepot_add=this.formBuilder.group({
      nbDepot: ['', Validators.required],
      zone: ['', Validators.required]
    });
  }

  
 
   reloadDepotProvince(){
     this.depotProvinceService.getDepotProvinceByIdDepotProvince(this.idDepotProvince).subscribe(data=>{
       this.currentDepotProvince=data;
      //  


       this.nomProvinceActuel=this.currentDepotProvince.provinceByDepotProvince.nomProvince;
       
       this.zoneService.getZoneByIdDepotProvince(this.currentDepotProvince.provinceByDepotProvince.codeProvince,this.idDepotProvince).subscribe(data=>{
        this.zones=data;
      });
      
      this.depotService.ListeDepotzoneWithInstance(this.idDepotProvince).subscribe(data=>{
        this.depotzones_and_instances=data;
  
        this.totalDepotzone=0;
        this.depotzones_and_instances.forEach(elt=>{
          this.totalDepotzone+=elt.nb_depot;
        });

         this.rerender();
      
      });
      
    });
 
   }

   ChangeSelectZone(e: any){
    this.selectZoneValue=e.value;
    if(this.selectZoneValue !=null){
    this.zoneService.getZoneByIdZone(this.selectZoneValue).subscribe(data=>{
      this.ObjectZoneSelected= data;
      
    });
  }
  }

  onAddDepot(){
    const nbDepot= this.FormDepot_add.get('nbDepot')?.value;
    const newDepot= new DepotBean(nbDepot);
    
    this.depotService.SaveDepot(newDepot,this.ObjectZoneSelected.idZone,this.currentDepotProvince.idDepotProvince).subscribe({
      next:(data)=>{
      this.newDepot=data;
      if(data.body!=null){
        if(data.message.includes("Verifier")){
          this.popupError();
        }
        else{
          this.popup(data.message);
          this.FormDepot_add.reset();
        }
      }
        
    else{
        this.popupError();
    }  
    },
    error:(err)=>{
    //  this.popupError(data.message);
    }
    });
  }
  
  popupError(){
    Swal.fire(" Erreur!", 'Vérifier les champs!!',"warning");
  }
  popup(message:string){
    Swal.fire(" Ajout ok !",message, "success");
  }


   deleteDepotByIdDepot(idDepot: number){
      this.depotService.getDepotByIdDepot(idDepot).subscribe(data=>{
      this.currentDepot=data;
   

      this.depotService.deleteDepotByIdDepot(this.currentDepot,this.currentDepot.zoneByDepot,this.currentDepotProvince);
      this.FormDepot_add.reset();
    });
   }

   viewUpdateDepot(nbDepot: number, idDepot:number){
    this.router.navigate(['/sps','depot','update', nbDepot, idDepot, this.idDepotProvince]);
   }


   viewEtatOfDepot(idDepot: number){
    this.router.navigate(['/sps','etat',this.nbDepotagence,this.currentDepotProvince.nbDepotProvince,idDepot,this.idDepotProvince,this.idDepotagence]);
   }


   public deleteWarning(idDepot: number, nbDepot: number){
    const nb =nbDepot;

    Swal.fire({
      title: 'Voulez-vous supprimer le dépôt '+nb+' ?',
      text: "Il sera supprimé définitivement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDepotByIdDepot(idDepot);
        Swal.fire(
          'Supprimer!',
          nb+' a été supprimer avec succès!',
          'success'
        )
      }
    })
  }


}




