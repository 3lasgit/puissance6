import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-game-to-join',
  standalone: true,
  imports: [HttpClientModule, NgForOf],
  templateUrl: './list-games-to-join.component.html',
})
export class ListGamesToJoinComponent implements OnInit {
  games: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/games').subscribe({
      next: (data) => {
        this.games = data.filter(g => g.status === 'waiting');
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des parties :', err);
      }
    });
  }

  joinGame(id: number) {
    this.router.navigate(['/join-game', id]);
  }
}
