import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { AuthService } from './auth.service';


@Injectable()
export class UserService{

  constructor(private http: HttpClient, private cacheService: CacheService, private auth: AuthService) {}

  getUserInfo() {
    const USER_INFO_URL = environment.apiUrl + 'user/info';
    return this.http.get(USER_INFO_URL, this.auth.tokenHeader);
  }

  updateUserGenre(genres) {
    const USER_UPDATE_URL = environment.apiUrl + 'user/update/genre';
    return this.http.post(USER_UPDATE_URL, genres, this.auth.tokenHeader);
  }

  updateUserPreference() {
    const USER_UPDATE_URL = environment.apiUrl + 'user/update/initial-setup';
    return this.http.get(USER_UPDATE_URL, this.auth.tokenHeader);
  }
}
