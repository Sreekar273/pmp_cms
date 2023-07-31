import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(): Promise<any>{
    return new Promise((resolve)=>{
      localStorage.setItem('loggedIn', 'true');
      resolve(true);
    });
  }

  isLoggedIn(){
    return !!localStorage.getItem('loggedIn');  // if value exits this returns true (else false)
    // return localStorage.getItem('logedIn');
  }

  constructor() { }
}
