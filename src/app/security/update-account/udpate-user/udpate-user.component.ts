import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { IToken } from '../../interfaces/IToken';

@Component({
  selector: 'app-udpate-user',
  templateUrl: './udpate-user.component.html',
  styleUrls: ['./udpate-user.component.scss']
})
export class UdpateUserComponent implements OnInit {

  FormUser_update!: FormGroup;
  newAppUser!: AppUser;
  ancienNomAppUser!: string;
  id!: number;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
    const ancienNomAppUser= this.route.snapshot.params['userName'];
    const id= this.route.snapshot.params['id'];

    this.ancienNomAppUser=ancienNomAppUser;
    this.id=id;
  }

  iniForm() {
    this.FormUser_update=this.formBuilder.group({
      userName: ['', Validators.required]
    });
  }

  onUpdateUser(){
    const newNomUser= this.FormUser_update.get('userName')?.value;
    const newAppUser= new AppUser(newNomUser,'');
    newAppUser.setId(this.id);

    this.authService.UpdateUser(newAppUser).subscribe({
      next:(data)=>{
      this.newAppUser=data;
      if(data.body!=null){
        if(data.message.includes("Existe")){
          this.popupError(data.message);
        }
        else if(data.message.includes("Modifié")){
          this.router.navigate(['/sps/account']);
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

}
