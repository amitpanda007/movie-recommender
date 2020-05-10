import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MovieRecommendService } from 'src/app/core/services/movie.recommend.service';
import { ErrorSnackbar, SuccessSnackbar } from 'src/app/common/snackbar.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { InitialGenreSelectionDialogComponent } from './initial.genre.selection.dialog.component';
import { MovieService } from 'src/app/core/services/movie.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-recommend',
  templateUrl: './movies.recommend.component.html',
  styleUrls: ['./movies.recommend.component.scss']
})
export class MoviesRecommendComponent implements OnInit{
  authenticated: boolean;
  private recommendList: any;
  private loadingComplete: boolean = false;
  private userRecommendationReady: boolean = false;
  private initialSetupReady: boolean = false;
  private hideRecommendGenres: boolean = false;
  private recommendGenres: any;
  private genresSelected: Array<string> = [];

  constructor(private _snackBar: MatSnackBar, private movieRecommendService : MovieRecommendService, private movieService: MovieService,
              private auth: AuthService, private userService: UserService, private dislog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.auth.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
      });

    console.log(this.authenticated);
    if (!this.authenticated) {
      this.movieRecommendService.getDefaultRecommend().subscribe((_response : any) => {
        this.loadingComplete = true;
        this.recommendList = _response.recommend;
      },error => {
        this.loadingComplete = true;
        this._snackBar.openFromComponent(ErrorSnackbar, {
          data: error.message,
          duration: 2000
        });
      });
    }

    if (this.authenticated) {
      console.log("Registered User found.");
      this.userService.getUserInfo().subscribe((_userInfo: any) => {
        // User has not completed Initial setup & not selected any genre.
        this.initialSetupReady = _userInfo.initialSetupDone;
        if(!_userInfo.initialSetupDone) {
          console.log("Needs initialize setup.");
          console.log(this.recommendGenres);
          this.movieService.getAllGenres().subscribe((_genres: any) => {
            this.loadingComplete = true;
            this.dislog.open(InitialGenreSelectionDialogComponent, {
              width: '350px',
              disableClose: true
            });
            this.recommendGenres = _genres.genres;
            this.hideRecommendGenres = true;
          });
        }else {
          console.log("Retriving Recommendation for Registered User.");
          //TODO: Get Recommendation for Logged in user who has done initial genre selection
          this.movieRecommendService.getMovieRecommend().subscribe((_response : any) => {
            this.loadingComplete = true;
            if(_response.message) {
              this._snackBar.openFromComponent(SuccessSnackbar, {
                data: _response.message,
                duration: 2000
              });
            }
            if(_response.recommend) {
              this.userRecommendationReady = true;
              this.recommendList = _response.recommend;
            }
          },error => {
            console.log(error);
            console.log("Some Error Happened");
            this.loadingComplete = true;
            this._snackBar.openFromComponent(ErrorSnackbar, {
              data: error.message,
              duration: 2000
            });
          });
          // this.userRecommendationReady = true;
        }
      },error => {
        console.log("Some Error Happened");
        this.loadingComplete = true;
        this._snackBar.openFromComponent(ErrorSnackbar, {
          data: error,
          duration: 2000
        });
      });
    }
  }

  userSelectedGenre(genre) {
    if(this.genresSelected.length < 5 && !this.genresSelected.includes(genre)) {
      this.genresSelected.push(genre);
    }
  }

  sendGenreSelection() {
    this.userService.updateUserGenre({"data": this.genresSelected.join()}).subscribe((_resp: any) => {
      this._snackBar.openFromComponent(SuccessSnackbar, {
        data: _resp.message,
        duration: 2000
      });
      this.userService.updateUserPreference().subscribe((_resp: any) => {
        this._snackBar.openFromComponent(SuccessSnackbar, {
          data: _resp.message,
          duration: 2000
        });

        location.reload();
      })
    },error => {
      this._snackBar.openFromComponent(ErrorSnackbar, {
        data: error.message,
        duration: 2000
      });
    });
  }

}
