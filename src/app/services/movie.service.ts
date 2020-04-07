import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';


@Injectable()
export class MovieService{

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getMovies(from: number, to: number) {
    const MOVIES_URL = environment.apiUrl + `movies/all?from=${from}&to=${to}`;
    return this.http.get(MOVIES_URL);
  }

  getMoviesCount() {
    const MOVIES_COUNT_URL = environment.apiUrl + "movies/count";
    return this.http.get(MOVIES_COUNT_URL);
  }

  public getMoviesWithCache(from: number, to: number): Observable<any> {
    const MOVIES_URL = environment.apiUrl + `movies/all?from=${from}&to=${to}`;
    const moviesFromCache = this.cacheService.getCache(MOVIES_URL);
    if (moviesFromCache) {
      console.log("Resurning data from cache");
      return of(moviesFromCache);
    }

    console.log('Do the request again')
    const response = this.http.get<any>(MOVIES_URL);
    response.subscribe(movies => this.cacheService.setCache(MOVIES_URL, movies));
    return response;
  }
}
