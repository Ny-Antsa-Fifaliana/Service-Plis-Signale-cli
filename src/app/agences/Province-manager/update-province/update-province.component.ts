import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { ProvinceService } from 'src/app/services/Province.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-province',
  templateUrl: './update-province.component.html',
  styleUrls: ['./update-province.component.scss']
})
export class UpdateProvinceComponent implements OnInit {

  FormProvince_update!: FormGroup;
  newProvince!:ProvinceBean;
  ancienNomProvince!: string;
  codeProvince!: number;

  constructor(private formBuilder: FormBuilder,
              private provinceService: ProvinceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
    const ancienNomProvince= this.route.snapshot.params['nomProvince'];
    const codeProvince= this.route.snapshot.params['codeProvince'];

    this.ancienNomProvince=ancienNomProvince;
    this.codeProvince=codeProvince;
  }

  iniForm() {
    this.FormProvince_update=this.formBuilder.group({
      nomProvince: ['', Validators.required]
    });
  }

  onUpdateProvince(){
    const newNomProvince= this.FormProvince_update.get('nomProvince')?.value;
    const newProvince= new ProvinceBean(newNomProvince,[]);
    newProvince.setCodeProvince(this.codeProvince);

    this.provinceService.UpdateProvince(newProvince).subscribe({
      next:(data)=>{
      this.newProvince=data;

      if(data.body!=null){
        if(data.message.includes("Existe")){
          this.popupError(data.message);
        }
        else if(data.message.includes("Modifié")){
          this.popup(data.message);
        }
        this.router.navigate(['sps/agences/province']);
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
    Swal.fire("Modification",message, "success");
  }
}
