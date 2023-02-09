import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IMovie } from 'src/app/shared/models/IMovie';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Injectable({
    providedIn: 'root'
})
export class MoviesResolver implements Resolve<IMovie[] | null> {

    constructor(
        private moviesService: MoviesService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovie[] | null> {
        console.log(`MoviesResolver has been triggered`);
        return this.moviesService.getMovies();
    }
}
