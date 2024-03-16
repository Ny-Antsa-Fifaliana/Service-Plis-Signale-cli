import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProvinceService } from 'src/app/services/Province.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit, AfterViewInit, OnDestroy {

  
   provinces!: ProvinceBean[];

   dtOptions: DataTables.Settings={}; 
   dtTrigger:  Subject<any>=new Subject<any>();
   @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
   dtElement!: DataTableDirective;
   dtInstance!: DataTables.Api;


  constructor(private provinceService: ProvinceService,
              private router: Router,
              public authService: AuthenticationService) {}

  ngOnInit(){
    this.dtOptions={
      pagingType:'full_numbers'
    };
    this.provinceService.refreshSubject$.subscribe(()=>{
      this.reloadList();
    })
    this.reloadList();
  }

// for datatables=================
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
// ======================

  public viewZoneOfProvince(codeProvince: number){
    this.router.navigate(['/sps','agences', 'zone',codeProvince ]);
  }

  public viewAddProvinceForm(){
    this.router.navigate(['/sps','agences','province','add']);
  }

  public viewUpdateProvince(nomProvince: string, codeProvince: number){ 
    this.router.navigate(['/sps','agences','province','update',nomProvince,codeProvince]);
    
  }

  public deleteProvinceByCodeProvince(codeProvince: number){
    this.provinceService.DeleteProvinceByCodeProvince(codeProvince);
  }

  public reloadList(){
    this.provinceService.ListerProvince().subscribe(data=>{
      this.provinces=data;
      this.rerender();
      });
  }
  
  public deleteWarning(province: ProvinceBean){
    const nom =province.nomProvince;
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
        this.deleteProvinceByCodeProvince(province.codeProvince);
        Swal.fire(
          'Supprimer!',
          nom+' a été supprimer avec succès!',
          'success'
        )
      }
    })
  }

}
