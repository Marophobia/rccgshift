import { IuserSession, UserSessionStatus } from './user_session';

export enum UserStatus {
    registered = 'registered',
    approved = 'approved',
    disqualified = 'disqualified',
}

export interface Icontestants {
    id: number;
    name: string;
    email: string;
    telephone: string;
    bio: string;
    regional_pastor: string;
    gender: string;
    age_grade: string;
    category: string;
    type: string;
    number_of_members: number;
    country: string;
    state: string;
    region: string;
    province: string;
    picture: string;
    status: UserStatus;
    date: Date;
    user_sessions: IuserSession[] | null;
}
