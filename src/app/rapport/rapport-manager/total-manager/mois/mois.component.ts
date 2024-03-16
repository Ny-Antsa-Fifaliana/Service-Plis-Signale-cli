import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ObjectRapport_mois } from 'src/app/models/ObjectRapport_mois.model';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-mois',
  templateUrl: './mois.component.html',
  styleUrls: ['./mois.component.scss']
})
export class MoisComponent implements OnInit, OnDestroy, AfterViewInit {

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  rapport_total: ObjectRapport_mois[]=[];
  annee!: number;
  DepotPartenaireTotal!: number;
  
  instances: number[]=[];
  I: number=0;
  nb: number=0;
  i: number=0; 

  constructor(private rapportService: RapportService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.annee= this.route.snapshot.params['annee'];
    this.DepotPartenaireTotal= this.route.snapshot.params['DepotPartenaireTotal'];

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
       title:'Rapport Mensuel',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Rapport Mensuel',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Rapport Mensuel',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Rapport Mensuel',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7]
          } 
         }
      ,
      {
       extend:'print',
       title:'Rapport Mensuel',
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
    this.rapportService.rapportMoisTotal(this.annee).subscribe(data=>{
      this.rapport_total=data;

            this.nb = this.DepotPartenaireTotal;

            for(this.i; this.i<this.rapport_total.length; this.i++){
              this.I= (this.nb) - (this.rapport_total[this.i].livree + this.rapport_total[this.i].retour);
              
              this.instances.push(this.I);
              this.nb=this.I;
            }
    
      this.rerender();

    });
  }


}
