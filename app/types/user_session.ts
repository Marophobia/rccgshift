import { Icontestants } from './contestants';
import { Iround } from './round';

export enum UserSessionStatus {
    pending = 'pending',
    voted = 'voted',
    skipped = 'skipped',
}

export interface IuserSession {
    id: number;
    round_id: number;
    votes: number;
    judge_votes1: number;
    judge_votes2: number;
    judge_votes3: number;
    score: number;
    user_id: number;
    user: Icontestants;
    round: Iround;
    status1: UserSessionStatus;
    status2: UserSessionStatus;
    status3: UserSessionStatus;
    qualified?: Boolean;
    [key: string]: any;
}

export interface Iparameters {
    id: number;
    judge: number;
    session_id: number;
    Delivery: number;
    Expression: number;
    Appearance: number;
    Communication: number;
    Technical_skills: number;
    value: number;
}
