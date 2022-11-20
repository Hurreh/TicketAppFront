import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';

import {MatTableModule} from '@angular/material/table';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations:
  [
    TicketListComponent,
    ListFilterComponent
  ],
  providers:[
    MatDatepickerModule
  ],
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild([
      {path:'', component:TicketListComponent}
    ])
  ]
})
export class TicketModule { }
