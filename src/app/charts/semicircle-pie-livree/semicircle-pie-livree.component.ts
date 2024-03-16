import { Component, Input, OnInit, ViewChild } from '@angular/core';


import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries|any;
  chart: ApexChart|any;
  labels: string[]|any;
  plotOptions: ApexPlotOptions|any;
  fill: ApexFill|any;
};


@Component({
  selector: 'app-semicircle-pie-livree',
  templateUrl: './semicircle-pie-livree.component.html',
  styleUrls: ['./semicircle-pie-livree.component.scss']
})
export class SemicirclePieLivreeComponent  {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() percent!: any;
  @Input() bool: boolean=false;

  constructor() {
    this.chartOptions = {
      chart: {
        type: "radialBar",
        offsetY: -20
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: "16px"
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        }
      },
      labels: ["Average Results"]
    };
  }

}
