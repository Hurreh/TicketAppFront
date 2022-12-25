import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { authModel } from '../models/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public logService: LoginService,
              public router: Router,
              private authService:  LoginService,
              private snackBar: MatSnackBar) { }

  //form group oznacza zbiór pól, do których zostaje przypisana wartość w widoku. 
  //W tym celu możnaby wykorzystać zwykłe zmienne ale użycie Form Group i Form Control pozwala na używanie
  //validatorów i wielu inych funkcjonalności
  public loginFormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  logIn(){
    
    const loginInfo:authModel= {login: this.loginFormGroup.controls['login'].value!, // pobranie wartości z pola login wewnątrz formGroup loginFormGroup
                                password: this.loginFormGroup.controls['password'].value!}
    //Autentykacja użytkownika
    //metoda then uruchamia się w przypadku poprawnej zwrotki z API (brak błędu)
    //Umieszczamy w niej kod który chcemy uruchomić w przypadku braku błędu 
    this.authService.authUser(loginInfo).then(x=>{
      if(x.result){
        
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('role', (x.result as any).userRole)
        localStorage.setItem('name', (x.result as any).fullName)
        localStorage.setItem('userId', (x.result as any).id)
        this.logService.userLoggedIn = true;
        this.openSnackBar('User logged in successfuly', 2000)
        this.router.navigate(['/tickets-list'])
       
      }
    })
    //metoda catch uruchamia się gdy API zwróci błąd. Albo np. w ogóle nie nastąpi połączenie z API
    .catch(error=>{
      this.openSnackBar('Login failed. Try again.', 2000)
    })                
    
    
  }

  //metoda otwierająca snackbar na stronie. (panel dolny wysuwający się po akcji)
  openSnackBar(message: string, durationInMs: number) {
    this.snackBar.open(message, '', {duration:durationInMs});
  }

}
