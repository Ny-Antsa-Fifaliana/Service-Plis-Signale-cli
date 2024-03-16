import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ObjectRapport_total_LR } from 'src/app/models/ObjectRapport_total_LR.model';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  counter: number=0;
  counter1: number=0;
  i: number=0;
  i1: number=0;
  i2: number=0;


  livrees: number=0;
  retours: number=0;
  instances: number=0;
  depot: number=0;

  objectLR: ObjectRapport_total_LR[]=[];
  instance_list: number[]=[];

  constructor() { }

  ngOnInit(): void {}

  objectLRFunction(obj: ObjectRapport_total_LR[]){
    for(this.counter; this.counter<obj.length; this.counter++){
     this.objectLR[this.counter]=obj[this.counter];
    }
  }

  instance_listFunction(instance: number[]){
    for(this.counter1; this.counter1<instance.length; this.counter1++){
      this.instance_list[this.counter1]=instance[this.counter1];
     }
  }

  totalLivree(livrees: number[]){
    for(this.i; this.i<livrees.length; this.i++){
      this.livrees+=livrees[this.i];
    }
    
  }

  totalRetour(retours: number[]){
    for(this.i1; this.i1<retours.length; this.i1++){
      this.retours+=retours[this.i1];
    }
  }

  totalInstance(instances: number[]){
    for(this.i2; this.i2<instances.length; this.i2++){
      this.instances=instances[this.i2];
    }
  }

  totalDepot(depots: number){
      this.depot=depots;
    }
   
}



