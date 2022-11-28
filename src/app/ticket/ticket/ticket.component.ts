import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories_DTO, Experts_DTO, Priority_DTO, States_DTO } from 'src/app/models/dictionaries';
import { DictionariesService } from 'src/app/services/data-services/dictionaries.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dictionariesService: DictionariesService) { }

  public currentRoute: string | null = '';
  public categories: Categories_DTO[] = [];
  public states: States_DTO[] = [];
  public priorities: Priority_DTO[] = [];
  public experts: Experts_DTO[] = [];

  async ngOnInit() {
    this.getCurrentRoute();
    await this.loadData();
  }
  async loadData() {
    await this.dictionariesService.getCategories().then(x=>{
      this.categories = x.result;
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

  }
  getCurrentRoute() {
    this.route.paramMap.subscribe(params =>{this.currentRoute = params.get('ticket')})
    
  }

}
