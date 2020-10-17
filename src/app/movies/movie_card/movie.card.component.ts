import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { IMovies } from '../../shared/interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

class RatingInfo {
  movieTitle: string;
  userRating: number;
  message: string
}


@Component({
  selector: 'movie-card',
  templateUrl: './movie.card.component.html',
  styleUrls: ['./movie.card.component.scss']
})
export class MovieCardComponent  implements OnInit {
  authenticated: boolean;
  private defaultImage = '../../../../../assets/image/placeholder-image.png';
  private recommendImage = '../../../../../assets/image/icons/recommend.svg';

  @Input() movieId : number;
  private movieInfo: any;
  private showStoryLine: boolean = false;
  private showStartsToRate: boolean = false;
  private alreadyRated: boolean = false;
  private userMovierating: number;

  constructor(private movieService: MovieService, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
      });

    this.movieService.getMovieWithIdCached(this.movieId).subscribe((_movieInfo : any) => {
      console.log(_movieInfo);
      _movieInfo.genre = _movieInfo.genre.split(",").join(", ");
      if(_movieInfo.coverImage) {
        _movieInfo.coverImage = _movieInfo.coverImage + "_UX250.jpg";
      }
      this.movieInfo = _movieInfo;
    });

    if(this.authenticated) {
      this.movieService.getRatingWithId(this.movieId).subscribe((_ratingInfo : RatingInfo) => {
        console.log(_ratingInfo);
        if (_ratingInfo.userRating) {
          this.alreadyRated = true;
          this.userMovierating = _ratingInfo.userRating;
        }
      });
    }
  }

  rateMovie() {
    this.showStartsToRate = !this.showStartsToRate;
  }

  showStory() {
    this.showStoryLine= !this.showStoryLine;
    console.log("SHOW STORY: "+this.showStoryLine);
  }

  updateMovieRating(rating) {
    console.log(rating);
    let ratingData = {
      "rating" : rating
    }
    this.movieService.updateUserRating(this.movieId, ratingData).subscribe( (_response) => {
      console.log(_response);
      this.movieService.getRatingWithId(this.movieId).subscribe((_ratingInfo : RatingInfo) => {
        console.log(_ratingInfo);
        if (_ratingInfo.userRating) {
          this.alreadyRated = true;
          this.userMovierating = _ratingInfo.userRating;
        }
      });
    });
  }

  navigateToRecommed(movieName: string) {
    console.log("Clicked on ",movieName);
    this.router.navigate([`/movies/${movieName}`]);
  }
}
