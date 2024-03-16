import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeposeurBean } from 'src/app/models/DeposeurBean.model';
import { ResponseMessage } from 'src/app/models/ResponseMessage.model';
import { DeposeurService } from 'src/app/services/Deposeur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-deposeur',
  templateUrl: './add-deposeur.component.html',
  styleUrls: ['./add-deposeur.component.scss']
})
export class AddDeposeurComponent implements OnInit {

  FormDeposeur_add!: FormGroup;
  newDeposeur!:any;
  testBody !: ResponseMessage;

  constructor(private formBuilder: FormBuilder,
              private deposeurService: DeposeurService,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
  }

  iniForm() {
    this.FormDeposeur_add=this.formBuilder.group({
      nomDeposeur: ['', Validators.required]
    });
  }

  onAddDeposeur(){
    const nomDeposeur= this.FormDeposeur_add.get('nomDeposeur')?.value;
    const newDeposeur= new DeposeurBean(nomDeposeur,[]);
  
    this.deposeurService.SaveDeposeur(newDeposeur).subscribe({
      next:(data)=>{
        this.newDeposeur=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("enregistré")){
            this.popup(data.message);
          }
          this.router.navigate(['/sps/deposeur']);
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
    Swal.fire(" Ajout ok !", message, "success");
  }

}
