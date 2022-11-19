import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';



@NgModule({
  declarations:
  [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', component:TicketListComponent}
    ])
  ]
})
export class TicketModule { }
