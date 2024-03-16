import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ObjectRapport_total_depotprovince_year } from 'src/app/models/ObjectRapport_total_depotprovince_year.model';
import { RapportService } from 'src/app/services/Rapport.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries |any;
  chart: ApexChart |any;
  responsive: ApexResponsive[] |any;
  labels: any;
};


@Component({
  selector: 'app-donut-pie',
  templateUrl: './donut-pie.component.html',
  styleUrls: ['./donut-pie.component.scss']
})
export class DonutPieComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent={} as ChartComponent;
  public chartOptions!: Partial<ChartOptions>;


  nom_depot_province!: ObjectRapport_total_depotprovince_year[];
  nomProvince: string[]=[];
  nbDepotprovince: number[]=[];
  i: number=0;
  bool: boolean= false;

  currentYear:number;

  constructor(private rapportService: RapportService) {this.currentYear=new Date().getFullYear();}

  ngOnInit(): void {
    this.rapportService.refreshSubject$.subscribe(()=>{
      this.reloadProvinces();
    })
    this.reloadProvinces();
  }

  reloadProvinces(){
    this.rapportService.rapportTotalDepotprovinceYear(this.currentYear).subscribe(data=>{
      this.nom_depot_province=data;
      

      for(this.i; this.i< this.nom_depot_province.length; this.i++){
        this.nomProvince.push(this.nom_depot_province[this.i].nomProvince);
        this.nbDepotprovince.push(this.nom_depot_province[this.i].total_depotprovince);
      }

      this.bool=true;
      this.chartOptions = {
          series: this.nbDepotprovince,
          chart: {
            type: "pie"
          },
          labels: this.nomProvince,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

    })
  }
}
