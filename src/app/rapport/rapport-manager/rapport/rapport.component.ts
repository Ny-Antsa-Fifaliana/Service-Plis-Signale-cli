import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ObjectRapport_depotagence } from 'src/app/models/ObjectRapport_depotagence.model';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit, OnDestroy, AfterViewInit {

  FormRapportDepotagence!: FormGroup;
 
  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  rapport_depotagences!: ObjectRapport_depotagence[];
  selectYearValue!: number;
  ObjectYearSelected!: number;

  years: any=[];
  currentYear : number;
  count: number;
  yearVar!: number;
  i: number=0;


  //for total
  DepotPartenaireTotal: number=0;
  LivreeTotal: number=0;
  RetourTotal: number=0;
  InstanceTotal: number=0;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private rapportService: RapportService) {
                this.currentYear=new Date().getFullYear();
                this.count=this.currentYear-500;
                
               }

  ngOnInit(): void {
    this.selectYearValue=this.currentYear;
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'Rapport Annuel par dépôt',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Rapport Annuel par dépôt',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Rapport Annuel par dépôt',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7,8]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Rapport Annuel par dépôt',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7,8]
          } 
         }
      ,
      {
       extend:'print',
       title:'Rapport Annuel par dépôt',
       text:'Imprimer',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8]
       } 
      },
      {
        extend:'colvis',
        text:'visibilité des colonnes'
      }
    ] 
    };
    this.iniForm();

    this.rapportService.refreshSubject$.subscribe(()=>{
      this.reloadYearForSelect();
      })
    this.reloadYearForSelect();

    
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
    this.FormRapportDepotagence=this.formBuilder.group({
      annee: ['', Validators.required]
    });
  }



  reloadYearForSelect(){
    this.i=0;
    this.yearVar=this.currentYear;

    for(this.yearVar; this.yearVar >= this.count; this.yearVar--){
      this.years[this.i]= this.yearVar;
      this.i++;
    }

    // for(this.count; this.count <= this.currentYear; this.count++  ){
    //   this.years[this.i]= this.count;
    //   this.i++;
    // }

    this.rapportService.rapportAnneeDepotagence(this.currentYear).subscribe(data=>{
      this.rapport_depotagences=data;
      
        this.DepotPartenaireTotal=0;
        this.LivreeTotal=0;
        this.RetourTotal=0;
        this.InstanceTotal=0;

      this.rapport_depotagences.forEach(element => {
        this.DepotPartenaireTotal+=element.nb_depotagence;
        this.LivreeTotal+=element.total_livree;
        this.RetourTotal+=element.total_retour;
        this.InstanceTotal+=element.total_instance;
      });

      this.rerender(); 
    });
  
  }



  ChangeSelectYear(e: any){
    this.selectYearValue=e.value;
    if(this.selectYearValue!=null){
      this.rapportService.rapportAnneeDepotagence(this.selectYearValue).subscribe(data=>{
        this.rapport_depotagences=data;

        this.DepotPartenaireTotal=0;
        this.LivreeTotal=0;
        this.RetourTotal=0;
        this.InstanceTotal=0;

        this.rapport_depotagences.forEach(element => {
          this.DepotPartenaireTotal+=element.nb_depotagence;
          this.LivreeTotal+=element.total_livree;
          this.RetourTotal+=element.total_retour;
          this.InstanceTotal+=element.total_instance;
        });
        
        this.rerender();
      });

    }
  }
  

  viewRapportProvince(idDepotagence: number){
    this.router.navigate(['/sps','rapport','province',idDepotagence]);
  }

  viewRapportAgenceMois(idDepotagence: number){
    this.router.navigate(['/sps','rapport','mois','agence',idDepotagence]);
  }

  viewRapportAgenceSemaine(idDepotagence: number){
    this.router.navigate(['/sps','rapport','semaine','agence',idDepotagence]);
  }

  viewRapportAgenceQuinzieme(idDepotagence: number){
    this.router.navigate(['/sps','rapport','quinzieme','agence',idDepotagence]);
  }
  


  viewRapportTotalMois(DepotPartenaireTotal: number){
    this.router.navigate(['/sps','rapport','mois','total',this.selectYearValue,DepotPartenaireTotal]);
  }

  viewRapportTotalSemaine(DepotPartenaireTotal: number){
    this.router.navigate(['/sps','rapport','semaine','total',this.selectYearValue,DepotPartenaireTotal]);
  }

  viewRapportTotalQuinzieme(DepotPartenaireTotal: number){
    this.router.navigate(['/sps','rapport','quinzieme','total',this.selectYearValue,DepotPartenaireTotal]);
  }

}
