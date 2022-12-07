import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public logInService: LoginService) 
              {}

  isLoggingIn : boolean = false;
  isExpert: boolean = false;


  ngOnInit(): void {
    this.checkIfExpert()
    this.subToLogin()
    
    
    }
  subToLogin() {
    //Property in the service. Changes based on whether user is logged in or not.
    this.logInService.isLoggedIn.subscribe(x=>{
      this.isLoggingIn = x
      this.checkIfExpert()
      console.log(this.isExpert)
    })
  }
  checkIfExpert() {
    this.isExpert = localStorage.getItem('role')! == '1' ? false : true;
  }
    
  }


