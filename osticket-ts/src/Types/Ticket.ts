
export interface TicketFormData {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    priorityId?: number;
    topicId?: number;
    slaId?: number;
    deptId?: number;
    staffId?: number;
    teamId?: number;
    statusId?: number;
}


export interface TicketFromDataUpdate {
    id?: number;
    priorityId?: number;
    topicId?: number;
    slaId?: number;
    deptId?: number;
    staffId?: number;
    teamId?: number;
    statusId?: number;
    message?: string;
    reply?: string;
    note?: string;
}

export interface TicketG {
    id: number;
    number: string;
    subject: string;
}