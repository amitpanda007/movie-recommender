import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class MovieService{

  cache: any = {}
  constructor(private http: HttpClient) {}

  getMovies(from: number, to: number) {
    const MOVIES_URL = environment.apiUrl + `movies/all?from=${from}&to=${to}`;
    return this.http.get(MOVIES_URL);
  }

  getMoviesCount() {
    const MOVIES_COUNT_URL = environment.apiUrl + "movies/count";
    return this.http.get(MOVIES_COUNT_URL);
  }

  getMoviesWithCache(from: number, to: number): Observable<any> {
    const MOVIES_URL = environment.apiUrl + `movies/all?from=${from}&to=${to}`;
    if (this.cache[MOVIES_URL]) {
      console.log('Returning cached value!')
      return of(this.cache[MOVIES_URL])
    }
    console.log('Do the request again')
    this.http.get(MOVIES_URL).pipe(
      tap(resolvedValue => {
        console.log(resolvedValue);
        this.cache[MOVIES_URL] = resolvedValue;
      }));
  }

}
