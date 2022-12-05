import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [RouterModule.forRoot([
    {path:'login', component:LoginComponent},
    {path:'', redirectTo:'tickets-list', pathMatch:'full'},
    {path: 'tickets-list',
     canActivate:[AuthGuardGuard],
      loadChildren : () =>
        import('./ticket/ticket.module').then(x=>x.TicketModule)
      }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
