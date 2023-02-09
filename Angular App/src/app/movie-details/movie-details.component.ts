import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from '../shared/models/IMovie';
import { MoviesService } from '../shared/services/movies.service';
import { Location } from '@angular/common';
import { IDropdown } from '../shared/models/IDropdown';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  actors: IDropdown[] = [];

  movie: IMovie | undefined;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private location: Location) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    let movieId = this.route.snapshot.paramMap.get('id');
    if (movieId != null) {
      this.moviesService.getMovie(+movieId).subscribe((movie: IMovie) => {
        this.movie = movie;
      });

      this.moviesService.getActorsDropdown().subscribe((actors: IDropdown[]) => {
        this.actors = actors;
      });
    }
  }

  onSubmit() {
    if (this.movie != undefined) {
      this.moviesService.modifyMovie(this.movie).subscribe(() => {
        alert(`${this.movie?.title} has been successfully modified.`);
      });
    }
  }

  refreshEvent() {
    this.refreshData();
  }

  goBack() {
    this.location.back();
  }

}
