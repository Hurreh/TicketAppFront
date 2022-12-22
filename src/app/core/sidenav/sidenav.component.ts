import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  //Selector wskazuje co należy wpisać w widok, żeby wyświetlić w nim ten komponent. Patrz app.component.html
  selector: 'app-sidenav',
  //Wskazaznie na plik zawierający template (widok)
  templateUrl: './sidenav.component.html',
  //Wskazanie na plik zawierający style
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  //Komponent renderujący panel boczny.

  //Konstruktor to specjalna metoda wywoływana gdy następuje jej stworzenie (np. załadowanie przy tworzeniu strony)
  //Do konstruktora "wstrzykujemy" (dependency injection) np. serwisy, które zawierają dane funkcjonalności.
  //W tym przypadku wstrzykujemy serwis zawierający metodę służącą do zalogowania użytkownika 
  constructor(public logInService: LoginService) 
              {}

  //zmienne służące do określenia jakie elementy mają się wyświetlać 
  isLoggingIn : boolean = false;
  isExpert: boolean = false;

  //metoda OnInit wywołuje się gdy zostaje wyświetlony dany komponent np. przy przejściu użytkownika do danej strony.
  ngOnInit(): void {
    this.checkIfExpert()
    this.subToLogin()
    
    
    }
  subToLogin() {
    //subskrybujemy observable wewnątrz serwisu. Oznacza to że zostaje wywołany kod wewnątrz {} w przypadku 
    //gdy nastąpi zmiana wartości tej zmiennej
    this.logInService.isLoggedIn.subscribe(x=>{
      this.isLoggingIn = x
      this.checkIfExpert()
      
    })
  }
  checkIfExpert() {
    //pobieramy z local storage (sprawdź) item zawierający rolę użytkownika, żeby na tej podstawie wyświetlić albo schować
    //panel ekspercki
    this.isExpert = localStorage.getItem('role')! == '1' ? false : true;
  }
    
  }


