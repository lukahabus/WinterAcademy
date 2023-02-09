import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../shared/services/movies.service';
import { IMovie } from '../shared/models/IMovie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {

  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<IMovie>(this.allowMultiSelect, this.initialSelection);

  movies: IMovie[] = [];

  displayedColumns: string[] = ['id', 'title', 'duration', 'details'];

  constructor(private router: Router, private moviesService: MoviesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.moviesService.getMovies().subscribe({
      next: movies => {
        this.movies = movies;
        console.log(`getMovies subscribe -> next notification: ` + JSON.stringify(this.movies));
      },
      error: err => {
        console.log(`getMovies subscribe -> error notification`);
      },
      complete() {
        console.log(`getMovies subscribe -> complete notification`);
      },
    })

    // this.activatedRoute.data.subscribe((data) => {
    //   this.movies = data['movies'];
    // })
  }


  onDetailsClick(movieId: number) {
    this.router.navigate(
      ['/movies', movieId]
    );
  }

}





