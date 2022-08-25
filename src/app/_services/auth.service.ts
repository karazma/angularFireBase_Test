import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  canAccess() {
    if (!this.isAuthenticated()) {
      //reidrect to login
      this.router.navigate(['/login']);
    }
  }

  canAuthenticate() {
    if (this.isAuthenticated()) {
      //reidrect to Dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(name: string, email: string, password: string) {
    //send the data to register api (firebase)
    return this.http.post<{ idToken: string }>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOt2qnfUHdg6VDHg55aYTsb9XlfR9CQAs",
      { displayName: name, email: email, password: password });
  }

  login(email: string, password: string) {
    //send data to login URL action on Firebase
    return this.http.post<{ idToken: string }>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOt2qnfUHdg6VDHg55aYTsb9XlfR9CQAs",
      { email: email, password: password });
  }

  details(){
    let tokenID = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string, displayName:string}>}>("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDOt2qnfUHdg6VDHg55aYTsb9XlfR9CQAs", {idToken:tokenID})
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }

}
