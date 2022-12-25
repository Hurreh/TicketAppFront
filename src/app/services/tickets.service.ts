import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Categories_DTO, Experts_DTO, Priority_DTO, States_DTO, TicketType_DTO } from '../models/dictionaries';
import { filterValues } from '../models/filter';
import { Ticket, Ticket_DTO } from '../models/ticket';
import { User_DTO } from '../models/user';
import { DictionariesService } from './data-services/dictionaries.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private fb: FormBuilder,
              private dictService: DictionariesService) 
              {}
              
  public categories: Categories_DTO[] = [];
  public ticketTypes: TicketType_DTO[] = [];
  public states: States_DTO[] = [];
  public priorities: Priority_DTO[] = [];
  public experts: Experts_DTO[] = [];
  public users: User_DTO[] = [];
  
  async loadDictionaries() {
    await this.dictService.getCategories().then(x=>{
      this.categories = x.result;
    })
    await this.dictService.getTicketTypes().then(x=>{
      this.ticketTypes = x.result;
    })
    await this.dictService.getStates().then(x=>{
      this.states = x.result;
    })
    await this.dictService.getPriorities().then(x=>{
      this.priorities = x.result;
    })
    await this.dictService.getUsers().then(x=>{
      this.users = x.result;
    })
    
  }

  //Tutaj definiujemy wartości przekazywane do filtra. W ten sposób gdyby było konieczne jego ponowne wykorzystanie,
  //dodamy nowe pole w serwisie zamiast w każdym miejscu gdzie wystąpi filtr
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

  //Obiekt do którego subskrybujemy i gdzie zostają przekazane wartości po których filtrujemy
  public filterValues = new BehaviorSubject<filterValues>(this.filterValuesToStringify);


  
  setFilterValues(){
    this.filterValues.next(this.filterValuesToStringify);
  }

  //Inicjalizacja formGroupa z wartościami wpisywanymi do ticketa. Przy wielokrotnym wykorzystaniu poprawiamy tutaj zamiast przy każdym wystąpieniu
  initTicketFormGroup():FormGroup{
    const ticket = this.fb.group({
      serialNumber: [''],
      requestor: [''],
      assignee: [''],
      ticketType: ['', [Validators.required]],
      startDate: [''],
      updateDate: [''],
      updatedBy: [''],
      category: ['', [Validators.required]],
      state: [''],
      impact: [''],
      priority: [''],
      shortDesc: ['', [Validators.required]],
      longDesc: [''],
      notes: [''],
    })
    return ticket;
  }

  //Zamiana danych z backendu, które zawierają dane w postaci numerów id. (np zamiast Paweł Lubowiecki -> nr 1 w liście userów)
  //na dane które można wyświetlić
  async convertDataToDisplay(tickets: Ticket_DTO[]) : Promise<Ticket[]>{
    await this.loadDictionaries();
    const ticketsToDisplay: Ticket[] = [];
    for (let index = 0; index < tickets.length; index++) {
      const element = tickets[index];
      var ticketActual: Ticket = {} as Ticket;
      ticketActual = Object.assign(ticketActual, element)     
      //Wyszukiwanie w poszczególnych listach wartości odpowiadających danemu ID
      ticketActual.category = this.categories.find(x=>x.id == element.category)?.categoryName ?? "";
      ticketActual.priority = this.priorities.find(x=>x.severity == element.priority)?.priorityName ?? "";
      ticketActual.state = this.states.find(x=>x.id == element.state)?.stateName ?? "";
      ticketActual.requestor = this.users.find(x=>x.id == element.requestor)?.fullName ?? "";
      ticketActual.assignee = this.users.find(x=>x.id == element.assignee)?.fullName ?? "";
      ticketActual.updatedBy = this.users.find(x=>x.id == element.updatedBy)?.fullName ?? "";
      

      ticketsToDisplay.push(ticketActual);
    }

    return ticketsToDisplay
  }

  
}


