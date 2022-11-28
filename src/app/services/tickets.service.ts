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

  setFilterValues(){
    this.filterValues.next(this.filterValuesToStringify);
  }



  
}


