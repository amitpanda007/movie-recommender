import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesRecommendComponent } from './movies/movie_recommend/movies.recommend.component';


const routes: Routes = [
  {
    path: '',
    component: MoviesRecommendComponent,
    data: { title: 'Recommend' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
