export class SurveyAnswer {
    id: number;
    departmentId: number;
    score: number;
    surveyDetailId: number;

    constructor(departmentId: number, score: number) {
        this.departmentId = departmentId;
        this.score = score;
    }
}
