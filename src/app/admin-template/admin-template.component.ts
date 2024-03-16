import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppUser } from '../models/AppUser.model';
import { DepotAgenceBean } from '../models/DepotAgenceBean.model';
import { EtatBean } from '../models/EtatBean.model';
import { AuthenticationService } from '../services/authentication.service';
import { DepotService } from '../services/Depot.service';
import { Depot_agenceService } from '../services/Depot_agence.service';
import { Depot_provinceService } from '../services/Depot_province.service';
import { LivreeService } from '../services/Livree.service';
import { RetourService } from '../services/Retour.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent implements OnInit {

  principale: AppUser={} as AppUser;
  panelOpenState = false;

  FormUser_updateName!: FormGroup;
  newAppUserName!: AppUser;
  ancienNomAppUser!: string;

  FormUser_updatePassword!: FormGroup;
  newAppUserPassword!: AppUser;
  ancienPasswordAppUser!: string;
  

//for notification
lastEtatForInstances: EtatBean[]=[];
InstanceNotifers: number=0;
instancesTotals: number=0;
IdDepotagence_byLoops: number=0;
depotAgences: DepotAgenceBean[]=[];

anneeChange:number=0;
currentYears: number;

matBadge: boolean=false;
matBadgeByDepotAgenceAnnee: boolean=false;

  constructor(public authService: AuthenticationService,
              private livreeService: LivreeService,
              private retourService: RetourService,
              private depotProvinceService: Depot_provinceService,
              private formBuilder: FormBuilder,
              private depotService: DepotService,
              public depotAgenceService: Depot_agenceService,
              private router: Router) { 
                this.currentYears=new Date().getFullYear();
              }

  ngOnInit(): void {
    this.initFormUserName();
    this.initFormPassword();
    this.authService.refreshSubject$.subscribe(()=>{
      this.reloadPrincipale();
    })
    
    this.reloadPrincipale();
    
    
  }


  matBadgeHidden(){
    this.matBadge=true;
  }

  matBadgeShow(){
    this.matBadge=false;
  }


  reloadPrincipale(){
    this.authService.getLocalUserProfile().subscribe(data=>{
     
      if(data){
        this.principale=JSON.parse(data);
      
        this.depotAgenceService.ListerDepotAgenceByAnnee(this.currentYears).subscribe(data=>{
          this.depotAgences=data;
          this.instancesTotals=0;
          this.InstanceNotifers=0;
          this.ListerDernierLigneEtatParDepotsByDepotagence();
        });

        this.depotAgenceService.ChangeEmitted$.subscribe(data=>{
          this.anneeChange=data;
          this.depotAgenceService.ListerDepotAgenceByAnnee(this.anneeChange).subscribe(data=>{
            this.depotAgences=data;
            this.instancesTotals=0;
            this.InstanceNotifers=0;
            this.ListerDernierLigneEtatParDepotsByDepotagence();
            
          });   
        })
        
        this.depotAgenceService.ChangeEmittedMatBadge$.subscribe(data=>{
          this.matBadge=data;
        })
        
      }
    });
  } 



    status: boolean = false;
    clickEvent(){
      this.status = !this.status;       
    }

    initFormUserName() {
      this.FormUser_updateName=this.formBuilder.group({
        userName: ['', Validators.required],
        userNameConfirm: ['', Validators.required]
      });
    }

    initFormPassword() {
      this.FormUser_updatePassword=this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      });
    }


    onUpdateUserName(){
      const newNomUser= this.FormUser_updateName.get('userName')?.value;
      const newAppUser= new AppUser(newNomUser,'');
      newAppUser.setId(this.principale.id);
  
      this.authService.UpdateUser(newAppUser).subscribe({
        next:(data)=>{
        this.newAppUserName=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("Modifié")){
            this.popup(data.message);
            this.FormUser_updateName.reset();
            this.ReconnectWarning();
          }
        }
        else{
          this.popupError(data.message);
        }
        },
        error:(err)=>{
          //  this.popupError(data.message);
        }
      });
      
    }
    popupError(message: string){
      Swal.fire(" Erreur!", message, "warning");
    }
  
    popup(message:string){
      Swal.fire(" Modification", message, "success");
    }

    public ReconnectWarning(){
      Swal.fire({
        title: 'Mise à jour du profil',
        text: "Veuillez vous reconnecter pour que les modification soit prise en charge !",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor:  '#3085d6',
        cancelButtonText: 'pas maintenant',
        confirmButtonText: 'reconnecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
          this.router.navigate(['/login']);
          Swal.fire(
            'Mise à jour du profil',
            ' la modification de votre profil a été effectué avec succès!',
            'success'
          )
        }
       
      })
  
    }



    onUpdateUserPassword(){
      const newMdpUser= this.FormUser_updatePassword.get('password')?.value;
      const newAppUser= new AppUser('',newMdpUser);
      newAppUser.setId(this.principale.id);
  
      this.authService.UpdateMdpUser(newAppUser).subscribe({
        next:(data)=>{
        this.newAppUserPassword=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("Modifié")){
            this.popup(data.message);
            this.FormUser_updatePassword.reset();
            this.ReconnectMdpWarning();
          }
        }
        else{
          this.popupError(data.message);
        }
        },
        error:(err)=>{
          //  this.popupError(data.message);
        }
      });
      
    }

    public ReconnectMdpWarning(){
      Swal.fire({
        title: 'Mise à jour du mot de passe utilisateur',
        text: "Veuillez vous reconnecter pour que les modification soit prise en charge !",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor:  '#3085d6',
        cancelButtonText: 'pas maintenant',
        confirmButtonText: 'reconnecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
          this.router.navigate(['/login']);
          Swal.fire(
            'Changement de mot de passe',
            ' la modification de votre profil a été effectué avec succès!',
            'success'
          )
        }
       
      })
  
    }

    
  public logoutWarning(){
    Swal.fire({
      title: 'Déconnexion ?',
      text: "Souhaitez-vous vraiment vous déconnecter ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
       
      }
    })
  }



  ListerDernierLigneEtatParDepotsByDepotagence(){
    let j=0;
    let storageData=0;
    
      for(j;j<this.depotAgences.length;j++){

        this.IdDepotagence_byLoops=this.depotAgences[j].idDepotAgence;
        

        this.depotService.ListerDernierLigneEtatParDepotsByDepotagence(this.IdDepotagence_byLoops).subscribe(data=>{
          this.lastEtatForInstances=data;
          let i=0;
          this.InstanceNotifers=0;
          for(i;i< this.lastEtatForInstances.length;i++){
            this.InstanceNotifers+=this.lastEtatForInstances[i].nbInstance;
           ;
          }
          storageData+=this.InstanceNotifers;
          this.instancesTotals=storageData;
        });   
      }
      
  }


}
