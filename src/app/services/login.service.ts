import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, BehaviorSubject, lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult } from '../models/apiResult';
import { authModel } from '../models/auth';
import { User_DTO } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedIn = new BehaviorSubject<boolean>(this.userLoggedIn);
  

  constructor(private http:HttpClient) { }

  private authAddress: string = environment.authAddress;

  set userLoggedIn(logData:any){
    this.isLoggedIn.next(logData)
   
  }
  get userLoggedIn(){
    return localStorage.getItem('isLoggedIn')
  }


  
  userLoggedOut(){
    localStorage.clear()
    localStorage.setItem('isLoggedIn', 'false')
    this.userLoggedIn = false;
  }

  async authUser(auth: authModel): Promise<ApiResult<User_DTO>>{
    const url = this.authAddress + `authUser`;
    const answer = await lastValueFrom(this.http
      .post(url, auth, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
}
