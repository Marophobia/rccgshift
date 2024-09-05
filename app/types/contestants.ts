export enum UserStatus {
    'registered',
    'approved',
    'disqualified'
}

export interface Icontestants {
    id: number,
    name: string,
    email: string,
    telephone: string,
    bio: string,
    regional_pastor: string,
    gender: string,
    age_grade: string,
    category: string,
    type: string,
    number_of_members: number,
    country: string,
    state: string,
    region: string,
    province: string,
    picture: string,
    status: UserStatus,
    date: Date
}
