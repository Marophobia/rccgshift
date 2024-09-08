import { Icontestants } from './contestants';
import { Iround } from './round';

export enum UserSessionStatus {
    pending = 'pending',
    voted = 'voted',
    skipped = 'skipped',
}

export interface IuserSession {
    get(concatId: string): unknown;
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
    [key: string]: any;
}
