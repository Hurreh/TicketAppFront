export interface Categories_DTO{
    id: number;
    categoryName:string;
}

export interface Experts_DTO{
    id: number;
    expertName:string;
}

export interface Impact_DTO{
    impactName:string;
    severity: number;
}

export interface Priority_DTO{
    priorityName:string;
    severity: number;
}

export interface States_DTO{
    id: number;
    stateName:string;
    
}

export interface TicketType_DTO{
    id: number;
    type:string;
    
}