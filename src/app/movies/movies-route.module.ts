import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MoviesRecommendComponent } from './movie_recommend/movies.recommend.component';
import { MovieCardComponent } from './movie_card/movie.card.component';
import { GenreCardComponent } from './genre_card/genre.card.component';
import { MoviesListComponent } from './movies_list/movies.list.component';
import { FilterMoviesComponent } from './movies_list/movies.filter.component';
import { InitialGenreSelectionDialogComponent } from './movie_recommend/initial.genre.selection.dialog.component';
import { SingleMovieRecommendComponent } from './movie_recommend/single-movie.recommend.component';


const routes: Routes = [
  { path: '', component: MoviesRecommendComponent},
  { path: 'movies', component: MoviesListComponent},
  { path: 'movies/:movieName', component: SingleMovieRecommendComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule{
  static components = [MoviesRecommendComponent, MovieCardComponent, GenreCardComponent, MoviesListComponent,
                        FilterMoviesComponent, InitialGenreSelectionDialogComponent, SingleMovieRecommendComponent];
}
