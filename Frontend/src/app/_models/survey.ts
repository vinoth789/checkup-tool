export class Survey {
    id: number;
    surveyName: string;
    companyId: number;

    constructor(surveyName: string, companyId: number) {
        this.surveyName = surveyName;
        this.companyId = companyId;
    }
}