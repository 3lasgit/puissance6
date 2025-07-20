import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameState {
  board: number[][];
  currentPlayer: number;
  winner: number | null;
  // adapte selon ta structure réelle dans gameState
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = '/api/game';

  constructor(private http: HttpClient) {}

  getGameState(): Observable<GameState> {
    return this.http.get<GameState>(this.baseUrl);
  }

  playMove(column: number): Observable<GameState> {
    return this.http.post<GameState>(`${this.baseUrl}/move`, { column });
  }

  resetGame(): Observable<GameState> {
    return this.http.post<GameState>(`${this.baseUrl}/reset`, {});
  }
}
