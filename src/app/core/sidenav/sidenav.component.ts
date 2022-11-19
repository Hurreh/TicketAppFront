import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public logInService: LoginService) { }

  isLoggingIn : boolean = false;

  ngOnInit(): void {
    //Should do it differently propably. Check how it's done in other projects.
    this.logInService.userLoggedIn().subscribe(x=>{
      this.isLoggingIn = x;
      console.log(this.isLoggingIn)
    })
    this.logInService.userLoggedOut().subscribe(x=>{
      this.isLoggingIn = x;
      console.log(this.isLoggingIn)
    })
  }

}
