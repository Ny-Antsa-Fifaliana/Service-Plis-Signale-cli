import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotAgenceBean } from 'src/app/models/DepotAgenceBean.model';
import { ObjectRapport_depotprovince } from 'src/app/models/ObjectRapport_depotprovince.model';
import { Depot_agenceService } from 'src/app/services/Depot_agence.service';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-rapport-province',
  templateUrl: './rapport-province.component.html',
  styleUrls: ['./rapport-province.component.scss']
})
export class RapportProvinceComponent implements OnInit,OnDestroy, AfterViewInit {

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  idDepotagence!: number;
  currentDepotagence: DepotAgenceBean={} as DepotAgenceBean;
  rapportDepotProvinces!: ObjectRapport_depotprovince[];
  

  constructor(private router: Router,
              private rapportService: RapportService,
              private route: ActivatedRoute,
              private depotagenceService: Depot_agenceService) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'Rapport Annuel par dépôt province',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8,9]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Rapport Annuel par dépôt province',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7,8,9]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Rapport Annuel par dépôt province',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7,8,9]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Rapport Annuel par dépôt province',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7,8,9]
          } 
         }
      ,
      {
       extend:'print',
       title:'Rapport Annuel par dépôt province',
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
    this.idDepotagence= this.route.snapshot.params['idDepotagence'];
    this.rapportService.refreshSubject$.subscribe(()=>{
      this.reloadRapportProvince();
      })
    this.reloadRapportProvince();

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


  reloadRapportProvince(){
    this.depotagenceService.getDepotAgenceByIdDepotAgence(this.idDepotagence).subscribe(data=>{
      this.currentDepotagence=data;
    });

    this.rapportService.rapportDepotprovince(this.idDepotagence).subscribe(data=>{
      this.rapportDepotProvinces=data; 
      this.rerender(); 
    });
  }

  viewRapportZone(idDepotprovince: number){
    this.router.navigate(['/sps','rapport','zone',this.currentDepotagence.nbDepotAgence,idDepotprovince]);
  }

  viewRapportProvinceMois(idDepotprovince: number){
    this.router.navigate(['/sps','rapport','mois','province',this.currentDepotagence.nbDepotAgence,idDepotprovince]);
  }

  viewRapportProvinceSemaine(idDepotprovince: number){
    this.router.navigate(['/sps','rapport','semaine','province',this.currentDepotagence.nbDepotAgence,idDepotprovince]);
  }

  viewRapportProvinceQuinzieme(idDepotprovince: number){
    this.router.navigate(['/sps','rapport','quinzieme','province',this.currentDepotagence.nbDepotAgence,idDepotprovince]);
  }
  


}
