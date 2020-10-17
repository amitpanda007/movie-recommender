import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
export class MoviesRecommendComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  private recommendList: any;
  private movieRecommendList: any;
  private genreRecommendList: any;
  private ratingRecommendList: any;
  private movieSearchResult: any;

  private userSearchterm: string;
  private loadingComplete: boolean = false;
  private userRecommendationReady: boolean = false;
  private initialSetupReady: boolean = false;
  private hideRecommendGenres: boolean = false;
  private recommendGenres: any;
  private genresSelected: Array<string> = [];

  constructor(private elementRef: ElementRef, private _snackBar: MatSnackBar, private movieRecommendService : MovieRecommendService, 
              private movieService: MovieService, private auth: AuthService, private userService: UserService, private dislog: MatDialog, private router: Router) {}


  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F3E5F5';
  }

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
          this.recommendBasedOnRating();
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

  searchData(searchTerm: string) {
    if(searchTerm) {
      this.userSearchterm = searchTerm;
      this.movieService.getMovieNameFromSearchTerm(this.userSearchterm).subscribe((_response: any) => {
        console.log(_response);
        if(_response.length == 0) {
          this.movieSearchResult = "";
        }else {
          this.movieSearchResult = _response;
        }
      });
    }else {
      console.log("invalid search");
      this.movieSearchResult = "";
    }
  }

  searchMovieRecommend(event: any) {
    // console.log(event);
    this.recommendBasedOnMovie(this.userSearchterm);
  }

  recommendBasedOnMovie(movieName: string) {
    this.loadingComplete = false;
    const postdata = {
      "type": "movie",
      "movie": `${movieName}`
    };
    this.movieRecommendService.getSvdRecommend(postdata).subscribe((_response: any) => {
      this.loadingComplete = true;
      console.log(_response);
      if(_response.message) {
        this._snackBar.openFromComponent(SuccessSnackbar, {
          data: _response.message,
          duration: 2000
        });
      }
      if(_response.recommend) {
        this.userRecommendationReady = true;
        this.movieRecommendList = _response.recommend;
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
  }

  recommendBasedOnGenre() {
    this.loadingComplete = false;
    const postdata = {
      "type": "genre"
    };
    this.movieRecommendService.getSvdRecommend(postdata).subscribe((_response : any) => {
      this.loadingComplete = true;
      console.log(_response);
      if(_response.message) {
        this._snackBar.openFromComponent(SuccessSnackbar, {
          data: _response.message,
          duration: 2000
        });
      }
      if(_response.recommend) {
        this.userRecommendationReady = true;
        this.genreRecommendList = _response.recommend;
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
  }

  recommendBasedOnRating() {
    this.loadingComplete = false;
    const postdata = {
      "type": "rated"
    };
    this.movieRecommendService.getSvdRecommend(postdata).subscribe((_response : any) => {
      this.loadingComplete = true;
      console.log(_response);
      if(_response.message) {
        this._snackBar.openFromComponent(SuccessSnackbar, {
          data: _response.message,
          duration: 2000
        });
      }
      if(_response.recommend) {
        this.userRecommendationReady = true;
        this.ratingRecommendList = _response.recommend;
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
  }

  gerRecommendation(event) {
    const tabInfo = event.tab;
    switch (event.index) {  
      case 0:
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F3E5F5';
        if(tabInfo.isActive && this.ratingRecommendList == undefined) {
          this.recommendBasedOnRating();
        }
        break;
      case 1:
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F9FBE7';
        console.log(this.genreRecommendList);
        if(tabInfo.isActive && this.genreRecommendList == undefined) {
          this.recommendBasedOnGenre();
        }
        break;
      case 2:
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F5E9';
        if(tabInfo.isActive && this.movieRecommendList == undefined) {
          this.recommendBasedOnMovie("");
        }
        break;
          
      default:
        break;
    }

  }

}
