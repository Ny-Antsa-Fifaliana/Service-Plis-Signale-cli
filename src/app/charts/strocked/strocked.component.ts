import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries|any;
  chart: ApexChart| any;
  labels: string[]| any;
  plotOptions: ApexPlotOptions| any;
  fill: ApexFill| any;
  stroke: ApexStroke| any;
};


@Component({
  selector: 'app-strocked',
  templateUrl: './strocked.component.html',
  styleUrls: ['./strocked.component.scss']
})
export class StrockedComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

@Input() percent!: any ;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        height: 125,
        type: "radialBar", 
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY:  -10,
              fontSize: "16px",
              color: "#00e396",
              formatter: function(val: any) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 0
      },
      labels: [""]
    };
  }

}
