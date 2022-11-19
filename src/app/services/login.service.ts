import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;


  constructor() { }

  userLoggedIn(){
    this.isLoggedIn = true;
    console.log('loggedIn');
    return of(this.isLoggedIn);
  }
  userLoggedOut(){
    this.isLoggedIn = false;
    console.log('loggedOut');
    return of(this.isLoggedIn);
  }
}
