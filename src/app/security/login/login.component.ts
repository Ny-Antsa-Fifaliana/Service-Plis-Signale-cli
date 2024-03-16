import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AppUser } from 'src/app/models/AppUser.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { IToken } from '../interfaces/IToken';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;  
  errorMessage!: any;
  profileUser!: AppUser;
  token!: any;

  loading: boolean=false;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
  }

  iniForm() {
    this.userFormGroup=this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLogin(){
    this.loading=true;
    const username= this.userFormGroup.get('username')?.value;
    const password= this.userFormGroup.get('password')?.value;

    this.authenticationService.login(username,password).subscribe({
      next:data=>{
        this.token=data;
        localStorage.setItem("access_token",this.token.access_token);
        localStorage.setItem("refresh_token",this.token.refresh_token);
       
        this.authenticationService.GetProfile().subscribe(data=>{
          this.profileUser=data;
          
          this.authenticationService.authenticateUser(this.profileUser).subscribe({
            next:async (data)=>{
              await new Promise(f => setTimeout(f, 1000));
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Content de vous revoir ' + this.profileUser.userName+ ' !!'
              })
 
              this.router.navigate(['sps/dashboard']);
            }
          })
        });
       
      },
      error: (err)=>{
        this.loading=false;
        this.errorMessage="Erreur de connexion, veuillez verifier les champs !! ";
      }
    });

  }

}
