import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './create-game-page.component.html'
})
export class CreateGamePageComponent {
  player1Name = '';
  blitzMinuteDuration = 15;
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  createGame() {
    const payload = {
      player1Name: this.player1Name,
      blitzMinuteDuration: this.blitzMinuteDuration
    };

    this.http.post('/api/games', payload).subscribe({
      next: (res) => {
        console.log('Game created', res);
        this.message = 'Partie créée avec succès !';
        this.router.navigate(['/list-games-to-join']);
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        this.message = 'Erreur lors de la création de la partie.';
      }
    });
  }
}
