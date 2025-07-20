"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const gameLogic_1 = require("./gameLogic"); // import de ton module jeu
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200', // front React (dev)
}));
app.use(express_1.default.json());
// Route racine GET simple pour tester
app.get('/', (req, res) => {
    res.send('Serveur OK - accueil');
});
// Liste de parties en mémoire (exemple)
const games = [];
// Route GET pour récupérer toutes les parties
app.get('/api/games', (req, res) => {
    res.json(games);
});
app.post('/api/games', (req, res) => {
    const { player1Name, blitzMinuteDuration } = req.body;
    if (!player1Name || typeof blitzMinuteDuration !== 'number') {
        return res.status(400).json({ error: 'Invalid payload' });
    }
    const newGame = {
        id: games.length + 1,
        player1Name,
        blitzMinuteDuration,
        createdAt: new Date(),
        status: 'waiting'
    };
    games.push(newGame);
    res.status(201).json(newGame);
});
// Route pour récupérer l'état du jeu
app.get('/api/game', (req, res) => {
    res.json(gameLogic_1.gameState);
});
// Route pour jouer un coup
app.post('/api/game/move', (req, res) => {
    const { column } = req.body;
    if (typeof column !== 'number') {
        return res.status(400).json({ error: 'Column must be a number' });
    }
    if (gameLogic_1.gameState.winner !== null) {
        return res.status(400).json({ error: 'Game already finished' });
    }
    // Essaye de jouer le coup
    try {
        (0, gameLogic_1.playMove)(column);
        res.json(gameLogic_1.gameState);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Route pour réinitialiser la partie
app.post('/api/game/reset', (req, res) => {
    (0, gameLogic_1.initGame)();
    res.json(gameLogic_1.gameState);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// import express from "express";
// import cors from "cors";
//
// const app = express();
// const PORT = 3001;
//
// app.use(cors());
// app.use(express.json());
//
// app.get("/", (req, res) => {
//     res.send("Backend Puissance 6 en TypeScript ✅");
// });
//
// app.listen(PORT, () => {
//     console.log(`Serveur lancé sur http://localhost:${PORT}`);
// });
//
// // GET /game
// app.get("/game", (req, res) => {
//     res.send("Game");
// });
//
// // GET tet
// app.get("/test", (req, res) => {
//     res.json({ message: 'Hello from backend!' });
// });
