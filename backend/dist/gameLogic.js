"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameState = void 0;
exports.initGame = initGame;
exports.playMove = playMove;
exports.checkWin = checkWin;
exports.endGame = endGame;
const gameState_1 = require("./gameState");
exports.gameState = {
    board: [],
    turn: "R",
    winner: null,
    currentMoveCount: 0
};
function initGame() {
    const board = [];
    for (let row = 0; row < gameState_1.NUM_ROWS; row++) {
        const newRow = [];
        for (let col = 0; col < gameState_1.NUM_COLS; col++) {
            newRow.push(0);
        }
        board.push(newRow);
    }
    const turn = "R";
    const winner = null;
    const currentMoveCount = 0;
    exports.gameState.board = board;
    exports.gameState.turn = turn;
    exports.gameState.winner = winner;
    exports.gameState.currentMoveCount = currentMoveCount;
}
function playMove(selectedColumn) {
    // 1 Verif fin de partie
    if (exports.gameState.winner !== null) {
        endGame();
        return;
    }
    // 2 Column ok ?
    if (selectedColumn < 0 || selectedColumn >= gameState_1.NUM_COLS) {
        alert("Colonne invalide ou pleine. Choisissez une autre colonne.");
        return;
    }
    for (let row = gameState_1.NUM_ROWS - 1; row >= 0; row--) {
        const cell = exports.gameState.board[row][selectedColumn];
        // 3. Vérifier qu'il y a au moins une case libre dans cette colonne :
        if (cell === 0) {
            // 4. Placer un jeton du joueur actif :
            if (exports.gameState.turn === "R") {
                exports.gameState.board[row][selectedColumn] = 1;
            }
            else {
                exports.gameState.board[row][selectedColumn] = 2;
            }
            // 5. Incrémenter `gameState.currentMoveCount` de 1
            exports.gameState.currentMoveCount++;
            // 6. Vérifier si ce coup a provoqué une victoire :
            checkWin(row, selectedColumn, exports.gameState.turn === "R" ? 1 : 2);
            // 7. Si `currentMoveCount == 3` :
            if (exports.gameState.currentMoveCount === 3) {
                exports.gameState.currentMoveCount = 0;
                exports.gameState.turn = exports.gameState.turn === "R" ? "Y" : "R";
            }
            return;
        }
    }
    alert("Colonne invalide ou pleine. Choisissez une autre colonne.");
    return;
}
function checkWin(row, col, playerValue) {
    const directions = [
        [0, 1], // horizontal →
        [1, 0], // vertical ↓
        [1, 1], // diagonale ↘
        [1, -1], // diagonale ↗
    ];
    for (const [dx, dy] of directions) {
        let count = 1;
        // Aller dans la direction positive (dx, dy)
        let r = row + dx;
        let c = col + dy;
        while (r >= 0 && r < gameState_1.NUM_ROWS &&
            c >= 0 && c < gameState_1.NUM_COLS &&
            exports.gameState.board[r][c] === playerValue) {
            count++;
            r += dx;
            c += dy;
        }
        // Aller dans la direction opposée (-dx, -dy)
        r = row - dx;
        c = col - dy;
        while (r >= 0 && r < gameState_1.NUM_ROWS &&
            c >= 0 && c < gameState_1.NUM_COLS &&
            exports.gameState.board[r][c] === playerValue) {
            count++;
            r -= dx;
            c -= dy;
        }
        // Vérification victoire
        if (count >= 6) {
            exports.gameState.winner = exports.gameState.turn;
            return;
        }
    }
}
function endGame() {
    alert(`Le joueur ${exports.gameState.turn === "R" ? "Rouge" : "Jaune"} a gagné !`);
    initGame();
}
