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
    //Property in the service. Changes based on whether user is logged in or not.
    this.logInService.isLoggedIn.subscribe(x=>{
      this.isLoggingIn = x
      console.log(x);
    })
    }
  }


