import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'genre-card',
  templateUrl: './genre.card.component.html',
  styleUrls: ['./genre.card.component.scss']
})
export class GenreCardComponent  implements OnInit {

  @Input() genre : string;
  @Output() genreSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  selectGenre(event, selected) {
    console.log("Selected genre:"+selected);
    this.genreSelected.emit(selected);
  }
}
