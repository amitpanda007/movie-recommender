import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { IMovies } from '../../shared/interface';

const INITIAL_MOVIE_ID = 1
const ITEMS_PER_PAGE = 50

@Component({
  selector: 'movies-list',
  templateUrl: './movies.list.component.html',
  styleUrls: ['./movies.list.component.scss']
})
export class MoviesListComponent  implements OnInit {
  //moviesList: any = (data as any).default;
  moviesList: Array<IMovies>;
  moviesCount: any;
  filteredMoviesList: any[];
  showPerPage: number;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.showPerPage = ITEMS_PER_PAGE;
    // this.movieService.getMovies(0, this.showPerPage).subscribe((data: any) => {
    //   console.log(data);
    //   this.moviesList =  this.filteredMoviesList = data;
    // });

    this.movieService.getMoviesWithCache(INITIAL_MOVIE_ID, this.showPerPage).subscribe((data: any) => {
      this.moviesList =  this.filteredMoviesList = data;
    })

    this.movieService.getMoviesCount().subscribe((data: any) => {
      console.log(data);
      this.moviesCount = data.totalMovies;
    });
  }

  filter(data: string) {
    if(data) {
      this.filteredMoviesList = this.moviesList.filter((movies: any) => {
        return movies.movieName.toLowerCase().indexOf(data.toLowerCase()) > -1;
      })
    }else {
      this.filteredMoviesList = this.moviesList;
    }
  }

  changePage(data: number) {
    let start = (data - 1) * this.showPerPage + 1;
    let end = data * this.showPerPage;
    // this.movieService.getMovies(start, end).subscribe((data: any) => {
    //   console.log(data);
    //   this.moviesList =  this.filteredMoviesList = data;
    // });
    this.movieService.getMoviesWithCache(start, end).subscribe((data: any) => {
      this.moviesList =  this.filteredMoviesList = data;
    })
  }
}
