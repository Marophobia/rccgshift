export type IOfficials = {
    id: number;
    name: string;
    image: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    type: OfficialType;
    status: boolean;
    official_sessions: IOfficialSession[];
}
export type IDepartments = {
    id: number;
    name: string;
}

export type IOfficialSession = {
    id: number;
    amount_to_pay: number;
    amount_paid: number;
    position: string;
    region: string;
    province: string;
    officialId: number;
    seasonId: number;
    departmentId: number;
    status: number;
    department: IDepartments;
}

export type IReports = {
    id: number;
    name: string;
    authorId: number;
    report: string;
    file: string;
    date: Date;
    author: IOfficials;
    type: ReportType;
}

export enum ReportType {
    text = "text",
    file = "file"
}

export enum OfficialType {
    regional_shift_coordinator = "regional_shift_coordinator",
    assistant_regional_shift_coordinator = "assistant_regional_shift_coordinator",
    provincial_shift_coordinator = "provincial_shift_coordinator",
    shift_executive = "shift_executive"
}