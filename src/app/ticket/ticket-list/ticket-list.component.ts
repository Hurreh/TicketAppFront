import { Component, OnInit } from '@angular/core';
import { Ticket, Ticket_DTO } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import {MatTableDataSource} from '@angular/material/table'
import { filterValues } from 'src/app/models/filter';
import { ActivatedRoute } from '@angular/router';
import { TicketsDataService } from 'src/app/services/data-services/tickets-data.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  constructor(private ticketsService: TicketsService,
              private ticketsDataService: TicketsDataService,
              private route: ActivatedRoute) { }

  public tickets = new MatTableDataSource<Ticket>();
  private filterValues!: filterValues;
  private currentRoute: string | null = '';

  public columnsToDisplay = ['serialNumber','assignee', 'startDate', 'shortDesc', 'requestor', 'priority', 'state', 'category', 'updateDate', 'updatedBy']

  ngOnInit(): void {

    this.getCurrentRoute();
    this.initFilter();
    
  }
  initFilter() {
    this.ticketsService.filterValues.subscribe(x=>{
      const filterValues = x;
      this.tickets.filter = JSON.stringify(filterValues);
      this.tickets.filterPredicate = this.createFilter()
    })
  }
  createFilter(): (data: Ticket, filter: string) => boolean {
    let filterFunction = (data: Ticket, filter: string): boolean => {
      let filterValues = JSON.parse(filter)
      return (data.serialNumber.toLowerCase().indexOf(filterValues.serialNumber.toLowerCase()) !== -1 || filterValues.serialNumber == '')
          && (data.shortDesc.toLowerCase().indexOf(filterValues.shortDesc.toLowerCase()) !== -1 || filterValues.shortDesc == '')
          && (data.requestor.toLowerCase().indexOf(filterValues.requestor.toLowerCase()) !== -1 || filterValues.requestor == '')
          && (data.priority.toLowerCase() == filterValues.priority.toLowerCase() || filterValues.priority == '')
          && (data.state.toLowerCase() == filterValues.state.toLowerCase() || filterValues.state == '')
          && (data.category.toLowerCase() == filterValues.category.toLowerCase() || filterValues.category == '')
          && (data.updatedBy.toLowerCase().indexOf(filterValues.updatedBy.toLowerCase()) !== -1 || filterValues.updatedBy == '')
          //&& ((data.updateDate >=  filterValues.updateDateBegin) && (data.updateDate <=  filterValues.updateDateEnd) || (filterValues.updateDateBegin && filterValues.updateDateEnd))
         
    }
    return filterFunction;
  }
  async loadData() {
      const userId = localStorage.getItem('userId')
      switch (this.currentRoute) {
        case 'all-tickets':
          this.ticketsDataService.getAllTickets()
          .then(x=>{
            this.convertDataToDisplay(x.result);       
          })
          break;
        case 'requests':
          this.ticketsDataService.getAllUserTicketsOfType(+userId!, 1)
          .then(x=>{
            this.convertDataToDisplay(x.result);       
          })
          break;
        case 'incidents':
          this.ticketsDataService.getAllUserTicketsOfType(+userId!, 2)
          .then(x=>{
            this.convertDataToDisplay(x.result);       
          })
          break;
        case 'bug-reports':
          this.ticketsDataService.getAllUserTicketsOfType(+userId!, 3)
          .then(x=>{
            this.convertDataToDisplay(x.result);       
          })
          break;
          case 'assigned-tickets':
          this.ticketsDataService.getAllExpertTickets(+userId!)
          .then(x=>{
            this.convertDataToDisplay(x.result);       
          })
          break;
          case 'unassigned-tickets':
          this.ticketsDataService.getAllUnassignedTickets()
          .then(x=>{
            this.convertDataToDisplay(x.result);       
          })
          break;
        default:
          break;
      }
  }

  getCurrentRoute() {
    this.route.paramMap.subscribe(params =>{
      this.currentRoute = params.get('type')
      this.tickets.data = []
      this.loadData()
    })
  }

  convertDataToDisplay(tickets: Ticket_DTO[]){
    
    this.ticketsService.convertDataToDisplay(tickets)
      .then(dataToDisplay => {
        console.log(dataToDisplay)
        this.tickets.data = [...dataToDisplay]
      });
  }









  
}
