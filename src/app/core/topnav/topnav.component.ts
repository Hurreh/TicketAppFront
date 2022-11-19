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

  ngOnInit(): void {
  }



  logOut(){
    this.logService.userLoggedOut();
    this.router.navigate(['/login']);
  }
}
