import { Board, Cell, GameState, NUM_COLS, NUM_ROWS, Player } from "./gameState";

export let gameState: GameState = {
    board : [],
    turn : "R",
    winner : null,
    currentMoveCount : 0
};

export function initGame() {
    const board: Board = [];

    for (let row: number = 0 ; row<NUM_ROWS ; row++){
        const newRow: Cell[] = [];
        for (let col: number = 0 ; col<NUM_COLS ; col++){
            newRow.push(0);
        }
        board.push(newRow)
    }

    const turn: Player = "R";
    const winner: Player | null = null;
    const currentMoveCount: number = 0;

    gameState.board = board;
    gameState.turn = turn;
    gameState.winner = winner;
    gameState.currentMoveCount = currentMoveCount
}

export function playMove(selectedColumn: number){
    // 1 Verif fin de partie
    if (gameState.winner !== null){
        endGame();
        return;
    }

    // 2 Column ok ?
    if (selectedColumn<0 || selectedColumn>=NUM_COLS){
        alert("Colonne invalide ou pleine. Choisissez une autre colonne.");
        return;
    }

    for (let row: number = NUM_ROWS -1; row >= 0 ; row--){
        const cell: Cell = gameState.board[row][selectedColumn]
        // 3. Vérifier qu'il y a au moins une case libre dans cette colonne :
        if (cell === 0){
            // 4. Placer un jeton du joueur actif :
            if (gameState.turn === "R"){
                gameState.board[row][selectedColumn] = 1
            }
            else {
                gameState.board[row][selectedColumn] = 2
            }
            // 5. Incrémenter `gameState.currentMoveCount` de 1
            gameState.currentMoveCount++
            // 6. Vérifier si ce coup a provoqué une victoire :

            checkWin(row, selectedColumn, gameState.turn === "R" ? 1 : 2)
            // 7. Si `currentMoveCount == 3` :
            if (gameState.currentMoveCount ===3){
                gameState.currentMoveCount = 0
                gameState.turn = gameState.turn === "R" ? "Y" : "R";
            }
            return;
        }
    }
    alert("Colonne invalide ou pleine. Choisissez une autre colonne.");
    return;
}

export function checkWin(row: number, col: number, playerValue: number): void {
    const directions = [
        [0, 1],   // horizontal →
        [1, 0],   // vertical ↓
        [1, 1],   // diagonale ↘
        [1, -1],  // diagonale ↗
    ];

    for (const [dx, dy] of directions) {
        let count = 1;

        // Aller dans la direction positive (dx, dy)
        let r = row + dx;
        let c = col + dy;
        while (
            r >= 0 && r < NUM_ROWS &&
            c >= 0 && c < NUM_COLS &&
            gameState.board[r][c] === playerValue
            ) {
            count++;
            r += dx;
            c += dy;
        }

        // Aller dans la direction opposée (-dx, -dy)
        r = row - dx;
        c = col - dy;
        while (
            r >= 0 && r < NUM_ROWS &&
            c >= 0 && c < NUM_COLS &&
            gameState.board[r][c] === playerValue
            ) {
            count++;
            r -= dx;
            c -= dy;
        }

        // Vérification victoire
        if (count >= 6) {
            gameState.winner = gameState.turn;
            return;
        }
    }
}

export function endGame(): void {
    alert(`Le joueur ${gameState.turn === "R" ? "Rouge" : "Jaune"} a gagné !`);
    initGame();
}