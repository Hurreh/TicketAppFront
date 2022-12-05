import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { authModel } from '../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public logService: LoginService,
              public router: Router,
              private authService:  LoginService) { }

  public loginFormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  ngOnInit(): void {
  }

  logIn(){
    //Dokończyć
    const loginInfo:authModel= {login: this.loginFormGroup.controls['login'].value!,
                                password: this.loginFormGroup.controls['password'].value!}
    this.authService.authUser(loginInfo).then(x=>{
      if(x.result){
        console.log(x.result)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('role', (x.result as any).userRole)
        localStorage.setItem('name', (x.result as any).fullName)
        localStorage.setItem('userId', (x.result as any).id)
        this.logService.userLoggedIn = true;
        this.router.navigate(['/tickets-list'])
       
      }
    })
    .catch(error=>{
      console.log(error)
    })                
    
    
  }

}
