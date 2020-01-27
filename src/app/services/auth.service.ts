import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

  BASE_URL = "http://localhost:5000";
  TOKEN_KEY = "token";
  FULLNAME_KEY = "fullname"

  constructor(private http: HttpClient, private router: Router) {}

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get name() {
    return localStorage.getItem(this.FULLNAME_KEY);
  }

  get tokenHeader() {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem(this.TOKEN_KEY))
    }
    return options;
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + "/register", user).subscribe();
  }

  login(user) {
    this.http.post(this.BASE_URL + "/login", user).subscribe((data:any) => {
      if(!data.access_token)
        return;
      localStorage.setItem(this.TOKEN_KEY, data.access_token);
      localStorage.setItem(this.FULLNAME_KEY, data.full_name);
      this.router.navigate(['/']);
    }, (error:any) => {
      console.log(error);
    });
  }

  //TODO : Post logout to server api
  logout() {
    // this.http.post(this.BASE_URL + "/logout", this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.FULLNAME_KEY);
  }

}
