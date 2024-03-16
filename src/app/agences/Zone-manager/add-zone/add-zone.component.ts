import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { ZoneBean } from 'src/app/models/ZoneBean.model';
import { ProvinceService } from 'src/app/services/Province.service';
import { ZoneService } from 'src/app/services/Zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {

  FormZone_add!: FormGroup;
  currentProvince!: ProvinceBean;
  newZone!: ZoneBean;
  codeProvince!: number;

  constructor(private formBuilder: FormBuilder,
              private zoneService: ZoneService,
              private provinceService: ProvinceService,
              private router: Router,
              private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.iniForm();
    this.codeProvince= this.route.snapshot.params['codeProvince'];
    this.provinceService.getProvinceByCodeProvince(this.codeProvince).subscribe(data=>{
      this.currentProvince=data;
    });
  }

  iniForm() {
    this.FormZone_add=this.formBuilder.group({
      nomZone: ['', Validators.required]
    });
  }

  onAddZone(){
    const nomZone= this.FormZone_add.get('nomZone')?.value;
    const newZone= new ZoneBean(nomZone,[]);

    this.zoneService.SaveZone(newZone, this.currentProvince).subscribe({
      next:(data)=>{
        this.newZone=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("enregistré")){
            this.popup(data.message);
          }
          this.router.navigate(['/sps','agences', 'zone',this.codeProvince]);
        }
        else{
          this.popupError(data.message);
        }
      },
      error:(err)=>{
        // this.popupError(data.message);
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
