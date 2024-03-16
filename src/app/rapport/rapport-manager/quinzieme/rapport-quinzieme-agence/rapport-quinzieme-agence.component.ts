import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotAgenceBean } from 'src/app/models/DepotAgenceBean.model';
import { ObjectRapport_quinzieme } from 'src/app/models/ObjectRapport_quinzieme.model';
import { Depot_agenceService } from 'src/app/services/Depot_agence.service';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-rapport-quinzieme-agence',
  templateUrl: './rapport-quinzieme-agence.component.html',
  styleUrls: ['./rapport-quinzieme-agence.component.scss']
})
export class RapportQuinziemeAgenceComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  rapport_depotagences: ObjectRapport_quinzieme[]=[];
  idDepotagence!: number;
  
  instances: number[]=[];
  I: number=0;
  nb: number=0;
  i: number=0; 

  bool: boolean=false;

  currentDepotagence: DepotAgenceBean={} as DepotAgenceBean;

  constructor(private rapportService: RapportService,
              private depotagenceService: Depot_agenceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.idDepotagence= this.route.snapshot.params['idDepotagence'];

    this.rapportService.refreshSubject$.subscribe(()=>{
      this.reloadRapport();
      })
    this.reloadRapport();



    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'Rapport Quinzieme du mois',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Rapport Quinzieme du mois',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Rapport Quinzieme du mois',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Rapport Quinzieme du mois',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7]
          } 
         }
      ,
      {
       extend:'print',
       title:'Rapport Quinzieme du mois',
       text:'Imprimer',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      },
      {
        extend:'colvis',
        text:'visibilité des colonnes'
      }
    ] 
    };


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



  reloadRapport(){
    this.rapportService.rapportQuinziemeDepotagence(this.idDepotagence).subscribe(data=>{
      this.rapport_depotagences=data;
      
    
      this.depotagenceService.getDepotAgenceByIdDepotAgence(this.idDepotagence).subscribe(data=>{
        this.currentDepotagence=data;

        this.nb = this.currentDepotagence.nbDepotAgence;
        for(this.i; this.i<this.rapport_depotagences.length; this.i++){
          this.I= (this.nb) - (this.rapport_depotagences[this.i].livree + this.rapport_depotagences[this.i].retour);
          
          this.instances.push(this.I);
          this.nb=this.I;
        }
        
        this.rerender();
        
      });this.bool=true;
      this.rerender();
    });
  }

}
