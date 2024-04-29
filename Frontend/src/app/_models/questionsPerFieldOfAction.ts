import { SurveyDetail } from './surveyDetail';
import { FieldOfAction } from './fieldOfAction';

export class QuestionsPerFieldOfAction {
    id: number;
    questions: SurveyDetail[];
    fieldOfActions: FieldOfAction;
    noOfAnsweredQuestions: number;

    constructor(noOfAnsweredQuestions: number, fieldOfActions: FieldOfAction) {
        this.noOfAnsweredQuestions = noOfAnsweredQuestions;
        this.fieldOfActions = fieldOfActions;
    }
}
