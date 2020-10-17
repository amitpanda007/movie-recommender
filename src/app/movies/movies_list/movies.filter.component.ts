import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'filter-movies',
  template: `
    <input class="movieSearch" name="search" type="text" placeholder="movie name" [(ngModel)]="filter" autocomplete="off">
  `,
  styles: [`
  .movieSearch {
    outline: none;
    position: relative;
    margin-left: 133px;
    padding-left: 27px;
    background: #fff;
    display: flex;
    border: 1px solid #dfe1e5;
    box-shadow: none;
    width: 690px;
    border-radius: 6px;
    z-index: 3;
    height: 44px;
    margin: 0 auto;
  }
  `]
})
export class FilterMoviesComponent implements OnInit {

  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(val: string) {
    this._filter = val;
    this.changed.emit(this.filter);
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
