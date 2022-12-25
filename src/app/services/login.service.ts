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
//serwis zawierający metody i pola pozwalące na obsługę procesu logowania
export class LoginService {

 

  constructor(private http:HttpClient) { }

 //Obiekt, którego zmianę stanu możemy stale obserwować poprzez metodę subscribe
  public isLoggedIn = new BehaviorSubject<boolean>(this.userLoggedIn);

  private authAddress: string = environment.authAddress;

  //Metoda set, którą wywołujemy gdy chcemy zmienić wartość jakiegoś pola
  set userLoggedIn(logData:any){
    //metoda next służy do zmiany wartości obiektu BehaviorSubject. Po uruchomieniu next, 
    //wszystkie obiekty subskrybujące dany BehaviorSubject się uruchomią.
    this.isLoggedIn.next(logData)
   
  }
  //metoda get do pobierania wartości danego pola
  get userLoggedIn(){
    return localStorage.getItem('isLoggedIn')
  }

  //metoda wysyłająca zapytanie do API. Zwraca ona tzw. Promise.
  //Promise wymusza na użytkowniku zdefiniowanie jakiego typu obiekt zostanie pobrany.
  async authUser(auth: authModel): Promise<ApiResult<User_DTO>>{
    //adres do danego endpointu w API
    const url = this.authAddress + `authUser`;
    //metoda budująca zapytanie typu POST. Takie zapytanie zawiera adres, ciało zapytania (co przesyłamy do backendu) i opcje.
    const answer = await lastValueFrom(this.http
      .post(url, auth, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      //pipe oznacza że zostanie wykonany ciąg akcji
      //map to metoda która postara się dopasować jak najlepiej dane do przypisanego obiektu.
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
}
