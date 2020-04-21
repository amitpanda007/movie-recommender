import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { IMovies } from '../../shared/interface';

@Component({
  selector: 'movie-card',
  templateUrl: './movie.card.component.html',
  styleUrls: ['./movie.card.component.scss']
})
export class MovieCardComponent  implements OnInit {

  @Input() movieId : number;
  private movieInfo: any;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getMovieWithId(this.movieId).subscribe(_movieInfo => {
      console.log(_movieInfo);
      this.movieInfo = _movieInfo;
    });
  }
}
