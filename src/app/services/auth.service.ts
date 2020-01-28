import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar, ErrorSnackbar } from '../common/snackbar.component';

@Injectable()
export class AuthService{

  BASE_URL = "http://localhost:5000";
  TOKEN_KEY = "token";
  FULLNAME_KEY = "fullname"

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {}

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
    this.http.post(this.BASE_URL + "/register", user).subscribe((data:any) => {
      console.log(data);
      if (data.message) {
        this._snackBar.openFromComponent(SuccessSnackbar, {
          data: data.message,
          duration: 2000
        });
      }
    }, (err:any) => {
      if (err.status == 409)
        this._snackBar.open(err.error.message, "Close", {duration: 2000});
      else
        this._snackBar.openFromComponent(ErrorSnackbar, {
          data: "Something went wrong.",
          duration: 2000
        });
    });
  }

  login(user) {
    this.http.post(this.BASE_URL + "/login", user).subscribe((data:any) => {
      if(!data.access_token)
        return;
      localStorage.setItem(this.TOKEN_KEY, data.access_token);
      localStorage.setItem(this.FULLNAME_KEY, data.full_name);
      this.router.navigate(['/']);
      this._snackBar.openFromComponent(SuccessSnackbar, {
        data: data.message,
        duration: 2000
      });
    }, (err:any) => {
      if (err.status == 401)
        this._snackBar.open(err.error.message, "Close", {duration: 2000});
      else
        this._snackBar.openFromComponent(ErrorSnackbar, {
          data: "Something went wrong.",
          duration: 2000
        });
      console.log(err);
    });
  }

  //TODO : Post logout to server api
  logout() {
    // this.http.post(this.BASE_URL + "/logout", this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.FULLNAME_KEY);
  }

}
