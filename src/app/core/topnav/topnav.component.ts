import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {

  //Komponent generujący panel górny
  constructor(public logService: LoginService,
              public router: Router) { }

  loggedUser: string = '';

  //Metoda wylogowująca użytkownika. Czyści local-storage zawierający informacje o użytkowniku.
  logOut(){
    localStorage.clear();
    
    //Zmiana wartości zmiennej isLoggedIn wewnątrz serwisu LoginService
    this.logService.isLoggedIn.next(false)
    //Przekierowanie do ekranu logowania po wylogowaniu
    this.router.navigate(['/login']);
  }
}
