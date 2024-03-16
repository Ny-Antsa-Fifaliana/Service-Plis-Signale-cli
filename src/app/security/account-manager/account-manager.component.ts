import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppRole } from 'src/app/models/AppRole.model';
import { AppUser } from 'src/app/models/AppUser.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { IToken } from '../interfaces/IToken';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  appUsers!: AppUser[];
  appRoles!: AppRole[];

  dtOptions: DataTables.Settings={}; 
  dtTrigger:  Subject<any>=new Subject<any>();
  @ViewChild(DataTableDirective,{static: false}) datatableElement!: DataTableDirective;
  dtElement!: DataTableDirective;
  dtInstance!: DataTables.Api;


  FormUser_add!: FormGroup;
  newAppUser!: AppUser;

  FormRole_add!: FormGroup;
  newAppRole!: AppRole;


  constructor(private authService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers'
    };

    this.initFormUser();
    this.initFormRole();

    this.authService.refreshSubject$.subscribe(()=>{
      this.reloadList();
      this.reloadListRole();
    });
    this.reloadList();
    this.reloadListRole();
  }
  
  // for datatables User=================
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

  public reloadList(){
    this.authService.ListerUsers().subscribe(data=>{
      this.appUsers=data;
      this.rerender();
      });  
  }

  initFormUser() {
    this.FormUser_add=this.formBuilder.group({
      nomUser: ['', Validators.required],
      mdpUser: ['', Validators.required],
      confirmation: ['', Validators.required]
    });
  }

  onAddUser(){
    const nomUser= this.FormUser_add.get('nomUser')?.value;
    const mdpUser= this.FormUser_add.get('mdpUser')?.value;
    const newUser= new AppUser(nomUser, mdpUser);
    
    this.authService.SaveUser(newUser).subscribe({
      next:(data)=>{
        this.newAppUser=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("enregistré")){
            this.popup(data.message);
            this.FormUser_add.reset();
          }
          
        }
        else{
          this.popupError(data.message);
        }
        
      },
      error:(err)=>{

      }
    });
      
  }

  popupError(message: string){
    Swal.fire(" Erreur!", message, "warning");
  }
  popup(message:string){
    Swal.fire(" Ajout ok !", message, "success");
  }

  public viewUpdateUser(userName: string, id: number){
    this.router.navigate(['/sps','account','update',userName,id]);
  }

  public viewRoleUser(idUser: number){
    this.router.navigate(['/sps','account','role',idUser]);
  }

//========================================================================
  // for datatables Role=================
  public reloadListRole(){
    this.authService.ListerRoles().subscribe(data=>{
      this.appRoles=data;
      });
  }

  initFormRole() {
    this.FormRole_add=this.formBuilder.group({
      nomRole: ['', Validators.required]
    });
  }

  onAddRole(){
    const nomRole= this.FormRole_add.get('nomRole')?.value;
    const newRole= new AppRole(nomRole);
  
    this.authService.SaveRole(newRole).subscribe({
      next:(data)=>{
        this.newAppRole=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupRoleError(data.message);
          }
          else if(data.message.includes("enregistré")){
            this.popupRole(data.message);
            this.FormRole_add.reset();
          }
        }
        else{
          this.popupRoleError(data.message);
        }
      },
      error:(err)=>{

      }
    });
  }
  popupRoleError(message: string){
    Swal.fire(" Erreur!", message, "warning");
  }
  popupRole(message:string){
    Swal.fire(" Ajout ok !", message, "success");
  }


 //-------------------------
 public deleteAppUserById(id: number){
  this.authService.DeleteAppUserById(id);
  
}
 
 public deleteWarningUser(appUser: AppUser){
  const nom =appUser.userName;
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
      this.deleteAppUserById(appUser.id);
      Swal.fire(
        'Supprimer!',
        nom+' a été supprimer avec succès!',
        'success'
      )
    }
  })
}

//---------------

public deleteAppRoleById(id: number){
  this.authService.DeleteAppRoleById(id);
  
}
 
 public deleteWarningRole(appRole: AppRole){
  const nom =appRole.roleName;
  Swal.fire({
    title: 'Voulez-vous supprimer '+nom+' ?',
    text: "Il sera supprimé définitivement !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor:'#d33',
    cancelButtonColor:  '#3085d6',
    confirmButtonText: 'Oui, Supprimer!'
  }).then((result) => {
    if (result.isConfirmed) { 
      this.deleteAppRoleById(appRole.id);
      Swal.fire(
        'Supprimer!',
        nom+' a été supprimer avec succès!',
        'success'
      )
    }
  })
}

}
