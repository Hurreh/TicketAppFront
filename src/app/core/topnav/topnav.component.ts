import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  constructor(public logService: LoginService,
              public router: Router) { }

  loggedUser: string = '';
  ngOnInit(): void {
    
  }



  logOut(){
    localStorage.clear();
   
    this.logService.isLoggedIn.next(false)
    this.router.navigate(['/login']);
  }
}
