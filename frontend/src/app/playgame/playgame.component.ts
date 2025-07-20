import { Component, OnInit } from '@angular/core';
import { GameService, GameState } from '../services/game.service';
import {NgForOf, NgIf} from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // ← ajoute ceci

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  imports: [
    NgForOf,
    NgIf,
    RouterModule,
    HttpClientModule   // ← ajoute ici pour que HttpClient soit injecté dans GameService
  ],
})

export class PlaygameComponent implements OnInit {
  gameState: GameState | null = null;
  errorMessage: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGame();
  }

  loadGame(): void {
    this.gameService.getGameState().subscribe({
      next: (state) => {
        this.gameState = state;
        this.errorMessage = '';
        console.log(state)
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement du jeu';
      }
    });
  }

  playColumn(col: number): void {
    if (!this.gameState || this.gameState.winner !== null) {
      this.errorMessage = 'Partie terminée ou chargement en cours';
      return;
    }
    this.gameService.playMove(col).subscribe({
      next: (state) => {
        this.gameState = state;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur lors du coup';
      }
    });
  }

  resetGame(): void {
    this.gameService.resetGame().subscribe({
      next: (state) => {
        this.gameState = state;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la réinitialisation';
      }
    });
  }
}


// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-playgame',
//   templateUrl: './playgame.component.html',
//   styleUrls: ['./playgame.component.css']
// })
// export class PlaygameComponent implements OnInit {
//   grid: string[][] = [];
//   rowIndex: any;
//   colIndex: any;
//
//   ngOnInit(): void {
//     this.initGrid();
//   }
//
//   initGrid(): void {
//     const size = 15;
//     this.grid = Array.from({ length: size }, () => Array(size).fill(''));
//   }
// }
