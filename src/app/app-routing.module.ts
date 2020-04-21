import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './movies/movies_list/movies.list.component';
import { MoviesRecommendComponent } from './movies/movie_recommend/movies.recommend.component';


const routes: Routes = [
  {
    path: '',
    component: MoviesRecommendComponent,
    data: { title: 'Recommend' }
  },
  {
    path: 'movies',
    component: MoviesListComponent,
    data: { title: 'Movies List' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
