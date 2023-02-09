import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesResolver } from './movies/resolvers/movies.resolver';
import { MovieDetailsGuard } from './shared/guards/movie-details.guard';

const routes: Routes = [
  //po default-u je pathMatch: 'prefix'
  //Angular traži postoji li nakon base url-a prefix movies npr.
  //Ako ovdje nema pathMatch full, browser će tražiti http://localhost:4200/ jer smo u path-u definirali prazan string
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent},
  // { path: 'movies', component: MoviesComponent, resolve: { movies: MoviesResolver } },
  { path: 'movies/:id', component: MovieDetailsComponent, canActivate: [MovieDetailsGuard] },
  //404 NOT FOUND COMPONENT
  { path: '**', redirectTo: '/movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
