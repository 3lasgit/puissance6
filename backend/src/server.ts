import express from 'express';
import cors from 'cors';
import { gameState, initGame, playMove } from './gameLogic'; // import de ton module jeu

const app = express();
const PORT = 8080;

app.use(cors({
    origin: 'http://localhost:4200', // front React (dev)
}));
app.use(express.json());

// Route racine GET simple pour tester
app.get('/', (req, res) => {
    res.send('Serveur OK - accueil');
});

// Liste de parties en mémoire (exemple)
const games: any[] = [];

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
    res.json(gameState);
});

// Route pour jouer un coup
app.post('/api/game/move', (req, res) => {
    const { column } = req.body;
    if (typeof column !== 'number') {
        return res.status(400).json({ error: 'Column must be a number' });
    }

    if (gameState.winner !== null) {
        return res.status(400).json({ error: 'Game already finished' });
    }

    // Essaye de jouer le coup
    try {
        playMove(column);
        res.json(gameState);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

// Route pour réinitialiser la partie
app.post('/api/game/reset', (req, res) => {
    initGame();
    res.json(gameState);
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