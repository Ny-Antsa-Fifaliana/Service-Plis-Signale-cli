import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { DepotAgenceBean } from 'src/app/models/DepotAgenceBean.model';
import { DepotProvinceBean } from 'src/app/models/DepotProvinceBean.model';
import { EtatBean } from 'src/app/models/EtatBean.model';
import { ObjectdepotprovinceWithInstance } from 'src/app/models/ObjectDepotprovinceWithInstance.model';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { DepotService } from 'src/app/services/Depot.service';
import { Depot_agenceService } from 'src/app/services/Depot_agence.service';
import { Depot_provinceService } from 'src/app/services/Depot_province.service';
import { ProvinceService } from 'src/app/services/Province.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depot-province',
  templateUrl: './depot-province.component.html',
  styleUrls: ['./depot-province.component.scss']
})
export class DepotProvinceComponent implements OnInit , AfterViewInit, OnDestroy{

  currentDepotAgence: DepotAgenceBean={} as DepotAgenceBean;
  currentDepotProvince?: DepotProvinceBean;
  idDepotAgence!: number;
  
  Form_addDepotProvince!: FormGroup;
  newDepotProvince!: DepotProvinceBean;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  provinces!: ProvinceBean[];
  selectProvinceValue!: number;
  ObjectProvinceSelected!: ProvinceBean;

  colors: Array<string>=['orange','blue','yellow',"grey","green","pink"];
  
  //for notification
  depotprovinces_and_instances: ObjectdepotprovinceWithInstance[]=[];
  totalDepotprovince: number=0;


  constructor(private router: Router,
              private depotService: DepotService,
              private depotProvinceService: Depot_provinceService,
              private depotAgenceService: Depot_agenceService,
              private provinceService: ProvinceService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
                
               }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'LISTE DES DEPOTS PAR PROVINCE',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'LISTE DES DEPOTS PAR PROVINCE',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3]
       } 
      }
        ,
      {
          extend:'csv',
          title:'LISTE DES DEPOTS PAR PROVINCE',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3]
          } 
      }
      ,
      {
          extend:'copy',
          title:'LISTE DES DEPOTS PAR PROVINCE',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3]
          } 
         }
      ,
      {
       extend:'print',
       title:'LISTE DES DEPOTS PAR PROVINCE',
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
    this.idDepotAgence= this.route.snapshot.params['idDepotAgence'];
     
    this.depotProvinceService.refreshSubject$.subscribe(()=>{
      this.reloadDepotAgence();
     });
     this.reloadDepotAgence();

     
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
    this.Form_addDepotProvince=this.formBuilder.group({
      nbDepotProvince: ['', Validators.required],
      province: ['', Validators.required]
    });
  }

  reloadDepotAgence(){
    this.depotAgenceService.getDepotAgenceByIdDepotAgence(this.idDepotAgence).subscribe(data=>{
      this.currentDepotAgence=data;
      
      this.provinceService.getProvinceByIdDepotAgence(this.idDepotAgence).subscribe((data)=>{
        this.provinces=data;

      });

      this.depotService.ListeDepotprovinceWithInstance(this.idDepotAgence).subscribe(data=>{
        this.depotprovinces_and_instances=data;

        this.totalDepotprovince=0;
        this.depotprovinces_and_instances.forEach(elt=>{
          this.totalDepotprovince+=elt.nb_depotprovince;
        });

  
         this.rerender();
      
      });

    });
  }

  ChangeSelectProvince(e: any){
    this.selectProvinceValue=e.value;
    if(this.selectProvinceValue !=null){
      this.provinceService.getProvinceByCodeProvince(this.selectProvinceValue).subscribe(data=>{
        this.ObjectProvinceSelected= data;
      });
    }
   
  }


  onAddDepotProvince(){
    const nbDepotProvince= this.Form_addDepotProvince.get('nbDepotProvince')?.value;
    
    this.depotProvinceService.SaveDepotProvince(nbDepotProvince,this.idDepotAgence,this.ObjectProvinceSelected.codeProvince).subscribe({
      next:(data)=>{
      this.newDepotProvince=data;
      if(data.body!=null){
        if(data.message.includes("Verifier")){
          this.popupError(data.message);
        }
        else{
          this.popup(data.message);
          this.Form_addDepotProvince.reset();
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
    Swal.fire(" Erreur!", 'Vérifier les champs!!', "warning");
  }
  popup(message:string){
    Swal.fire(" Ajout ok !",message, "success");
  }


  deleteDepotProvinceByIdDepotProvince(idDepotProvince: number){
    this.depotProvinceService.getDepotProvinceByIdDepotProvince(idDepotProvince).subscribe(data=>{
    this.currentDepotProvince=data;
    this.depotProvinceService.deleteDepotProvinceByIdDepotProvince(idDepotProvince,this.idDepotAgence,this.currentDepotProvince.provinceByDepotProvince.codeProvince);
    this.Form_addDepotProvince.reset();
    
  });
   
 }


  public deleteWarning(depotProvince: any){
    const nb =depotProvince.nb_depotprovince;
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
        this.deleteDepotProvinceByIdDepotProvince(depotProvince.id_depotprovince);
       
        Swal.fire(
          'Supprimer!',
          ' Dépôt '+nb+' du DIRPM: '+ depotProvince.nom_province+' a été supprimer avec succès!',
          'success'
        )
      }
     
    })

  }


  public viewDepotOfZone(idDepotProvince: number){
    this.router.navigate(['/sps','depot',this.currentDepotAgence.nbDepotAgence,idDepotProvince,this.idDepotAgence]);
  }
 


    


}
