import { Question } from './question';
import { FieldOfAction } from './fieldOfAction';
import { Department } from './department';

export class AnswerPerFieldAndSubject {
    id: number;
    fieldOfActionId: number;
    department: Department;
    averageScore: number;

    constructor(fieldOfActionId: number, department: Department, averageScore: number) {
        this.fieldOfActionId = fieldOfActionId;
        this.department = department;
        this.averageScore = averageScore;
    }
}
