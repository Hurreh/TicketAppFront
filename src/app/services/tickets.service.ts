import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filterValues } from '../models/filter';
import { Ticket_DTO } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor() { }

  public filterValuesToStringify: filterValues = {
    serialNumber:   '',
    startDateBegin: '',
    startDateEnd:   '',
    shortDesc:      '',
    requestor:      '',
    priority:       '',
    state:          '',
    category:       '',
    updateDateBegin:'',
    updateDateEnd:  '',
    updatedBy:      ''
  }

  public filterValues = new BehaviorSubject<filterValues>(this.filterValuesToStringify);


  getUserTickets(userId:number, category:string): Ticket_DTO[]{

    return TICKETS;
  }
  setFilterValues(){
    this.filterValues.next(this.filterValuesToStringify);
  }



  
}

const TICKETS: Ticket_DTO[] =[{
  serialNumber: 'T1',
  requestor: 0,
  assignee: 0,
  startDate: new Date(),
  updateDate: new Date(),
  updatedBy: 'Paweł',
  category: 0,
  state: 0,
  impact: 0,
  priority: 0,
  shortDesc: 'desc',
  longDesc: 'deeeeeeeesc',
  notes: 'notes'
},
{
  serialNumber: 'T2',
  requestor: 0,
  assignee: 0,
  startDate: new Date(),
  updateDate: new Date(),
  updatedBy: 'Paweł',
  category: 0,
  state: 0,
  impact: 0,
  priority: 0,
  shortDesc: 'desc',
  longDesc: 'deeeeeeeesc',
  notes: 'notes'
},
{
  serialNumber: 'T3',
  requestor: 0,
  assignee: 0,
  startDate: new Date(),
  updateDate: new Date(),
  updatedBy: 'Paweł',
  category: 0,
  state: 0,
  impact: 0,
  priority: 0,
  shortDesc: 'desc',
  longDesc: 'deeeeeeeesc',
  notes: 'notes'
},
{
  serialNumber: 'T4',
  requestor: 0,
  assignee: 0,
  startDate: new Date(),
  updateDate: new Date(),
  updatedBy: 'Paweł',
  category: 0,
  state: 0,
  impact: 0,
  priority: 0,
  shortDesc: 'desc',
  longDesc: 'deeeeeeeesc',
  notes: 'notes'
},
{
  serialNumber: 'T5',
  requestor: 0,
  assignee: 0,
  startDate: new Date(),
  updateDate: new Date(),
  updatedBy: 'Paweł',
  category: 0,
  state: 0,
  impact: 0,
  priority: 0,
  shortDesc: 'desc',
  longDesc: 'deeeeeeeesc',
  notes: 'notes'
},
]
