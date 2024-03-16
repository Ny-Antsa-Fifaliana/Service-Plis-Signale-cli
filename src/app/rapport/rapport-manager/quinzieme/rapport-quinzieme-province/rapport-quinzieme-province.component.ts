import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotProvinceBean } from 'src/app/models/DepotProvinceBean.model';
import { ObjectRapport_quinzieme } from 'src/app/models/ObjectRapport_quinzieme.model';
import { Depot_provinceService } from 'src/app/services/Depot_province.service';
import { RapportService } from 'src/app/services/Rapport.service';

@Component({
  selector: 'app-rapport-quinzieme-province',
  templateUrl: './rapport-quinzieme-province.component.html',
  styleUrls: ['./rapport-quinzieme-province.component.scss']
})
export class RapportQuinziemeProvinceComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  rapport_depotprovinces: ObjectRapport_quinzieme[]=[];
  idDepotprovince!: number;
  nbDepotagence!: number;
  nomProvince!: string;

  instances: number[]=[];
  I: number=0;
  nb: number=0;
  i: number=0; 
  currentDepotprovince: DepotProvinceBean={} as DepotProvinceBean;

  constructor(private rapportService: RapportService,
              private depotprovinceService: Depot_provinceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idDepotprovince= this.route.snapshot.params['idDepotprovince'];
    this.nbDepotagence= this.route.snapshot.params['nbDepotagence'];
    
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
    this.rapportService.rapportQuinziemeDepotprovince(this.idDepotprovince).subscribe(data=>{
      this.rapport_depotprovinces=data;
      
      
      this.depotprovinceService.getDepotProvinceByIdDepotProvince(this.idDepotprovince).subscribe(data=>{
        this.currentDepotprovince=data;
        this.nomProvince=this.currentDepotprovince.provinceByDepotProvince.nomProvince;
        this.nb = this.currentDepotprovince.nbDepotProvince;
        for(this.i; this.i<this.rapport_depotprovinces.length; this.i++){
          this.I= (this.nb) - (this.rapport_depotprovinces[this.i].livree + this.rapport_depotprovinces[this.i].retour);
          
          this.instances.push(this.I);
          this.nb=this.I;
        }
      this.rerender();

      });

      this.rerender();

    });
  }

}
