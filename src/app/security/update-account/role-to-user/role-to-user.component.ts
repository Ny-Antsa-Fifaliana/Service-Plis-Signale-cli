import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppRole } from 'src/app/models/AppRole.model';
import { AppUser } from 'src/app/models/AppUser.model';
import { RoleUserBean } from 'src/app/models/RoleUserBean.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-to-user',
  templateUrl: './role-to-user.component.html',
  styleUrls: ['./role-to-user.component.scss']
})
export class RoleToUserComponent implements OnInit, AfterViewInit, OnDestroy {

  currentUser: AppUser={} as AppUser;
  currentRole: AppRole={} as AppRole;
  idUser!: number;


  dtOptions: DataTables.Settings={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  Form_addRoleToUser!: FormGroup;
  roleUser!: RoleUserBean;

  roles!: AppRole[];
  selectRoleValue!: number;
  ObjectRoleSelected!: AppRole;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.iniForm();

    this.dtOptions={
      pagingType:'full_numbers'
    };
    this.idUser= this.route.snapshot.params['idUser'];
    this.authService.refreshSubject$.subscribe(()=>{
     this.reloadUser();
    })
    this.reloadUser();
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

  reloadUser(){
    this.authService.getUserById(this.idUser).subscribe(data=>{
      this.currentUser=data;

      this.authService.ListerRolesByAppUserRole(this.idUser).subscribe((data)=>{
        this.roles=data;

      });

      this.rerender();
    });
  }

  iniForm() {
    this.Form_addRoleToUser=this.formBuilder.group({
      role: ['', Validators.required]
    });
  }

  onAddRoleToUser(){
    this.roleUser= new RoleUserBean(this.currentUser.userName,this.ObjectRoleSelected.roleName);

    this.authService.addRoleToUser(this.roleUser).subscribe(data=>{
      this.Form_addRoleToUser.reset();
    });
    this.ReconnectWarning();
  }

  public ReconnectWarning(){
 
        Swal.fire(
          'Mise à jour du rôle utilisateur',
          'Modification effectué avec succès!, l\'utilisateur concerné doit se reconnecter pour que les modifications actuelles soient prise en charge!',
          'success',
          
        )
  }
  

  popup(){
    Swal.fire(" Ajout ok !", this.currentUser.userName+" ajouté en tant que "+this.ObjectRoleSelected.roleName+" !", "success");
  }

  ChangeSelectRole(e: any){
    this.selectRoleValue=e.value;
    if(this.selectRoleValue !=null){
      this.authService.getRoleById(this.selectRoleValue).subscribe(data=>{
        this.ObjectRoleSelected= data;
      });
    }
   
  }

  public deleteRoleToUser(roleName: string){
    const roleUserDelete= new RoleUserBean(this.currentUser.userName, roleName);
    this.authService.removeRoleToUser(roleUserDelete).subscribe(data=>{
      this.ReconnectDeleteWarning();
    });

  }

  public ReconnectDeleteWarning(){
   
        Swal.fire(
          'Mise à jour du rôle utilisateur',
          'ATTENTION!, l\'utilisateur concerné doit se reconnecter pour que les modifications actuelles soient prise en charge!',
          'warning'
        )
      }
 


  public deleteWarning(appRole: AppRole){
    const roleName =appRole.roleName;
    Swal.fire({
      title: 'Voulez-vous retirer le Rôle '+roleName+' de cette utilisateur ?',
      text: "Il sera retirer définitivement dans les rôles de l'utilisateur !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Retirer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRoleToUser(appRole.roleName);
        
        Swal.fire(
          'Retiré !',
          ' Le Rôle '+roleName+' a été retité avec succès!',
          'success'
        )
      }
     
    })

  }

}
