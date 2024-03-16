import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeposeurBean } from 'src/app/models/DeposeurBean.model';
import { DepotAgenceBean } from 'src/app/models/DepotAgenceBean.model';
import { DeposeurService } from 'src/app/services/Deposeur.service';
import { Depot_agenceService } from 'src/app/services/Depot_agence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-depot-agence',
  templateUrl: './add-depot-agence.component.html',
  styleUrls: ['./add-depot-agence.component.scss']
})
export class AddDepotAgenceComponent implements OnInit {

  FormDepotAgence_add!: FormGroup;
  deposeurs!: DeposeurBean[];
  selectDeposeurValue!: number;
  ObjectDeposeurSelected!: DeposeurBean;
  newDepotAgence!: DepotAgenceBean;

  constructor(private formBuilder: FormBuilder,
              private depotAgenceService: Depot_agenceService,
              private deposeurService: DeposeurService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.iniForm();
    this.deposeurService.refreshSubject$.subscribe(()=>{
      this.reloadDeposeur();
    })
    this.reloadDeposeur();
  }


  public reloadDeposeur(){
    this.deposeurService.ListerDeposeur().subscribe(data=>{
      this.deposeurs=data;
      });
  }

  ChangeSelectDeposeur(e: any){
    this.selectDeposeurValue=e.value;
    this.deposeurService.getDeposeurByIdDeposeur(this.selectDeposeurValue).subscribe(data=>{
      this.ObjectDeposeurSelected= data;
    });
  }


  iniForm() {
    this.FormDepotAgence_add=this.formBuilder.group({
      nbDepotAgence: ['', Validators.required],
      deposeur: ['', Validators.required],
      date:['', Validators.required]
    });
  }

  onAddDepotAgence(){
    const nbDepotAgence= this.FormDepotAgence_add.get('nbDepotAgence')?.value;
    const date= this.FormDepotAgence_add.get('date')?.value;

    this.depotAgenceService.SaveDepotAgence(nbDepotAgence,this.ObjectDeposeurSelected.idDeposeur,date).subscribe({
      next:(data)=>{
      this.newDepotAgence=data;
      if(data.body!=null){
        if(data.message.includes("Verifier")){
          this.popupError(data.message);
        }
        else{
          this.popup(data.message);
          this.FormDepotAgence_add.reset();
          this.router.navigate(['/sps/depotagence']);
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
    Swal.fire(" Ajout ok !",message, "success");
  }


}
