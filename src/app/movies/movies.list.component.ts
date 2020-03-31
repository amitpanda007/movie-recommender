import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as data from '../dummy_data/movies_list.json';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'movies-list',
  templateUrl: './movies.list.component.html',
  styleUrls: ['./movies.list.component.scss']
})
export class MoviesListComponent  implements OnInit {
  //moviesList: any = (data as any).default;
  moviesList: any[];
  filteredMoviesList: any[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getAllMovies().subscribe((data: any) => {
      console.log(data);
      this.moviesList =  this.filteredMoviesList = data;
    });
  }

  getAllMovies() {
    return this.http.get(environment.apiUrl + "movies/all");
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

}
