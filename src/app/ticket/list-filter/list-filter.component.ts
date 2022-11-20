import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filterValues } from 'src/app/models/filter';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {

  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {

    this.initFilters()
  }
  initFilters() {
    this.filterValuesGroup.valueChanges.subscribe(
      x=>{
        this.ticketsService.filterValuesToStringify.serialNumber = this.filterValuesGroup.controls['serialNumber'].value!;
        this.ticketsService.filterValuesToStringify.startDateBegin = this.filterValuesGroup.controls['startDateBegin'].value!;
        this.ticketsService.filterValuesToStringify.startDateEnd = this.filterValuesGroup.controls['startDateEnd'].value!;
        this.ticketsService.filterValuesToStringify.shortDesc = this.filterValuesGroup.controls['shortDesc'].value!;
        this.ticketsService.filterValuesToStringify.requestor = this.filterValuesGroup.controls['requestor'].value!;
        this.ticketsService.filterValuesToStringify.priority = this.filterValuesGroup.controls['priority'].value!;
        this.ticketsService.filterValuesToStringify.state = this.filterValuesGroup.controls['state'].value!;
        this.ticketsService.filterValuesToStringify.category = this.filterValuesGroup.controls['category'].value!;
        this.ticketsService.filterValuesToStringify.updateDateBegin = this.filterValuesGroup.controls['updateDateBegin'].value!;
        this.ticketsService.filterValuesToStringify.updateDateEnd = this.filterValuesGroup.controls['updateDateEnd'].value!;
        this.ticketsService.filterValuesToStringify.updatedBy = this.filterValuesGroup.controls['updatedBy'].value!;

        this.ticketsService.setFilterValues();
      }
    )
  }


  public filterValuesGroup = new FormGroup({
    serialNumber: new FormControl(''),
    startDateBegin: new FormControl(''),
    startDateEnd: new FormControl(''),
    shortDesc: new FormControl(''),
    requestor: new FormControl(''),
    priority: new FormControl(''),
    state: new FormControl(''),
    category: new FormControl(''),
    updateDateBegin: new FormControl(''),
    updateDateEnd: new FormControl(''),
    updatedBy: new FormControl(''),
  })

  
}
