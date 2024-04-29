
import { Question } from './question';
export class FieldOfAction {
    id: number;
    actionName: string;
    questions: Question[] = [];
}