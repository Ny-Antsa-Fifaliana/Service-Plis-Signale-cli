import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { ZoneBean } from 'src/app/models/ZoneBean.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProvinceService } from 'src/app/services/Province.service';
import { ZoneService } from 'src/app/services/Zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit, AfterViewInit, OnDestroy {

  currentProvince: ProvinceBean={} as ProvinceBean;
  currentZone: ZoneBean={} as ZoneBean;
  codeProvince!: number;


  dtOptions: DataTables.Settings={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  
  constructor(private router: Router,
              private zoneService: ZoneService,
              private provinceService: ProvinceService,
              private route: ActivatedRoute,
              public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers'
    };
    this.codeProvince= this.route.snapshot.params['codeProvince'];
    this.zoneService.refreshSubjectDelete$.subscribe(()=>{
     this.reloadZone();
    })
    
    this.reloadZone();
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

  reloadZone(){
    this.provinceService.getProvinceByCodeProvince(this.codeProvince).subscribe(data=>{
      this.currentProvince=data;
      this.rerender();
    });
  }



  public viewAddZoneForm(codeProvince: number){
    this.router.navigate(['/sps','agences','zone','add',codeProvince]);
  }

  public viewUpdateZone(nomZone: string, idZone: number, codeProvince: number){ 
    this.router.navigate(['/sps','agences','zone','update', nomZone, idZone, codeProvince]);
    
  }

  public deleteZoneByIdZone(idZone: number ){
    this.zoneService.getZoneByIdZone(idZone).subscribe(data=>{
    this.currentZone=data;
    this.zoneService.deleteZoneByIdZone(this.currentZone, this.currentProvince);
    });
  }

  public viewDepotOfZone(idZone: number, nomProvince: string){
    this.router.navigate(['/sps','depotbyzone',idZone,nomProvince ]);
  }

  public deleteWarning(zone: ZoneBean){
    const nom =zone.nomZone;
    Swal.fire({
      title: 'Voulez-vous supprimer '+nom+' ?',
      text: "Il sera supprimé définitivement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteZoneByIdZone(zone.idZone);
        Swal.fire(
          'Supprimer!',
          nom+' a été supprimer avec succès!',
          'success'
        )
      }
    })
  }

}
