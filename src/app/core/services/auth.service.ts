import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar, ErrorSnackbar } from '../../common/snackbar.component';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local.storage.service';

@Injectable()
export class AuthService{

  BASE_URL = environment.apiUrl;
  TOKEN_KEY = "accessToken";
  FULLNAME_KEY = "fullName"

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, private localStorageService: LocalStorageService) {}

  get isAuthenticated() {
    return !!this.localStorageService.get(this.TOKEN_KEY);
  }

  get name() {
    return this.localStorageService.get(this.FULLNAME_KEY);
  }

  get tokenHeader() {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.localStorageService.get(this.TOKEN_KEY))
    }
    return options;
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + "auth/register", user).subscribe((data:any) => {
      console.log(data);
      if (data.message) {
        this.router.navigate(['/login']);
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
    this.http.post(this.BASE_URL + "auth/login", user).subscribe((data:any) => {
      if(!data.accessToken)
        return;
      this.localStorageService.set(this.TOKEN_KEY, data.accessToken);
      this.localStorageService.set(this.FULLNAME_KEY, data.fullName);

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

  //TODO: Post logout to server api
  logout() {
    this.http.get(this.BASE_URL + "/logout");
    this.localStorageService.remove(this.TOKEN_KEY);
    this.localStorageService.remove(this.FULLNAME_KEY);
    this.router.navigate(['/']);
    window.location.reload();
  }

}
