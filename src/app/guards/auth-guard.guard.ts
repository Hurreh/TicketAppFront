import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router) {
    
  }
  //Auth guard to specjalna klasa zawierająca metody uruchomiane w przypadku przekierowań na które taki Guard został nałożony.
  //Ten guard sprawdza czy użytkownik jest zalogowany i jeżeli tak nie jest to przenosi go do ekranu logowania.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn();
  }
  checkLoggedIn(): boolean {
    if(localStorage.getItem('isLoggedIn'))
      return true;
    this.router.navigate(['/login'])
    return false;
  }
  
}
