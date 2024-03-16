import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotBean } from 'src/app/models/DepotBean.model';
import { ObjectRapport_mois } from 'src/app/models/ObjectRapport_mois.model';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { DepotService } from 'src/app/services/Depot.service';
import { ProvinceService } from 'src/app/services/Province.service';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-rapport-mensuel-zone',
  templateUrl: './rapport-mensuel-zone.component.html',
  styleUrls: ['./rapport-mensuel-zone.component.scss']
})
export class RapportMensuelZoneComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  rapport_depotzone: ObjectRapport_mois[]=[];
  idDepot!: number;
  nbDepotagence!: number;
  nbDepotprovince!: number;
  
  instances: number[]=[];
  I: number=0;
  nb: number=0;
  i: number=0; 
  currentDepotzone: DepotBean={} as DepotBean;
  province: ProvinceBean={} as ProvinceBean;
  nomZone!: string;

  constructor(private provinceService: ProvinceService,
              private rapportService: RapportService,
              private depotzoneService: DepotService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.idDepot= this.route.snapshot.params['idDepot'];
    this.nbDepotagence= this.route.snapshot.params['nbDepotagence'];
    this.nbDepotprovince= this.route.snapshot.params['nbDepotprovince'];

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
    this.rapportService.rapportMoisDepotzone(this.idDepot).subscribe(data=>{
      this.rapport_depotzone=data;
      
      
      this.depotzoneService.getDepotByIdDepot(this.idDepot).subscribe(data=>{
        this.currentDepotzone=data;
        
        this.nomZone=this.currentDepotzone.zoneByDepot.nomZone;

       this.provinceService.getProvinceByIdZone(this.currentDepotzone.zoneByDepot.idZone).subscribe(data=>{
        this.province=data;
       });
        

        this.nb = this.currentDepotzone.nbDepot;
        for(this.i; this.i<this.rapport_depotzone.length; this.i++){
          this.I= (this.nb) - (this.rapport_depotzone[this.i].livree + this.rapport_depotzone[this.i].retour);
          
          this.instances.push(this.I);
          this.nb=this.I;
        }
        
      this.rerender();

      });

      this.rerender();

    });
  }

}
