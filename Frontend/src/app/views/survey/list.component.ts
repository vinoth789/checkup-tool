import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService, SurveyService, QuestionService, AlertService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Survey, Question, QuestionsPerAction, Company, FieldOfAction, SurveyDetail } from '@app/_models';
declare var $: any;

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  companies = null;
  questions: Promise<Question[]>;
  savequestions: Question[] = [];
  questionsPerActions: Question[] = [];
  surveyStatus: QuestionsPerAction[] = [];
  totalQuestions: number;
  surveys: Survey[] = [];
  displaySurveys = null;
  form: FormGroup;
  chooseSurveyForm: FormGroup;
  selectedCompany: Company;
  selectedSurvey: Survey;
  public questionarieMap: any;
  createSurveyForm: FormGroup;
  loading = false;
  addNewSurvey: Survey;
  companyId: any;
  surveyId: number;
  fieldOfActions: FieldOfAction[] = [];
  answeredQuestions: QuestionsPerAction[] = [];
  surveyDetails: SurveyDetail[] = [];
  actionSpecificQuestion: Question[] = [];
  role: string;
  username: string;
  companyList: Company[] = [];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private alertService: AlertService) { }

  async ngOnInit() {
    this.createSurveyForm = this.formBuilder.group({
      newSurvey: ['', Validators.required]
    });
    this.chooseSurveyForm = this.formBuilder.group({
      company: [''],
      survey: ['']
    });
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
    this.companyService.getAllCompanies()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
        if (this.role == 'Consultant' || this.role == 'User') {
          this.companyList = [];
          companies.forEach(company => {
            console.log(company);
            let isUserExist = company.users.filter(user => user.username === this.username);
            if (isUserExist.length !== 0)
              this.companyList.push(company);
          })
          this.companies = this.companyList;
          console.log(this.companyList);
        }
      });
    await this.getSurveys();
    await this.getFieldOfActions();
    await this.getSurveyDetails();
    await this.getQuestion();
    await this.getSelectedCompany();
  }

  async getFieldOfActions(): Promise<FieldOfAction[]> {
    this.fieldOfActions = await this.questionService.getAllFieldOfActions();
    return this.fieldOfActions;
  }

  async getQuestion(): Promise<Question[]> {
    this.savequestions = await this.questionService.getAll();
    this.totalQuestions = this.savequestions.length;
    return this.savequestions;
  }

  async getSurveyDetails() {
    this.surveyDetails = await this.surveyService.getSurveyDetails();
  }

  async getSurveys() {
    this.surveys = await this.surveyService.getAllSurveys();
  }

  navigateToAppropriateQuestion(fieldOfActionId: any) {
    let redirectToQuestionNumber: number;
    let noOfAnsweredQuestions: number = this.answeredQuestions[fieldOfActionId].questions.length;
    if (noOfAnsweredQuestions == 0) {
      redirectToQuestionNumber = this.answeredQuestions[fieldOfActionId].fieldOfActions.questions[0].id;
    } else {
      redirectToQuestionNumber = this.answeredQuestions[fieldOfActionId].questions[noOfAnsweredQuestions - 1].id + 1;
    }
    if (redirectToQuestionNumber <= this.totalQuestions) {
      this.router.navigate(['./question', { questionId: redirectToQuestionNumber }], {
        relativeTo: this.route, state:
        {
          companyId: this.companyId,
          surveyId: this.surveyId,
          fieldOfActionId: fieldOfActionId + 1,
          actionSpecificQuestion: this.savequestions
        }
      });
    }
  }

  async getSelectedCompany() {
    this.companyId = this.chooseSurveyForm.value.company;
    if (this.companyId == "") {
      this.companyId = this.companies[0].id;
      this.chooseSurveyForm.controls['company'].setValue(this.companyId, { onlySelf: true });
    }
    this.selectedCompany = this.companies.filter(o1 => o1.id === this.companyId);
    await this.getSurveys();
    this.displaySurveys = this.surveys.filter(o1 => o1.companyId === this.companyId);
    if (this.companies.length == 0) {
      document.getElementById("companyListEmptyError").innerHTML = "No company exist to start survey";
      setTimeout(function () {
        document.getElementById("companyListEmptyError").innerHTML = "";
      }, 2000);
      return;
    }
    if (this.displaySurveys.length == 0) {
      document.getElementById("surveyListEmptyError").innerHTML = "Please create a survey";
      setTimeout(function () {
        document.getElementById("surveyListEmptyError").innerHTML = "";
      }, 2000);
      return;
    } else {
      this.surveyId = this.displaySurveys[0].id;
      this.chooseSurveyForm.controls['survey'].setValue(this.surveyId, { onlySelf: true });
      await this.getSelectedSurvey(this.surveyId);
    }
  }
  async getSelectedSurvey(surveyId: any) {
    if (surveyId != -1) {
      this.surveyId = surveyId;
    } else {
      this.surveyId = this.chooseSurveyForm.value.survey;
    }
    this.selectedSurvey = this.companies.filter(o1 => o1.id === this.surveyId);
    this.answeredQuestions = [];
    this.fieldOfActions.forEach(fieldOfAction => {
      let isQuestionAnswered: Question[] = fieldOfAction.questions.filter(x => this.surveyDetails.filter(x => x.surveyId === this.surveyId).find(y => y.questionId === x.id));
      this.answeredQuestions.push(new QuestionsPerAction(isQuestionAnswered, fieldOfAction));
    });
  }

  submitCreateSurveyForm() {
    let surveyName = this.createSurveyForm.controls['newSurvey'].value;
    if (surveyName == null || surveyName == "") {
      document.getElementById("surveyEmpty").innerHTML = "Please enter the survey";
      setTimeout(function () {
        document.getElementById("surveyEmpty").innerHTML = "";
      }, 2000);
      return;
    }
    this.addNewSurvey = new Survey(surveyName, this.companyId);
    this.createSurvey(this.addNewSurvey);
    $('#createSurveyModal').modal('hide');
    this.createSurveyForm.get('newSurvey').reset();
    this.chooseSurveyForm.get('company').reset();
    this.chooseSurveyForm.get('survey').reset();
  }

  async createSurvey(addSurvey: Survey) {
    await this.surveyService.registerNewSurvey(addSurvey)
      .then(response => {
        this.alertService.success('Survey added successfully', { keepAfterRouteChange: true });
      });
  }
}