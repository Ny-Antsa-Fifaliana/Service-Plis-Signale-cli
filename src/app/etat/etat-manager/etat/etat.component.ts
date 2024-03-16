import { NumberFormatStyle } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotBean } from 'src/app/models/DepotBean.model';
import { DepotService } from 'src/app/services/Depot.service';
import { EtatService } from 'src/app/services/Etat.service';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.scss']
})
export class EtatComponent implements OnInit, AfterViewInit, OnDestroy{

  currentDepot: DepotBean={} as DepotBean;
  nbDepotagence!: number;
  nbDepotprovince!: number;
  idDepot!: number;
  nomZoneActuel!: string;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  L: number=0;
  R: number=0;
  I: number=0;
  count: number=0;

  listes: number[]=[];
  bool: boolean=false;

  idDepotprovince!: number;
  idDepotagence!: number;
  lienDepotzone!: string;
  lienDepotprovince!: string;


  constructor(private router: Router,
              private etatService: EtatService,
              private depotService: DepotService,
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
       title:'ETAT',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'ETAT',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5,6,7]
       } 
      }
        ,
      {
          extend:'csv',
          title:'ETAT',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7]
          } 
      }
      ,
      {
          extend:'copy',
          title:'ETAT',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5,6,7]
          } 
         }
      ,
      {
       extend:'print',
       title:'ETAT',
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
  
    this.idDepot= this.route.snapshot.params['idDepot'];
    this.nbDepotagence= this.route.snapshot.params['nbDepotagence'];
    this.nbDepotprovince= this.route.snapshot.params['nbDepotprovince'];

    this.idDepotagence= this.route.snapshot.params['idDepotagence'];
    this.idDepotprovince= this.route.snapshot.params['idDepotprovince'];

    this.lienDepotzone="/sps/depot/"+this.nbDepotagence+"/"+this.idDepotprovince+"/"+this.idDepotagence;
    this.lienDepotprovince="/sps/depotprovince/"+this.idDepotagence;

    this.etatService.refreshSubjectEtat$.subscribe(()=>{
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


  reloadDepot(){
    this.depotService.getDepotByIdDepot(this.idDepot).subscribe(data=>{
      this.currentDepot=data;
      this.nomZoneActuel=this.currentDepot.zoneByDepot.nomZone;
      
      for(this.count=0; this.count<this.currentDepot.etatByDepot_list.length; this.count++){
        this.L+= this.currentDepot.etatByDepot_list[this.count].mvtLivree;
        this.R+= this.currentDepot.etatByDepot_list[this.count].mvtRetour;
        this.I= this.currentDepot.etatByDepot_list[this.count].nbInstance;
              
      }

      this.listes.push(this.currentDepot.nbDepot);
      const instancePercent= ((100*this.I)/this.currentDepot.nbDepot);
      this.listes.push(instancePercent);
      this.bool=true;
      this.rerender();
    });
  }

  viewRetourOfEtat(){
    this.router.navigate(['/sps','retour',this.nbDepotagence,this.nbDepotprovince,this.idDepot,this.idDepotprovince,this.idDepotagence]);
  }

  viewLivreeOfEtat(){
    this.router.navigate(['/sps','livree',this.nbDepotagence,this.nbDepotprovince,this.idDepot,this.idDepotprovince,this.idDepotagence]);
  }


}
