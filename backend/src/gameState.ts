export type Player = "R" | "Y"; // Type = majuscule
export type Cell = 0 | 1 | 2; // 1 pour "R" et 2 pour "Y"

export const NUM_ROWS: number = 15;
export const NUM_COLS: number = 10;

export type Board = Cell[][];

export interface GameState {
    board: Board;
    turn: Player;
    winner: Player | null;
    currentMoveCount : number
}
