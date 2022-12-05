export interface Ticket_DTO{
    serialNumber: string;
    requestor: number;
    assignee: number;
    ticketType: number;
    startDate: Date;
    updateDate: Date;
    updatedBy: number;
    category: number;
    state: number;
    impact: number;
    priority: number;
    shortDesc: string;
    longDesc: string;
    notes: string;

}

export interface Ticket{
    serialNumber: string;
    requestor: string;
    assignee: string;
    ticketType: string;
    startDate: Date;
    updateDate: Date;
    updatedBy: string;
    category: string;
    state: string;
    impact: string;
    priority: string;
    shortDesc: string;
    longDesc: string;
    notes: string;

}