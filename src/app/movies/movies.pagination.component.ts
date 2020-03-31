import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'movie-pagination',
  template: `
    <ul>
      <li>&laquo;</li>
      <li>&raquo;</li>
    </ul>
  `
})
export class MoviesPaginationComponent implements OnInit{
  //TODO
  constructor() {}

  ngOnInit() {}
}
