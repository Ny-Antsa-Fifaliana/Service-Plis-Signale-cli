import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinceBean } from 'src/app/models/ProvinceBean.model';
import { ProvinceService } from 'src/app/services/Province.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrls: ['./add-province.component.scss']
})
export class AddProvinceComponent implements OnInit {

  FormProvince_add!: FormGroup;
  newProvince!:ProvinceBean;

  constructor(private formBuilder: FormBuilder,
              private provinceService: ProvinceService,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
  }
  iniForm() {
    this.FormProvince_add=this.formBuilder.group({
      nomProvince: ['', Validators.required]
    });
  }

  onAddProvince(){
    const nomProvince= this.FormProvince_add.get('nomProvince')?.value;
    const newProvince= new ProvinceBean(nomProvince,[]);

    this.provinceService.SaveProvince(newProvince).subscribe({

      next:(data)=>{
        this.newProvince=data;

        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("enregistré")){
            this.popup(data.message);
          }
          this.router.navigate(['sps/agences/province']);
        }
        else{
          this.popupError(data.message);
        }
      },
      error:(err)=>{

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
