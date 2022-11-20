export interface Ticket_DTO{
    serialNumber: string;
    requestor: number;
    assignee: number;
    startDate: Date;
    updateDate: Date;
    updatedBy: string;
    category: number;
    state: number;
    impact: number;
    priority: number;
    shortDesc: string;
    longDesc: string;
    notes: string;

}