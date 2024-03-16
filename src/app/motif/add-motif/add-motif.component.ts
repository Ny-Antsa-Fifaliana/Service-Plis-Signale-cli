import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MotifBean } from 'src/app/models/MotifBean.model';
import { ResponseMessage } from 'src/app/models/ResponseMessage.model';
import { MotifService } from 'src/app/services/MotifService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-motif',
  templateUrl: './add-motif.component.html',
  styleUrls: ['./add-motif.component.scss']
})
export class AddMotifComponent implements OnInit {
  FormMotif_add!: FormGroup;
  newMotif!:any;
  testBody !: ResponseMessage;
  constructor(private formBuilder: FormBuilder,
              private motifService: MotifService,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
  }

  iniForm() {
    this.FormMotif_add=this.formBuilder.group({
      nomMotif: ['', Validators.required]
    });
  }

  onAddMotif(){
    const nomMotif= this.FormMotif_add.get('nomMotif')?.value;
    const newMotif= new MotifBean(nomMotif,[]);
  
    this.motifService.SaveMotif(newMotif).subscribe({
      next:(data)=>{
        this.newMotif=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("enregistré")){
            this.popup(data.message);
          }
          this.router.navigate(['/sps/motif']);
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
