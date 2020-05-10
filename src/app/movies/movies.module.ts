import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-route.module';

import { InitialGenreSelectionDialogComponent } from './movie_recommend/initial.genre.selection.dialog.component';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { RatingComponent } from '../common/rating/rating.component';


@NgModule({
  imports: [SharedModule, MoviesRoutingModule],
  declarations: [MoviesRoutingModule.components, PaginationComponent, RatingComponent],
  entryComponents: [InitialGenreSelectionDialogComponent]
})
export class MoviesModule{

}
