import { Component, Input, OnInit, Renderer2, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent implements OnInit {

  imageSrc = '.../_images/Assistance_Systems.png'; 

  constructor(private renderer: Renderer2, public cd: ChangeDetectorRef) { }

  @Input() questionarieMap: any;
  @Input() answeredQuestionsPerAction: any;
  @Input() answeredQuestions: any;

  ngOnInit() {}

ngDoCheck(){
  //console.log('ngDoCheck child B');
  var items:any = document.getElementsByClassName('progress-bar');
  
  for (let i = 0; i < items.length; i++) {
      let element = items[i];
      let percentageCompleted = (this.answeredQuestionsPerAction[i].noOfAnsweredQuestions/this.answeredQuestionsPerAction[i].fieldOfActions.questions.length)*100;
      for(let i = 0; i < percentageCompleted+1; i++){
       setTimeout(() => {
         element.style.width = i + "%";
         element.innerHTML = i + " %";
         if(i < 50){
           element.className ="progress-bar bg grey darken-2";
         }else {
           element.className ="progress-bar";
           element.style.backgroundColor = "rgb(31, 130, 192)"
         }                    
     }, 3000);
      }
    }
  }
}