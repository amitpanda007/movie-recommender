import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { AuthService } from './auth.service';


@Injectable()
export class MovieRecommendService{

  constructor(private http: HttpClient, private cacheService: CacheService, private auth: AuthService) {}

  getDefaultRecommend() {
    const DEFAULT_RECOMMEND_URL = environment.apiUrl + 'recommend/anonymous';
    return this.http.get(DEFAULT_RECOMMEND_URL);
  }

  getMovieRecommend() {
    const MOVIE_RECOMMEND_URL = environment.apiUrl + 'recommend/movies';
    return this.http.get(MOVIE_RECOMMEND_URL, this.auth.tokenHeader);
  }

  getSvdRecommend(data: object) {
    const SVD_RECOMMEND_URL = environment.apiUrl + 'recommend/movies/svd';
    return this.http.post(SVD_RECOMMEND_URL, data, this.auth.tokenHeader)
  }

}
