import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { data } from 'jquery';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
import { ObjectRapport_total_depotagence } from 'src/app/models/ObjectRapport_total_depotagence.model';
import { ObjectRapport_total_LR } from 'src/app/models/ObjectRapport_total_LR.model';
import { RapportService } from 'src/app/services/Rapport.service';


export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart|any;
  xaxis: ApexXAxis|any;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[]|any;
  dataLabels: ApexDataLabels|any;
  title: ApexTitleSubtitle|any;
  legend: ApexLegend|any;
  fill: ApexFill|any;
  tooltip: ApexTooltip|any;
};



@Component({
  selector: 'app-combo-pie',
  templateUrl: './combo-pie.component.html',
  styleUrls: ['./combo-pie.component.scss']
})
export class ComboPieComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent={} as ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  total_LR!: ObjectRapport_total_LR[]; 
  total_Depotagence!: ObjectRapport_total_depotagence;

  instances: number[]=[];
  livrees: number[]=[];
  retours: number[]=[];
  mois: string[]=[];

  test: number[]=[];

  I: number=0;
  nb: number=0;
  i: number=0; 

  currentYear:number;

  bool: boolean=false;

  @Output() livrees_emit=new EventEmitter<number[]>();
  @Output() retours_emit=new EventEmitter<number[]>();
  @Output() depot_emit=new EventEmitter<number>();

  // for table also
  @Output() instances_emit=new EventEmitter<number[]>(); 
  @Output() ObjectMonthLR_emit=new EventEmitter<ObjectRapport_total_LR[]>();

  constructor(private rapportService: RapportService) {this.currentYear=new Date().getFullYear();}


  ngOnInit(): void {

    this.rapportService.refreshSubject$.subscribe(()=>{
      this.reloadLR();
    })
    this.reloadLR();
  }


  public reloadLR(){
    this.rapportService.rapportTotalLivreeRetourYear(this.currentYear).subscribe(data=>{
      this.total_LR=data;
      this.ObjectMonthLR_emit.emit(this.total_LR);
      
      this.rapportService.rapportTotalDepotagenceYear(this.currentYear).subscribe(data=>{
        this.total_Depotagence=data;
        this.nb = this.total_Depotagence.total_depotagence;
        
        for(this.i; this.i<this.total_LR.length; this.i++){
          this.I= (this.nb) - (this.total_LR[this.i].total_livree+ this.total_LR[this.i].total_retour);
          
          this.instances.push(this.I);
          this.nb=this.I;
  
          this.livrees.push(this.total_LR[this.i].total_livree);
          this.retours.push(this.total_LR[this.i].total_retour);
          this.mois.push(this.total_LR[this.i].mois);
        }
  
       
        this.bool=true;

        this.livrees_emit.emit(this.livrees);
        this.retours_emit.emit(this.retours);
        this.instances_emit.emit(this.instances);
        this.depot_emit.emit(this.total_Depotagence.total_depotagence);
 
        this.chartOptions = {
          series: [
            {
              name: "Retour",
              type: "column",
              data:this.retours
             
            },
            {
              name: "Livree",
              type: "column",
              data: this.livrees
            },
            {
              name: "Instance",
              type: "line",
              data: this.instances
            }
          ],
          chart: {
            type: "line",
            stacked: false
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: [1, 1, 4]
          },
          title: {
            text: "Etat Actuel",
            align: "left",
            offsetX: 110
          },
          xaxis: {
            categories: this.mois
          },
          yaxis: [
            {
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#008FFB"
              },
              labels: {
                style: {
                  colors: "#008FFB"
                }
              },
              title: {
                style: {
                  color: "#008FFB"
                }
              },
              tooltip: {
                enabled: true
              }
            },
            {
              seriesName: "Retour",
              opposite: true,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#00E396"
              },
              labels: {
                style: {
                  colors: "#00E396"
                }
              },
              title: {
                style: {
                  color: "#00E396"
                }
              }
            },
            {
              seriesName: "Instance",
              opposite: true,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#FEB019"
              },
              labels: {
                style: {
                  colors: "#FEB019"
                }
              },
              title: {
                text: "Instance en cours ...",
                style: {
                  color: "#FEB019"
                }
              }
            }
          ],
          tooltip: {
            fixed: {
              enabled: true,
              position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            }
          },
          legend: {
            horizontalAlign: "left",
            offsetX: 40
          }
          
        };


      });

      
      });
  }
}
