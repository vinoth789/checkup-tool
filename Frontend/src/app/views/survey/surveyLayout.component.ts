import { Component, OnInit, Input, Output } from '@angular/core';


import { Survey, Question, Company, SurveyQuestion, SurveyDetail, SurveyAnswer, Department } from '@app/_models';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService, SurveyService, QuestionService, AlertService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatListOption } from '@angular/material/list';
import { Any } from 'json2typescript';


@Component({
  selector: 'codelab-question-container',
  templateUrl: './surveyLayout.component.html',
  styleUrls: ['./surveyLayout.component.scss']
})
export class SurveyLayoutComponent implements OnInit {
  @Input() answer: string;
  @Input() formGroup: FormGroup;
  @Output() question: Promise<Question[]>;
  showQuestion: Question;
  totalQuestions: number;
  correctAnswersCount = 0;
  selected = 'All';
  companies: Company[] = [];
  chosenCompany: Company;
  questions: Question[] = [];
  questionAnswer: SurveyAnswer[] = [];
  surveyDetails: SurveyDetail;
  currentQuestionDetails: SurveyDetail;
  surveyAnswers: SurveyAnswer[] = [];
  form: FormGroup;
  selectedCompany: MatListOption;
  public questionarieMap: any;
  createSurveyForm: FormGroup;
  chooseDepartmentForm: FormGroup;
  companyId: number;
  selectedDepartmentId: number;
  surveyId: number;
  fieldOfActionId: number;
  submitOrUpdateAnswer: string;
  answeredQuestions: SurveyDetail[] = [];
  isQuestionAnswered: boolean;
  isPreviousButtonDisabled: boolean = false;
  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  correctAnswer: boolean;
  hasAnswer: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  timeLeft: number;
  timePerQuestion = 20;
  interval: any;
  elapsedTime: number;
  elapsedTimes = [];
  blueBorder = '2px solid #007aff';


  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService,
    private surveyService: SurveyService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private questionService: QuestionService) {
    this.companyId = this.router.getCurrentNavigation().extras.state.companyId;
    this.surveyId = this.router.getCurrentNavigation().extras.state.surveyId;
    this.fieldOfActionId = this.router.getCurrentNavigation().extras.state.fieldOfActionId;
    this.route.paramMap.subscribe(async params => {
      console.log(params.get('questionId'));
      this.setQuestionID(+params.get('questionId'));  // get the question ID and store it
      await this.getQuestion();
    });
  }

  async ngOnInit(): Promise<void> {

    this.chooseDepartmentForm = this.formBuilder.group({
      department: ['']
    });
    this.companyService.getAllCompanies()
      .subscribe((companies: Company[]) => {
        this.chosenCompany = companies.find(company => company.id === this.companyId);
      });

    await this.getQuestion();
    this.selectedDepartmentId = -1;
  }

  async checkIfQuestionAnswered(questionId: number) {

    this.answeredQuestions = await this.surveyService.getSurveyDetails();
    this.currentQuestionDetails = this.answeredQuestions.filter(x => x.surveyId === this.surveyId).find(y => y.questionId === questionId);
    if (this.currentQuestionDetails !== undefined) {
      console.log("this.answeredQuestions" + this.currentQuestionDetails.surveyAnswers);
      this.isQuestionAnswered = true;
      this.currentQuestionDetails.surveyAnswers.forEach(element => {
        let score: any = element.score;
        console.log("selected range values... " + score);
        let elementExist = (<HTMLInputElement>document.getElementById("questionOption" + element.departmentId));
        if (elementExist)
          (<HTMLInputElement>document.getElementById("questionOption" + element.departmentId)).value = score;
      });

    } else {
      this.isQuestionAnswered = false;
      this.chosenCompany.departments.forEach(element => {
        let score: any = -1;
        let elementExist = (<HTMLInputElement>document.getElementById("questionOption" + element.id));
        if (elementExist)
          (<HTMLInputElement>document.getElementById("questionOption" + element.id)).value = score;
      });
    }
    return this.isQuestionAnswered;
  }

  displayNextQuestion() {
    this.questionIndex = this.questionID++;
    this.checkIfQuestionAnswered(this.questionIndex);
    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      //
    } else {
      this.navigateToResults();
    }
  }

  displayPreviousQuestion() {
    let previousQuestion: any;
    let previousQuestionIndex: any;
    this.questionIndex = this.getQuestionID() - 1;
    this.checkIfQuestionAnswered(this.questionIndex);

    // To make the previous button disappear for the first question of each field of action:
    if (this.questionIndex - 1 > 0) {
      previousQuestionIndex = this.questionIndex - 1;
      previousQuestion = this.questions.find(x => x.id === previousQuestionIndex);
      if (this.fieldOfActionId != previousQuestion.fieldOfActionId) {
        this.isPreviousButtonDisabled = true;
      }
    }

    this.router.navigate(['../question', { questionId: this.questionIndex }], { relativeTo: this.route });
    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      //
    } else {
      this.navigateToResults();
    }
  }

  navigateToNextQuestion(addOrUpdate: string): void {
    let answerValue: any;
    this.questionAnswer = [];
    let nextQuestionId = this.getQuestionID() + 1;
    this.chosenCompany.departments.map(department => {
      var departmentId = department.id;
      console.log("departmentId" + department.id);
      if (this.selectedDepartmentId === departmentId || this.selectedDepartmentId === -1) {
        answerValue = (<HTMLInputElement>document.getElementById("questionOption" + departmentId)).value;
      } else {
        answerValue = -1;
      }
      this.questionAnswer.push(new SurveyAnswer(departmentId, parseInt(answerValue)));
    })

    if (addOrUpdate == "add") {
      this.surveyDetails = new SurveyDetail(this.getQuestionID(), this.showQuestion.fieldOfActionId, this.surveyId, this.questionAnswer);
      this.submitAnswers(this.surveyDetails, nextQuestionId);
      console.log(this.surveyDetails);
    } else {
      this.currentQuestionDetails.surveyAnswers.forEach(element => {
        let score: any = element.score;
        let updatedScore: any = -1;
        console.log("selected range values... " + score);
        var elementExist = (<HTMLInputElement>document.getElementById("questionOption" + element.departmentId));
        if (elementExist)
          updatedScore = (<HTMLInputElement>document.getElementById("questionOption" + element.departmentId)).value;
        this.updateAnswers(element.id, new SurveyAnswer(element.departmentId, parseInt(updatedScore)), nextQuestionId);
      });

    }
    this.displayNextQuestion();
  }

  private submitAnswers(surveyAnswers: SurveyDetail, nextQuestionId: number) {

    this.surveyService.submitSurveyAnswer(surveyAnswers)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../question', { questionId: nextQuestionId }], { relativeTo: this.route });
        }
      });
  }

  private updateAnswers(surveyAnswerId: number, surveyAnswers: SurveyAnswer, nextQuestionId: number) {

    this.surveyService.updateSurveyAnswer(surveyAnswerId, surveyAnswers)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../question', { questionId: nextQuestionId }], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }

  navigateToPreviousQuestion(): void {
    this.router.navigate(['/question', this.getQuestionID() - 1]);
    this.displayPreviousQuestion();
  }

  navigateToResults(): void {
    this.router.navigate(['./survey'], {
      state:
      {
        totalQuestions: this.totalQuestions,
        correctAnswersCount: this.correctAnswersCount,
      }
    });
  }

  showOnlySelectedDepartment() {

    this.selectedDepartmentId = this.chooseDepartmentForm.value.department;

  }

  getAnswer(event, departmentId) {
    console.log(event.target.value, departmentId);
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID() + 1) / this.totalQuestions).toFixed(1));
  }

  /****************  public API  ***************/
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.questions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  async getQuestion() {

    this.questions = await this.questionService.getAll();
    this.totalQuestions = this.questions.length;
    this.questions.filter(
      question => question.id === this.questionID
    ).map(x => this.showQuestion = x);
    console.log('Current question: ' + this.showQuestion.id);
    this.checkIfQuestionAnswered(this.getQuestionID());
  }
}
