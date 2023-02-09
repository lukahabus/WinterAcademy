import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IMovie } from '../models/IMovie';
import { MoviesService } from '../services/movies.service';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailsGuard implements CanActivate {

    constructor(private moviesService: MoviesService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        debugger;
        let movieId = route.paramMap.get('id');

        //Za manipuliranje asinkronih metoda
        return new Promise((resolve) => {
            if (movieId != null) {
                this.moviesService.getMovie(+movieId).subscribe({
                    next: movie => {
                        resolve(true);
                    },
                    error: err => {
                        alert(`Movie ${movieId} doesn't exists`);
                        this.router.navigate(
                            ['/movies']
                        );
                        resolve(false);
                    }
                });
            }
        })
    }
}
