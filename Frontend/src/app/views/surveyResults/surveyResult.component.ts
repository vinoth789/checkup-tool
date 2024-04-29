import { Component, OnInit, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { CompanyService, SurveyService, QuestionService, AlertService } from '@app/_services';
import { Survey, Question, Company, FieldOfAction, SurveyQuestion, SurveyDetail, SurveyAnswer, Department, AvgScorePerDepartment, TotalAnswersPerFieldAndSubject, QuestionsPerAction, AnswerPerFieldAndSubject, QuestionsPerFieldOfAction } from '@app/_models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatten } from '@angular/compiler';
import { Chart } from 'chart.js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


@Component({
  templateUrl: './surveyResult.component.html',
  styleUrls: ['./surveyResult.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyResultComponent implements OnInit {

  public fieldOfActionDataset: Array<any> = [];
  public departmentDataset: Array<any> = [];
  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type: string = 'bar';
  public chart2Type: string = 'pie';
  public chart3Type: string = 'line';
  public chart4Type: string = 'radar';
  public chart5Type: string = 'doughnut';
  public chart6Type: string = 'bubble';
  public avgScorePerDepartmentDataList: Array<number> = [];
  public allSurveyActionChartDataset: Array<any> = [];
  public allSurveyBubbleChartDataset: Array<any> = [];
  public allSurveyDepartmentChartDataset: Array<any> = [];
  public allSurveyMaturityLevel: Array<any> = [];
  public overallMaturityScore: number = 0;
  public avgScorePerDepartmentBubbleChartDataset: Array<any> = [];
  public FieldOfActionChartLabels: Array<any> = ['Data collection and processing', 'Assistance systems', 'Networking and integration', 'Decentralization and service orientation', 'Self organization and autonomy', 'Qualification of employees'];
  public DepartmentChartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    'rgb(187 , 0 , 86)',
    'rgb(57 , 193 , 205)',
    'rgb(245 , 130 , 32)',
    'rgb(178 , 210 , 53)',
    'rgb(253 , 185 , 19)',
    'rgb(211 , 199 , 174)',
  ];
  form: FormGroup;
  companyList: Company[] = [];
  companies: Company[] = [];
  surveyDetails: SurveyDetail[] = [];
  selectedCompany: Company;
  selectedSurvey: Survey;
  companyId: any;
  departmentId: number;
  displaySurveys: Survey[] = [];
  surveys: Survey[] = [];
  surveyId: number;
  role: string;
  username: string;
  fieldOfActions: FieldOfAction[] = [];
  answeredQuestions: QuestionsPerAction[] = [];
  answerPerFieldAndSubject: AnswerPerFieldAndSubject[] = [];
  totalAnswersPerFieldAndSubject: TotalAnswersPerFieldAndSubject[] = [];
  answeredQuestionsPerAction: QuestionsPerFieldOfAction[] = [];
  colorcode = 255;
  fieldOfActionChart: any;
  departmentChart: any;
  maturityRadarChart: any;
  bubbleChart: any;
  public radarChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      },
      gridLines: {

        color: 'blue',

      }
    },
    scale: {
      ticks: {
        beginAtZero: true,
        max: 5
      }
    }
  };
  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      },
      gridLines: {
        color: 'blue',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          stepSize: 1,
          max: 5,
          fontColor: '#5b5f62',
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          stepSize: 1,
          fontColor: '#5b5f62',
        }
      }]
    }
  };

  constructor(private formBuilder: FormBuilder, public cd: ChangeDetectorRef, private companyService: CompanyService, private questionService: QuestionService, private surveyService: SurveyService) { }

  getSelectedDepartment() {
    this.departmentId = this.form.value.departments;
  }
  async getSelectedCompany() {

    if (this.companies.length == 0) {
      document.getElementById("companyListEmptyError").innerHTML = "No company exist to start survey";
      setTimeout(function () {
        document.getElementById("companyListEmptyError").innerHTML = "";
      }, 2000);
      return;
    }
    this.allSurveyActionChartDataset = [];
    this.allSurveyBubbleChartDataset = [];
    this.allSurveyDepartmentChartDataset = [];
    this.allSurveyMaturityLevel = [];

    this.companyId = this.form.value.companies;
    if (this.companyId == "") {
      this.companyId = this.companies[0].id;
      this.form.controls['companies'].setValue(this.companyId, { onlySelf: true });
    }
    this.selectedCompany = this.companies.find(o1 => o1.id === this.companyId);
    await this.getSurveys();
    this.displaySurveys = [];
    this.displaySurveys = this.surveys.filter(o1 => o1.companyId === this.companyId);
    const surveyResults = <HTMLCanvasElement>document.getElementById('surveyResults');
    if (this.displaySurveys.length != 0) {
      surveyResults.style.display = "block";
      this.displaySurveys.forEach(async (x, index) => {
        await this.getSurveyResults(x.id, x.surveyName, index);
      });
    } else {
      surveyResults.style.display = "none";
      document.getElementById("surveyListEmptyError").innerHTML = "No surveys added to the company";
      setTimeout(function () {
        document.getElementById("surveyListEmptyError").innerHTML = "";
      }, 2000);
      return;
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async getSurveyResults(surveyId: number, surveyName: string, index: number) {
    this.surveyId = surveyId;
    let departmentDataset: Array<number> = [];
    this.answeredQuestionsPerAction = [];
    this.FieldOfActionChartLabels = [];
    this.DepartmentChartLabels = [];
    this.avgScorePerDepartmentDataList = [];
    this.fieldOfActionDataset = [];
    let SelectedSurveyDetails: SurveyDetail[] = this.surveyDetails.filter(x => x.surveyId === this.surveyId);
    let selectedCompanyDepartments = flatten(this.companies.filter(x => x.id === this.companyId).map(x => x.departments));

    this.selectedCompany.departments.forEach(x => {
      this.DepartmentChartLabels.push(x.departmentName);
    });

    this.fieldOfActions.forEach(fieldOfAction => {
      this.FieldOfActionChartLabels.push(fieldOfAction.actionName);
      let questionsAnswered = SelectedSurveyDetails.filter(y => y.fieldOfActionId === fieldOfAction.id);
      this.answeredQuestionsPerAction.push(new QuestionsPerFieldOfAction(questionsAnswered.length, fieldOfAction));
      departmentDataset = [];

      selectedCompanyDepartments.forEach(department => {
        let scorePerDepartment: number = 0;
        let surveyAnswersPerDepartment = flatten(questionsAnswered.map(surveyDetail => surveyDetail.surveyAnswers.filter(x => x.departmentId === department.id)));
        surveyAnswersPerDepartment.map(y => {
          if (y.score != -1) {
            scorePerDepartment += y.score;
          }
        });
        let avgScorePerDepartment = scorePerDepartment / questionsAnswered.length;
        if (isNaN(avgScorePerDepartment)) {
          avgScorePerDepartment = 0;
        }
        departmentDataset.push(parseFloat(avgScorePerDepartment.toFixed(2)));
      });
      this.fieldOfActionDataset.push(departmentDataset);
    });
    let avgScorePerDepartmentList: Array<number> = [];

    this.fieldOfActionDataset.forEach((x, index) => {
      let avgScorePerAction: any = 0;
      x.forEach((departmentData) => {
        avgScorePerAction += departmentData / x.length;
      });
      let answeredFieldOfActionCount: number = 0;
      this.fieldOfActionDataset.forEach((y, foaDatasetIndex) => {
        if (index < this.fieldOfActionDataset[foaDatasetIndex].length) {
          answeredFieldOfActionCount += this.fieldOfActionDataset[foaDatasetIndex][index];
        }
      });
      let answeredFOACount = 0;
      this.answeredQuestionsPerAction.forEach(x => {
        if (x.noOfAnsweredQuestions != 0) {
          answeredFOACount++;
        }
      });
      if (index < this.fieldOfActionDataset[index].length) {
        this.avgScorePerDepartmentDataList.push(parseFloat((answeredFieldOfActionCount / answeredFOACount).toFixed(2)));
      }
      avgScorePerDepartmentList.push(avgScorePerAction.toFixed(2));
    });
    let bgColor: any;
    if (index > this.chartColors.length - 1) {
      bgColor = this.getRandomColor();
    } else {
      bgColor = this.chartColors[index];
    }

    let jsonDepartmentChartData = { data: this.avgScorePerDepartmentDataList, label: surveyName, backgroundColor: bgColor, borderColor: bgColor }
    this.allSurveyDepartmentChartDataset.push(jsonDepartmentChartData);
    let jsonDepartmentData = { data: avgScorePerDepartmentList, label: surveyName, backgroundColor: bgColor, borderColor: bgColor }
    this.allSurveyActionChartDataset.push(jsonDepartmentData);
    this.overallMaturityScore = this.avgScorePerDepartmentDataList.reduce((a, b) => (a + b)) / this.avgScorePerDepartmentDataList.length;
    if (isNaN(this.overallMaturityScore)) {
      this.overallMaturityScore = 0;
    }
    let jsonBulletChartDataset = { category: surveyName + ": " + this.overallMaturityScore.toFixed(2), value: this.overallMaturityScore.toFixed(2), target: 5 };
    this.allSurveyMaturityLevel.push(jsonBulletChartDataset);

    this.avgScorePerDepartmentBubbleChartDataset = [];
    this.fieldOfActionDataset.forEach((x, index) => {
      let avgScorePerDepartment: number = 0;
      x.forEach((departmentData, departmentDataIndex) => {
        avgScorePerDepartment = departmentData;
        let jsonDepartmentData = { x: departmentDataIndex, y: index, r: avgScorePerDepartment * 10, label: avgScorePerDepartment }
        this.avgScorePerDepartmentBubbleChartDataset.push(jsonDepartmentData);
      });
    });
    let jsonBubbleChartDataset = { data: this.avgScorePerDepartmentBubbleChartDataset, label: surveyName, backgroundColor: bgColor, borderColor: bgColor };
    this.allSurveyBubbleChartDataset.push(jsonBubbleChartDataset);

    let fieldOfActionLabelArray: string[] = this.FieldOfActionChartLabels;
    let departmentLabelArray: string[] = this.DepartmentChartLabels;

    if (this.bubbleChart) {
      this.bubbleChart.destroy();
    }
    const bubbleChartCanvas = <HTMLCanvasElement>document.getElementById('overviewBubbleChart');
    const bubbleChartCtx = bubbleChartCanvas.getContext('2d');
    this.bubbleChart = new Chart(bubbleChartCtx, {
      type: 'bubble',
      data: {
        labels: this.FieldOfActionChartLabels,
        datasets: this.allSurveyBubbleChartDataset
      },
      // Configuration options go here
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: '#5b5f62',
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              min: -1,
              stepSize: 1,
              max: this.FieldOfActionChartLabels.length,
              fontColor: '#5b5f62',
              callback: function (value, index, values) {
                return fieldOfActionLabelArray[value];
              }
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              min: -0.5,
              stepSize: 1,
              max: this.DepartmentChartLabels.length,
              fontColor: '#5b5f62',
              callback: function (value, index, values) {
                return departmentLabelArray[value];
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (t, d) {
              var data = d.datasets[t.datasetIndex].data[t.index];
              var bubble = JSON.parse(JSON.stringify(data));
              if (t.datasetIndex === 0) return ' Value : ' + bubble.label;
            }
          }
        }
      }
    })
    let integrationLevels: any = [];
    integrationLevels.push("");
    integrationLevels.push("Standardized production Landscape");
    integrationLevels.push("Transparent Factory (Big data)");
    integrationLevels.push("Transparent System (Smart Factory)");
    integrationLevels.push("Fully automated Factory (Dark Factory)");
    integrationLevels.push("Industrial Ecosystems");
    /* Create chart instance */
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 25;
    chart.layout = 'vertical';

    /* Add data */
    chart.data = this.allSurveyMaturityLevel.slice().reverse();

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 60;
    valueAxis.renderer.opposite = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.max = 5;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      if (parseInt(text) > 0 && parseInt(text) < 6)
        return parseInt(text) + " - " + integrationLevels[parseInt(text)];
    });

    /* Create ranges */
    function createRange(axis, from, to, color) {
      let range = axis.axisRanges.create();
      range.value = from;
      range.endValue = to;
      range.axisFill.fill = color;
      range.axisFill.fillOpacity = 0.8;
      range.label.disabled = true;
    }

    createRange(valueAxis, 0, 1, 'rgb(238, 239, 177)');
    createRange(valueAxis, 1, 2, 'rgb(209, 221, 130)');
    createRange(valueAxis, 2, 3, 'rgb(177, 200, 0)');
    createRange(valueAxis, 3, 4, 'rgb(143, 164, 2)');
    createRange(valueAxis, 4, 5, 'rgb(106, 115, 65)');


    /* Create series */
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.columns.template.fill = am4core.color("#000");
    series.columns.template.stroke = am4core.color("#fff");
    series.columns.template.strokeWidth = 0;
    series.columns.template.strokeOpacity = 0;
    series.columns.template.tooltipText = "Maturity level: " + this.overallMaturityScore;
    series.columns.template.height = am4core.percent(25);

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "target";
    series2.dataFields.categoryX = "category";
    series2.strokeWidth = 0;

    let bullet = series2.bullets.push(new am4charts.Bullet());
    let line = bullet.createChild(am4core.Line);
    line.x1 = -85;
    line.y1 = 0;
    line.x2 = 85;
    line.y2 = 0;
    line.tooltipText = "5.0";
    line.stroke = am4core.color("#000");
    line.strokeWidth = 4;

    if (this.fieldOfActionChart) {
      this.fieldOfActionChart.destroy();
    }

    const fieldOfActionCanvas = <HTMLCanvasElement>document.getElementById('fieldOfActionChart');
    const fieldOfActionCtx = fieldOfActionCanvas.getContext('2d');
    this.fieldOfActionChart = new Chart(fieldOfActionCtx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.FieldOfActionChartLabels,
        datasets: this.allSurveyActionChartDataset,
      },

      // Configuration options go here
      options: this.chartOptions
    });

    if (this.departmentChart) {
      this.departmentChart.destroy();
    }

    const departmentCanvas = <HTMLCanvasElement>document.getElementById('departmentChart');
    const departmentCtx = departmentCanvas.getContext('2d');
    this.departmentChart = new Chart(departmentCtx, {
      type: 'bar',
      data: {
        labels: this.DepartmentChartLabels,
        datasets: this.allSurveyDepartmentChartDataset
      },
      options: this.chartOptions
    });

    if (this.maturityRadarChart) {
      this.maturityRadarChart.destroy();
    }

    const statusTargetCanvas = <HTMLCanvasElement>document.getElementById('radarChart');
    const statusTargetCtx = statusTargetCanvas.getContext('2d');
    this.maturityRadarChart = new Chart(statusTargetCtx, {
      type: 'radar',
      data: {
        labels: this.FieldOfActionChartLabels,
        datasets: this.allSurveyActionChartDataset
      },
      options: this.radarChartOptions
    });
  }

  async ngOnInit() {

    this.form = this.formBuilder.group({
      companies: [''],
      departments: [''],
      survey: ['']
    });
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
    // async orders
    this.companyService.getAllCompanies()
      .subscribe((companies: Company[]) => {
        this.companyList = companies;
        if (this.role == 'Consultant' || this.role == 'User') {
          this.companyList = [];
          companies.forEach(x => {
            console.log(x);
            let isUserExist = x.users.filter(o2 => o2.username === this.username);
            if (isUserExist.length !== 0)
              this.companyList.push(x);
          })
          this.companies = this.companyList;
          console.log(this.companyList);
        } else {
          this.companies = this.companyList;
        }
      });
    await this.getSurveys();
    await this.getFieldOfActions();
    await this.getSurveyDetails();
    await this.getAnsweredQuestions();
    await this.getSelectedCompany();
  }

  async getSurveys() {
    this.surveys = await this.surveyService.getAllSurveys();
  }

  async getFieldOfActions() {
    this.fieldOfActions = await this.questionService.getAllFieldOfActions();
  }

  async getSurveyDetails() {
    this.surveyDetails = await this.surveyService.getSurveyDetails();
  }

  async getAnsweredQuestions() {
    this.answeredQuestions = [];
    this.fieldOfActions.forEach(fieldOfAction => {
      let isQuestionAnswered: Question[] = fieldOfAction.questions.filter(x => this.surveyDetails.filter(x => x.surveyId === this.surveyId).find(y => y.questionId === x.id));
      this.answeredQuestions.push(new QuestionsPerAction(isQuestionAnswered, fieldOfAction));
    });
  }

  ngOnChanges() { }

  ngDoCheck() { }

  ngAfterViewInit(): void { }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

}
