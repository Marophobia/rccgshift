export interface IregionalPastors {
    id: number;
    name: string;
    phone: string;
    region: string;
    province: string;
    state: string;
    regional_shift_coordinator_name: string;
    regional_shift_coordinator_phone: string;
    assistant_regional_shift_coordinator_name: string | null;
    assistant_regional_shift_coordinator_phone: string | null;
    createdAt: Date;
}

export interface IprovincialPastors {
    id: number;
    name: string;
    phone: string;
    region: string;
    province: string;
    provincial_shift_coordinator_name: string;
    provincial_shift_coordinator_phone: string;
    createdAt: Date;
}
