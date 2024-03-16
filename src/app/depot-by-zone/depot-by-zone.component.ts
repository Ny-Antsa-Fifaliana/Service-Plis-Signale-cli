import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepotBean } from '../models/DepotBean.model';
import { DepotByZoneBean } from '../models/DepotByZoneBean.model';
import { ZoneBean } from '../models/ZoneBean.model';
import { DepotService } from '../services/Depot.service';
import { ZoneService } from '../services/Zone.service';

@Component({
  selector: 'app-depot-by-zone',
  templateUrl: './depot-by-zone.component.html',
  styleUrls: ['./depot-by-zone.component.scss']
})
export class DepotByZoneComponent implements OnInit, OnDestroy, AfterViewInit {

  Form!: FormGroup;

  selectYearValue!: number;
  ObjectYearSelected!: number;

  depotByZone!: DepotByZoneBean[];
  idZone!: number;
  nomProvince!: string;
  currentZone?: ZoneBean;

  dtOptions: any={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  years: any=[];
  currentYear : number;
  count: number;
  yearVar!: number;
  i: number=0;

  constructor(private formBuilder: FormBuilder,
              private depotService: DepotService,
              private zoneService: ZoneService,
              private route: ActivatedRoute) {
                this.currentYear=new Date().getFullYear();
                this.count=this.currentYear-500;
               }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      processing:true,
      dom:'Blfrtip',
      buttons:[
        {
       extend:'excel',
       title:'Listes des dépôts existants',
       text:'Excel',
       exportOptions:{
        columns:[0,1,2,3,4,5]
       } 
      }
        ,
         {
       extend:'pdf',
       title:'Listes des dépôts existants',
       text:'PDF',
       exportOptions:{
        columns:[0,1,2,3,4,5]
       } 
      }
        ,
      {
          extend:'csv',
          title:'Listes des dépôts existants',
          text:'CSV',
          exportOptions:{
           columns:[0,1,2,3,4,5]
          } 
      }
      ,
      {
          extend:'copy',
          title:'Listes des dépôts existants',
          text:'Copier',
          exportOptions:{
           columns:[0,1,2,3,4,5]
          } 
         }
      ,
      {
       extend:'print',
       title:'Listes des dépôts existants',
       text:'Imprimer',
       exportOptions:{
        columns:[0,1,2,3,4,5]
       } 
      },
      {
        extend:'colvis',
        text:'visibilité des colonnes'
      }
    ] 
    };

    this.idZone= this.route.snapshot.params['idZone'];
    this.nomProvince= this.route.snapshot.params['nomProvince'];
    
    this.iniForm();
    this.depotService.refreshSubject$.subscribe(()=>{
      this.reloadDepotZone();
     });
     this.reloadDepotZone();
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
    this.Form=this.formBuilder.group({
      annee: ['', Validators.required]
    });
  }


  reloadDepotZone(){
    this.i=0;
    this.yearVar=this.currentYear;

    for(this.yearVar; this.yearVar >= this.count; this.yearVar--){
      this.years[this.i]= this.yearVar;
      this.i++;
    }

    this.zoneService.getZoneByIdZone(this.idZone).subscribe(data=>{
      this.currentZone=data;

     })
    this.depotService.listeDepotByZone(this.idZone,this.currentYear).subscribe(data=>{
      this.depotByZone=data;
      this.rerender();
     });

    
  }



  ChangeSelectYear(e: any){
    this.selectYearValue=e.value;
    if(this.selectYearValue!=null){
      this.depotService.listeDepotByZone(this.idZone,this.selectYearValue).subscribe(data=>{
        this.depotByZone=data;
        this.rerender();
       });

    }
  }



}
