import { Component, Input, OnInit, Renderer2, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { Survey, User, Question, QuestionsPerAction, Company, FieldOfAction, SurveyDetail } from '@app/_models';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    public cd: ChangeDetectorRef) { }

  @Input() questionarieMap: any;
  @Input() answeredQuestions: any;
  @Input() companyId: number;
  @Input() surveyId: number;
  @Output() actionSpecificQuestionEvent = new EventEmitter<any>();

  ngOnInit() {
  }

  navigateToAppropriateQuestion(fieldOfActionId: number): void {
    this.actionSpecificQuestionEvent.next(fieldOfActionId);
  }

  ngDoCheck() {
    var items: any = document.getElementsByClassName('progress-bar');
    for (let i = 0; i < items.length; i++) {
      let element = items[i];
      let percentageCompleted = (this.questionarieMap[i].questionsCompleted / this.questionarieMap[i].totalQuestions) * 100;
      for (let i = 0; i < percentageCompleted; i++) {
        setTimeout(() => {
          element.style.width = i + "%";
          element.innerHTML = i + " %";
          if (i < 50) {
            element.className = "progress-bar bg grey darken-2";
          } else {
            element.className = "progress-bar bg-primary";
          }
        }, 5000);
      }
    }
  }
}