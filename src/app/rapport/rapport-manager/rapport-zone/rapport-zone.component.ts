import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotProvinceBean } from 'src/app/models/DepotProvinceBean.model';
import { ObjectRapport_depotzone } from 'src/app/models/ObjectRapport_depotzone.model';
import { Depot_provinceService } from 'src/app/services/Depot_province.service';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-rapport-zone',
  templateUrl: './rapport-zone.component.html',
  styleUrls: ['./rapport-zone.component.scss']
})
export class RapportZoneComponent implements OnInit,OnDestroy, AfterViewInit {

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  idDepotprovince!: number;
  currentDepotprovince: DepotProvinceBean={} as DepotProvinceBean;
  currentNomProvince!: string;

  rapportDepotZones!: ObjectRapport_depotzone[];
  nbDepotagence!: number;
  

  constructor(private router: Router,
              private rapportService: RapportService,
              private route: ActivatedRoute,
              private depotProvinceService: Depot_provinceService) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'Rapport Annuel par dépôt pour chaque zone',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8,9]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Rapport Annuel par dépôt pour chaque zone',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8,9]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Rapport Annuel par dépôt pour chaque zone',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7,8,9]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Rapport Annuel par dépôt pour chaque zone',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7,8,9]
          } 
         }
      ,
      {
       extend:'print',
       title:'Rapport Annuel par dépôt pour chaque zone',
       text:'Imprimer',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8,9]
       } 
      },
      {
        extend:'colvis',
        text:'visibilité des colonnes'
      }
    ] 
    };
    this.idDepotprovince= this.route.snapshot.params['idDepotprovince'];
    this.nbDepotagence= this.route.snapshot.params['nbDepotagence'];
    this.rapportService.refreshSubject$.subscribe(()=>{
      this.reloadRapportZone();
      })
    this.reloadRapportZone();

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

  reloadRapportZone(){
    this.depotProvinceService.getDepotProvinceByIdDepotProvince(this.idDepotprovince).subscribe(data=>{
      this.currentDepotprovince=data;
      this.currentNomProvince= this.currentDepotprovince.provinceByDepotProvince.nomProvince;
    });

    this.rapportService.rapportDepotzone(this.idDepotprovince).subscribe(data=>{
      this.rapportDepotZones=data; 
      this.rerender(); 
    });
  }

  viewRapportZoneMois(idDepot: number){
    this.router.navigate(['/sps','rapport','mois','zone',this.nbDepotagence,this.currentDepotprovince.nbDepotProvince,idDepot]);
  }

  viewRapportZoneSemaine(idDepot: number){
    this.router.navigate(['/sps','rapport','semaine','zone',this.nbDepotagence,this.currentDepotprovince.nbDepotProvince,idDepot]);
  }

  viewRapportZoneQuinzieme(idDepot: number){
    this.router.navigate(['/sps','rapport','quinzieme','zone',this.nbDepotagence,this.currentDepotprovince.nbDepotProvince,idDepot]);
  }


}
