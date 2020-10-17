import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { AuthService } from './auth.service';
import { share } from 'rxjs/operators';


@Injectable()
export class MovieService{

  constructor(private http: HttpClient, private cacheService: CacheService, private auth: AuthService) {}

  getMovies(from: number, to: number) {
    const MOVIES_URL = environment.apiUrl + `movies/all?from=${from}&to=${to}`;
    return this.http.get(MOVIES_URL);
  }

  getMovieWithId(movieId: number) {
    const MOVIE_URL = environment.apiUrl + `movie/${movieId}`;
    return this.http.get(MOVIE_URL);
  }

  getMovieWithIdCached(movieId: number) {
    const MOVIE_URL = environment.apiUrl + `movie/${movieId}`;
    const movieFromCache = this.cacheService.getCache(MOVIE_URL);
    if (movieFromCache) {
      console.log("Resurning movie data from cache");
      return of(movieFromCache);
    }

    console.log('Do the movie request again')
    const response = this.http.get<any>(MOVIE_URL).pipe(share());
    response.subscribe(movie => this.cacheService.setCache(MOVIE_URL, movie));
    return response;
  }

  getMoviesCount() {
    const MOVIES_COUNT_URL = environment.apiUrl + "movies/count";
    return this.http.get(MOVIES_COUNT_URL);
  }

  public getMoviesWithCache(from: number, to: number): Observable<any> {
    const MOVIES_URL = environment.apiUrl + `movies/all?from=${from}&to=${to}`;
    const moviesFromCache = this.cacheService.getCache(MOVIES_URL);
    if (moviesFromCache) {
      console.log("Resurning movies data from cache");
      return of(moviesFromCache);
    }

    console.log('Do the movies request again')
    const response = this.http.get<any>(MOVIES_URL);
    response.subscribe(movies => this.cacheService.setCache(MOVIES_URL, movies));
    return response;
  }

  getMovieNameFromSearchTerm(searchTerm: string) {
    const MOVIES_SEARCH_URL = environment.apiUrl + `movies/search/${searchTerm}`;
    return this.http.get(MOVIES_SEARCH_URL);
  }

  getAllGenres() {
    const MOVIE_GENRE_URL = environment.apiUrl + 'movies/genres';
    return this.http.get(MOVIE_GENRE_URL);
  }

  getRatingWithId(movieId: number) {
    const MOVIE_URL = environment.apiUrl + `rating/${movieId}`;
    return this.http.get(MOVIE_URL);
  }

  updateUserRating(movieId: number, rating: object) {
    const MOVIE_RATING_URL = environment.apiUrl + `rating/${movieId}`;
    return this.http.post(MOVIE_RATING_URL, rating);
  }

}
