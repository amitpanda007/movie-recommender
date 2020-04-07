import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from "@angular/core";
import { IMovies } from '../../shared/interface';

@Component({
  selector: 'pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnInit,OnChanges{

  // @Input() data: Array<IMovies>;
  @Input() totalData: number;
  @Input() itemsPerPage: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  totalItems: Array<Number>;
  currentPage: number;
  lastPage: number;

  // dataPerPage: number = 5;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalData']) {
      if(changes['totalData'].currentValue) {
        this.totalItems = this.getPages(this.totalData);
        this.lastPage = this.totalItems.length;
      }
    }
  }

  ngOnInit() {
    this.currentPage = 1;
  }

  paginate(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    if (value == '-1') {
      if(this.currentPage > 1) {
        this.currentPage -= 1;
        this.pageChange.emit(this.currentPage);
        console.log("going to page "+ this.currentPage);
      }
      return;
    }
    if (value == '+1') {
      if(this.currentPage < this.lastPage) {
        this.currentPage += 1;
        this.pageChange.emit(this.currentPage);
        console.log("going to page " + this.currentPage);
      }
      return;
    }
    console.log("going to page " + value);
    this.currentPage = parseInt(value);
    this.pageChange.emit(this.currentPage);
  }

  getPages(_data) {
    console.log(_data);
    let totalPages = Math.ceil(_data/this.itemsPerPage);
    return [...Array(totalPages).keys()];
  }
}
