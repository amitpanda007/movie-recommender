import { Component, OnInit } from '@angular/core';
import * as data from "../dummy_data/movies_list.json";

@Component({
  selector: 'movies-list',
  templateUrl: './movies.list.component.html',
  styleUrls: ['./movies.list.component.scss']
})
export class MoviesListComponent  implements OnInit {
  moviesList: any = (data as any).default;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.moviesList);
  }

}
