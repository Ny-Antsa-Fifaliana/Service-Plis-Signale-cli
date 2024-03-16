import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MotifBean } from 'src/app/models/MotifBean.model';
import { MotifService } from 'src/app/services/MotifService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-motif',
  templateUrl: './update-motif.component.html',
  styleUrls: ['./update-motif.component.scss']
})
export class UpdateMotifComponent implements OnInit {
  
  FormMotif_update!: FormGroup;
  newMotif!: any;
  ancienNomMotif!: string;
  idMotif!: number;

  constructor(private formBuilder: FormBuilder,
              private motifService: MotifService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
    const ancienNomMotif= this.route.snapshot.params['nomMotif'];
    const idMotif= this.route.snapshot.params['idMotif'];

    this.ancienNomMotif=ancienNomMotif;
    this.idMotif=idMotif;
  }

  iniForm() {
    this.FormMotif_update=this.formBuilder.group({
      nomMotif: ['', Validators.required]
    });
  }

  onUpdateMotif(){
    const newNomMotif= this.FormMotif_update.get('nomMotif')?.value;
    const newMotif= new MotifBean(newNomMotif,[]);
    newMotif.setIdMotif(this.idMotif);

    this.motifService.UpdateMotif(newMotif).subscribe({
      next:(data)=>{
        this.newMotif=data;

        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("Modifié")){
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
    Swal.fire(" Modification", message, "success");
  }

}
