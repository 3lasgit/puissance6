import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-join-game',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './join-game.component.html',
})

export class JoinGameComponent {
  gameId: number = 0;
  player2Name = '';

constructor(private activatedroute: ActivatedRoute, private router: Router) {
  activatedroute.params.subscribe(params => {
    this.gameId = +params['id'];
  });
}
playGame() {
  this.router.navigate(['/playgame', this.gameId]);
}

}
