import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';



@NgModule({
  declarations: [
    SidenavComponent,
    TopnavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidenavComponent,
    TopnavComponent
  ]
})
export class CoreModule { }
