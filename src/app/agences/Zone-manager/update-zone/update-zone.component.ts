import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneBean } from 'src/app/models/ZoneBean.model';
import { ZoneService } from 'src/app/services/Zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-zone',
  templateUrl: './update-zone.component.html',
  styleUrls: ['./update-zone.component.scss']
})
export class UpdateZoneComponent implements OnInit {

  FormZone_update!: FormGroup;
  newZone!: ZoneBean;
  ancienNomZone!: string;
  idZone!: number;
  codeCurrentProvince!: number;

  constructor(private formBuilder: FormBuilder,
              private zoneService: ZoneService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
    const ancienNomZone= this.route.snapshot.params['nomZone'];
    const idZone= this.route.snapshot.params['idZone'];
    this.codeCurrentProvince= this.route.snapshot.params['codeProvince'];

    this.ancienNomZone=ancienNomZone;
    this.idZone=idZone;
  }


  iniForm() {
    this.FormZone_update=this.formBuilder.group({
      nomZone: ['', Validators.required]
    });
  }



  onUpdateZone(){
    const newNomZone= this.FormZone_update.get('nomZone')?.value;
    const newZone= new ZoneBean(newNomZone,[]);
    newZone.setIdZone(this.idZone);

    this.zoneService.UpdateZone(newZone).subscribe({
      next:(data)=>{
      this.newZone=data;
      if(data.body!=null){
        if(data.message.includes("Existe")){
          this.popupError(data.message);
        }
        else if(data.message.includes("Modifié")){
          this.popup(data.message);
        }
        this.router.navigate(['/sps','agences', 'zone',this.codeCurrentProvince]);
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
