import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackbar, SuccessSnackbar } from 'src/app/common/snackbar.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { MovieRecommendService } from 'src/app/core/services/movie.recommend.service';

@Component({
  selector: 'single-movie-recommend',
  templateUrl: './single-movie.recommend.component.html',
  styleUrls: ['./movies.recommend.component.scss']
})
export class SingleMovieRecommendComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  private currentMovie: string;
  private movieRecommendList: any;
  private loadingComplete: boolean = false;
  private userRecommendationReady: boolean = false;

  constructor(private auth: AuthService, private movieRecommendService: MovieRecommendService,
    private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    console.log("HELLO FROM AFTER INIT");
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.loadingComplete = false;
      this.movieRecommendList = undefined;
      this.currentMovie = params['movieName'];

      this.auth.subscribe(
        (authenticated) => {
          this.authenticated = authenticated;
        });

      if (this.authenticated) {

        const postdata = {
          "type": "movie",
          "movie": `${this.currentMovie}`
        };
        this.movieRecommendService.getSvdRecommend(postdata).subscribe((_response: any) => {
          this.loadingComplete = true;
          console.log(_response);
          if (_response.message) {
            this._snackBar.openFromComponent(SuccessSnackbar, {
              data: _response.message,
              duration: 2000
            });
          }
          if (_response.recommend) {
            this.userRecommendationReady = true;
            this.movieRecommendList = _response.recommend;
          }
        }, error => {
          console.log(error);
          console.log("Some Error Happened");
          this.loadingComplete = true;
          this._snackBar.openFromComponent(ErrorSnackbar, {
            data: error.message,
            duration: 2000
          });
        });
      } else {
        console.log("User is Not Authenticated");
      }
    });
  }
}