import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IActor } from '../shared/models/IActor';
import { MoviesService } from '../shared/services/movies.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {

  @Input() actorId: number | undefined;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter();

  actor: IActor | undefined;


  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(`ngOnChanges ${this.actorId}`);
    if (this.actorId != undefined) {
      this.getActorDetails(this.actorId);
    }
  }

  getActorDetails(actorId: number) {
    this.moviesService.getActor(actorId).subscribe((actor: IActor) => {
      this.actor = actor;
    });
  }

  onSubmit() {
    if (this.actor != undefined) {
      this.moviesService.modifyActor(this.actor).subscribe(() => {
        alert(`${this.actor?.name} has been successfully modified.`);
        this.refreshEvent.emit();
      });
    }
  }

}
