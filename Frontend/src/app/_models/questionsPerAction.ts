import { Question } from './question';
import { FieldOfAction } from './fieldOfAction';

export class QuestionsPerAction {
    id: number;
    questions: Question[];
    fieldOfActions: FieldOfAction;

    constructor(questions: Question[], fieldOfActions: FieldOfAction) {
        this.questions = questions;
        this.fieldOfActions = fieldOfActions;
    }
}
