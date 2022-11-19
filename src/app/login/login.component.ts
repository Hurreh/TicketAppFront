import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public logService: LoginService,
              public router: Router) { }

  ngOnInit(): void {
  }

  logIn(){
    this.logService.userLoggedIn();
    this.router.navigate(['/tickets-list'])
    
  }

}
