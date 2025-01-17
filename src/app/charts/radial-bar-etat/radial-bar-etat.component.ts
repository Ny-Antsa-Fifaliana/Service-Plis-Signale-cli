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
  chart: ApexChart|any;
  labels: string[]|any;
  plotOptions: ApexPlotOptions|any;
  fill: ApexFill|any;
  stroke: ApexStroke|any;
};

@Component({
  selector: 'app-radial-bar-etat',
  templateUrl: './radial-bar-etat.component.html',
  styleUrls: ['./radial-bar-etat.component.scss']
})
export class RadialBarEtatComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

@Input() listes!: number[];
@Input() bool: boolean=false;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        height: 250,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#111",
              fontSize: "17px"
            },
            value: {
              formatter: function(val: any) {
                return parseInt(val.toString(), 10).toString()+'%';
              },
              color: "red",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Instance"]
    };
  }
}
