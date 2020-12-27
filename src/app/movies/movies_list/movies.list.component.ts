import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { IMovies } from '../../shared/interface';

const INITIAL_MOVIE_ID = 1
const ITEMS_PER_PAGE = 25
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

  changePage(pageEvent: any) {
    console.log(pageEvent);
    let start = pageEvent.pageIndex * pageEvent.pageSize + 1;
    let end = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    this.movieService.getMoviesWithCache(start, end).subscribe((data: any) => {
      this.moviesList =  this.filteredMoviesList = data;
    })
  }
}
