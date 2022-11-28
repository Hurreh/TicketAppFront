import { Component, OnInit } from '@angular/core';
import { Ticket_DTO } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import {MatTableDataSource} from '@angular/material/table'
import { filterValues } from 'src/app/models/filter';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  constructor(private ticketsService: TicketsService) { }

  public tickets = new MatTableDataSource<Ticket_DTO>();
  private filterValues!: filterValues;

  public columnsToDisplay = ['serialNumber', 'startDate', 'shortDesc', 'requestor', 'priority', 'state', 'category', 'updateDate', 'updatedBy']

  ngOnInit(): void {

    this.loadData();
    this.initFilter();
    
  }
  initFilter() {
    this.ticketsService.filterValues.subscribe(x=>{
      const filterValues = x;
      this.tickets.filter = JSON.stringify(filterValues);
      this.tickets.filterPredicate = this.createFilter()
    })
  }
  createFilter(): (data: Ticket_DTO, filter: string) => boolean {
    let filterFunction = (data: Ticket_DTO, filter: string): boolean => {
      let filterValues = JSON.parse(filter)
      return data.serialNumber.toLowerCase().indexOf(filterValues.serialNumber.toLowerCase()) !== -1 || filterValues.serialNumber == ''
    }
    return filterFunction;
  }
  async loadData() {
    
  }









  
}
