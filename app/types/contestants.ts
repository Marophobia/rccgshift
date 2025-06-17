import { IuserSession, UserSessionStatus } from './user_session';

export enum UserStatus {
    registered = 'registered',
    approved = 'approved',
    disqualified = 'disqualified',
}

export interface Icontestants {
    id: number;
    tag: number;
    name: string;
    email: string;
    telephone: string;
    bio: string;
    regional_pastor: string;
    gender: string;
    age_grade: string;
    category: string;
    creativity: string
    type: string;
    number_of_members: number;
    country: string;
    state: string;
    region: string;
    province: string;
    picture: string;
    status: UserStatus;
    account_number: number
    paid: number;
    date: Date;
    seasonId: number
    groupId: number
    competitionType: number
    user_sessions: IuserSession[] | null;
    Group: IGroup | null
    heardAbout: string | null
}

export interface IGroup {
    id: number
    name: string
    size: number
    User: Icontestants
    GroupMembers: IGroupMembers[] | null
}


export interface IGroupMembers {
    id: number;
    tag: number;
    name: string;
    email: string;
    telephone: string;
    gender: string;
    age_grade: string;
    account_number: number
    status: UserStatus;
    paid: number;
    date: Date;
    seasonId: number
    groupId: number
}
