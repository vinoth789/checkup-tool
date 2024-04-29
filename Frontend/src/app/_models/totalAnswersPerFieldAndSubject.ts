import { Question } from './question';
import { AvgScorePerDepartment } from './avgScorePerDepartment';

export class TotalAnswersPerFieldAndSubject {
    id: number;
    fieldOfActionName: any;
    avgScorePerDepartment: any;

    constructor(fieldOfActionName: any, avgScorePerDepartment: any) {
        this.fieldOfActionName = fieldOfActionName;
        this.avgScorePerDepartment = avgScorePerDepartment;
    }
}
