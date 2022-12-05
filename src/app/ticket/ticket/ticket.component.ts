import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categories_DTO, Experts_DTO, Priority_DTO, States_DTO, TicketType_DTO } from 'src/app/models/dictionaries';
import { Ticket_DTO } from 'src/app/models/ticket';
import { User_DTO } from 'src/app/models/user';
import { DictionariesService } from 'src/app/services/data-services/dictionaries.service';
import { TicketsDataService } from 'src/app/services/data-services/tickets-data.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dictionariesService: DictionariesService,
              private ticketsService: TicketsService,
              private ticketsDataService: TicketsDataService) { }
              

  public currentRoute: string | null = '';
  public ticketControlForm!: FormGroup;
  private ticket: Ticket_DTO = {} as Ticket_DTO;
  
  public categories: Categories_DTO[] = [];
  public ticketTypes: TicketType_DTO[] = [];
  public states: States_DTO[] = [];
  public priorities: Priority_DTO[] = [];
  public experts: Experts_DTO[] = [];
  public users: User_DTO[] = [];

  public canEdit: boolean = false;

  async ngOnInit() {
    this.initFormGroup();
    this.getCurrentRoute();
    
    await this.loadData();
  }
  initFormGroup() {
    this.ticketControlForm = this.ticketsService.initTicketFormGroup();
  }
  async loadData() {
    
    await this.dictionariesService.getCategories().then(x=>{
      this.categories = x.result;
    })
    await this.dictionariesService.getTicketTypes().then(x=>{
      this.ticketTypes = x.result;
    })
    await this.dictionariesService.getStates().then(x=>{
      this.states = x.result;
    })
    await this.dictionariesService.getPriorities().then(x=>{
      this.priorities = x.result;
    })
    await this.dictionariesService.getExperts().then(x=>{
      this.experts = x.result;
    })
    await this.dictionariesService.getUsers().then(x=>{
      this.users = x.result;
    })
    
    
    if(this.currentRoute != 'new-ticket'){
      await this.ticketsDataService
      .getTicket(this.currentRoute!)
      .then(x=>{
        console.log(x.result)
        this.ticketControlForm.patchValue(x.result)
        this.ticketControlForm.controls['requestor'].setValue(this.users.find(y=>y.id == x.result.requestor)?.fullName ?? "")
        console.log(this.ticketControlForm)
      })    
    }
    
  }

  getCurrentRoute() {
    this.route.paramMap.subscribe(params =>{
      this.currentRoute = params.get('ticket')
      const userRole = localStorage.getItem('role')
      const userId = localStorage.getItem('userId')
      this.ticketControlForm.reset();
      if(this.currentRoute == 'new-ticket')
        this.ticketControlForm.controls['requestor'].setValue(localStorage.getItem('name'))

        if(userRole == '1')
          this.canEdit = false;
        if((userRole == '2' && this.ticket.assignee == +userId!) || (userRole == '2' && this.ticket.assignee == null))
          this.canEdit = true;

        console.log(this.canEdit);
    })
    
    
  }
  saveTicket(){
    if(this.ticketControlForm.valid){
      this.ticketControlForm.controls['startDate'].setValue(new Date())    
      this.ticket = Object.assign(this.ticket, this.ticketControlForm.value)     
      this.ticket.requestor = +localStorage.getItem('userId')!
      this.ticketsDataService.saveTicket(this.ticket);
    }
  }

}
