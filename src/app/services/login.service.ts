import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedIn = new BehaviorSubject<boolean>(true);

  constructor() { }

  userLoggedIn(){
    this.isLoggedIn.next(true);
  }
  userLoggedOut(){
    this.isLoggedIn.next(false)
  }
}
