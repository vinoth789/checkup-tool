import { SurveyAnswer } from './surveyAnswer';

export class SurveyDetail {
    id: number;
    questionId: number;
    fieldOfActionId: number;
    surveyId: number;
    surveyAnswers: SurveyAnswer[] = [];

    constructor(questionId: number, fieldOfActionId: number, surveyId: number, surveyAnswers: SurveyAnswer[]) {
        this.questionId = questionId;
        this.fieldOfActionId = fieldOfActionId;
        this.surveyId = surveyId;
        this.surveyAnswers = surveyAnswers;
    }
}
