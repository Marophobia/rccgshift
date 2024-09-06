import { Icontestants } from './contestants';
import { Iround } from './round';

enum UserSessionStatus {
    'voted',
    'skipped',
    'pending',
}

export interface IuserSession {
    id: number;
    round_id: number;
    votes: number;
    judge_votes: number;
    score: number;
    user_id: number;
    user: Icontestants;
    round: Iround;
    status: UserSessionStatus;
}
