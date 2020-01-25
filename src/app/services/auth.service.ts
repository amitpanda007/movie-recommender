import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService{

  BASE_URL = "http://localhost:5000";

  constructor(private http: HttpClient) {}

  register(user) {
    this.http.post(this.BASE_URL, user).subscribe();
  }

  login(user) {

  }

}
