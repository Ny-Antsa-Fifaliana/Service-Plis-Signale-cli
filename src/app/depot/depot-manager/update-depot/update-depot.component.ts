import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeposeurBean } from 'src/app/models/DeposeurBean.model';
import { DepotBean } from 'src/app/models/DepotBean.model';
import { DeposeurService } from 'src/app/services/Deposeur.service';
import { DepotService } from 'src/app/services/Depot.service';

@Component({
  selector: 'app-update-depot',
  templateUrl: './update-depot.component.html',
  styleUrls: ['./update-depot.component.scss']
})
export class UpdateDepotComponent implements OnInit {

  FormDepot_update!: FormGroup;
  newDepot!: DepotBean;
  ancienNbDepot!: number;
  idDepot!: number;
  CurrentIdDepotProvince!: number;

  
  constructor(private formBuilder: FormBuilder,
              private depotService: DepotService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();

    const ancienNbDepot= this.route.snapshot.params['nbDepot'];
    const idDepot= this.route.snapshot.params['idDepot'];
    this.CurrentIdDepotProvince= this.route.snapshot.params['idDepotProvince'];

    this.ancienNbDepot=ancienNbDepot;
    this.idDepot=idDepot;
  }

  iniForm() {
    this.FormDepot_update=this.formBuilder.group({
      nbDepot: ['', Validators.required],
    });
  }


  onUpdateDepot(){
    const newNbDepot= this.FormDepot_update.get('nbDepot')?.value;
    const newDepot= new DepotBean(newNbDepot);
    newDepot.setIdDepot(this.idDepot);

    this.depotService.UpdateDepot(newDepot).subscribe(data=>{
      this.newDepot=data;
 
    });
    this.router.navigate(['/sps','depot',this.CurrentIdDepotProvince]);
  }


}


