import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Ticket, Ticket_DTO } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import {MatTableDataSource} from '@angular/material/table'
import { ActivatedRoute } from '@angular/router';
import { TicketsDataService } from 'src/app/services/data-services/tickets-data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit {

  constructor(private ticketsService: TicketsService,
              private ticketsDataService: TicketsDataService,
              private route: ActivatedRoute) { }
 

  public tickets = new MatTableDataSource<Ticket>();
  public listLoading: boolean = true;
  private currentRoute: string | null = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  public columnsToDisplay = ['serialNumber','assignee', 'startDate', 'shortDesc', 'requestor', 'priority', 'state', 'category', 'updateDate', 'updatedBy']

  ngOnInit(): void {

    this.getCurrentRoute();
    this.initFilter(); 
  }
  ngAfterViewInit(): void {
    this.tickets.paginator = this.paginator;
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
          && 
          ((new Date(data.startDate).toLocaleString('en-CA', {timeZone:"Europe/Berlin"}) >= new Date(filterValues.startDateBegin).toLocaleString('en-CA', {timeZone:"Europe/Berlin"})
          && new Date(data.startDate).toLocaleString('en-CA', {timeZone:"Europe/Berlin"}) <= new Date(filterValues.startDateEnd).toLocaleString('en-CA', {timeZone:"Europe/Berlin"})) 
          || (filterValues.startDateBegin == '' || filterValues.startDateEnd == ''))
          && 
          ((new Date(data.updateDate).toLocaleString('en-CA', {timeZone:"Europe/Berlin"}) >= new Date(filterValues.updateDateBegin).toLocaleString('en-CA', {timeZone:"Europe/Berlin"})
          && new Date(data.updateDate).toLocaleString('en-CA', {timeZone:"Europe/Berlin"}) <= new Date(filterValues.updateDateEnd).toLocaleString('en-CA', {timeZone:"Europe/Berlin"})) 
          || (filterValues.updateDateBegin == '' || filterValues.updateDateEnd == ''))
         
    }
    return filterFunction;
  }
  async loadData() {
    this.listLoading = true;
    this.listLoading = false;
      const userId = localStorage.getItem('userId')
      switch (this.currentRoute) {
        case 'all-tickets':
          this.ticketsDataService.getAllTickets()
          .then(x=>{
            this.convertDataToDisplay(x.result);    
            this.listLoading = false;   
          })
          break;
        case 'requests':
          this.ticketsDataService.getAllUserTicketsOfType(+userId!, 1)
          .then(x=>{
            this.convertDataToDisplay(x.result); 
            this.listLoading = false;      
          })
          break;
        case 'incidents':
          this.ticketsDataService.getAllUserTicketsOfType(+userId!, 2)
          .then(x=>{
            this.convertDataToDisplay(x.result);   
            this.listLoading = false;    
          })
          break;
        case 'bug-reports':
          this.ticketsDataService.getAllUserTicketsOfType(+userId!, 3)
          .then(x=>{
            this.convertDataToDisplay(x.result);   
            this.listLoading = false;    
          })
          break;
          case 'assigned-tickets':
          this.ticketsDataService.getAllExpertTickets(+userId!)
          .then(x=>{
            this.convertDataToDisplay(x.result);     
            this.listLoading = false;  
          })
          break;
          case 'unassigned-tickets':
          this.ticketsDataService.getAllUnassignedTickets()
          .then(x=>{
            this.convertDataToDisplay(x.result); 
            this.listLoading = false;      
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
