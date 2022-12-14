import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';

import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';

//Moduł core zawiera komponenty które są wyświetlane cały czas w trakcie życia aplikacji
//W naszym przypadku jest to sidenav i topnav


@NgModule({
  declarations: [
    SidenavComponent,
    TopnavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule
    
  ],
  exports:[
    SidenavComponent,
    TopnavComponent
  ]
})
export class CoreModule { }
