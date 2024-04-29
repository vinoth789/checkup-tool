import { Question } from './question';
import { FieldOfAction } from './fieldOfAction';
import { Department } from './department';

export class AvgScorePerDepartment {
    id: number;
    departmentName: string;
    averageScore: number;

    constructor(departmentName: string, averageScore: number) {
        this.departmentName = departmentName;
        this.averageScore = averageScore;
    }
}
