import { NgModule } from "@angular/core";
import { MatSnackBarModule, MatButtonModule, MatCardModule, MatToolbarModule, MatDialogModule,
          MatFormFieldModule, MatInputModule, MatMenuModule, MatBadgeModule, MatProgressSpinnerModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-route.module';

import { InitialGenreSelectionDialogComponent } from './movie_recommend/initial.genre.selection.dialog.component';
import { PaginationComponent } from '../common/pagination/pagination.component';


@NgModule({
  imports: [SharedModule, MoviesRoutingModule, MatSnackBarModule, MatButtonModule, MatCardModule, MatToolbarModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatMenuModule, MatBadgeModule, MatProgressSpinnerModule],
  declarations: [MoviesRoutingModule.components, PaginationComponent],
  entryComponents: [InitialGenreSelectionDialogComponent]
})
export class MoviesModule{

}
