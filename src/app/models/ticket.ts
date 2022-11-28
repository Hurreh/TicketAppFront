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