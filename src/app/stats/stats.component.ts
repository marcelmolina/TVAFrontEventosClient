import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    },
    legend: { display: false }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(51,34,85,1)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.paintChart();
    setInterval(() => {
      this.paintChart();
    }, 5000);
  }

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  paintChart() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      this.apiService.getResults(id).subscribe(response => {
        console.log(response);

        let arrayValues = [];
        let arrayLabels = [];

        for (let index = 0; index < response.length; index++) {
          const element = response[index];

          arrayValues.push(element.qty);
          arrayLabels.push(element.candidate_id);
        }

        this.barChartData = [{ data: arrayValues, label: 'ID' }];
        this.barChartLabels = [...arrayLabels];
      });
    });
  }
}
