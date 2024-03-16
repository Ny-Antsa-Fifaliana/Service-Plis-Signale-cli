import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeposeurBean } from 'src/app/models/DeposeurBean.model';
import { DeposeurService } from 'src/app/services/Deposeur.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-deposeur',
  templateUrl: './update-deposeur.component.html',
  styleUrls: ['./update-deposeur.component.scss']
})
export class UpdateDeposeurComponent implements OnInit {

  FormDeposeur_update!: FormGroup;
  newDeposeur!: any;
  ancienNomDeposeur!: string;
  idDeposeur!: number;

  constructor(private formBuilder: FormBuilder,
              private deposeurService: DeposeurService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
    const ancienNomDeposeur= this.route.snapshot.params['nomDeposeur'];
    const idDeposeur= this.route.snapshot.params['idDeposeur'];

    this.ancienNomDeposeur=ancienNomDeposeur;
    this.idDeposeur=idDeposeur;
  }


  iniForm() {
    this.FormDeposeur_update=this.formBuilder.group({
      nomDeposeur: ['', Validators.required]
    });
  }

  onUpdateDeposeur(){
    const newNomDeposeur= this.FormDeposeur_update.get('nomDeposeur')?.value;
    const newDeposeur= new DeposeurBean(newNomDeposeur,[]);
    newDeposeur.setIdDeposeur(this.idDeposeur);

    this.deposeurService.UpdateDeposeur(newDeposeur).subscribe({
      next:(data)=>{
        this.newDeposeur=data;

        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("Modifié")){
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
    Swal.fire(" Modification", message, "success");
  }
}
