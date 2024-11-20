const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function allGames() {
  let query = 'SELECT * FROM games';
  let result = await db.all(query, []);
  return { games: result };
}

app.get('/games', async (req, res) => {
  let result = await allGames();
  res.json(result);
});

async function gameById(id) {
  let query = 'SELECT * FROM games WHERE id =?';
  let result = await db.all(query, [id]);
  return { games: result };
}

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  let result = await gameById(id);
  res.json(result);
});

async function gameByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre =?';
  let result = await db.all(query, [genre]);
  return { games: result };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let result = await gameByGenre(genre);
  res.json(result);
});

async function gameByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform =?';
  let result = await db.all(query, [platform]);
  return { games: result };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let result = await gameByPlatform(platform);
  res.json(result);
});

async function sortByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let result = await db.all(query, []);
  return { games: result };
}
app.get('/games/sort-by-rating', async (req, res) => {
  let result = await sortByRating();
  res.json(result);
});

async function allPlayers() {
  let query = 'SELECT * FROM players';
  let result = await db.all(query, []);
  return { players: result };
}

app.get('/players', async (req, res) => {
  let result = await allPlayers();
  res.json(result);
});

async function playersById(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let result = await db.all(query, [id]);
  return { players: result };
}

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  let result = await playersById(id);
  res.json(result);
});

async function playersByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform =?';
  let result = await db.all(query, [platform]);
  return { players: result };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let result = await playersByPlatform(platform);
  res.json(result);
});

async function playersSortByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let result = await db.all(query, []);
  return { players: result };
}
app.get('/players/sort-by-rating', async (req, res) => {
  let result = await sortByRating();
  res.json(result);
});

async function alltournaments() {
  let query = 'SELECT * FROM tournaments';
  let result = await db.all(query, []);
  return { tournaments: result };
}

app.get('/tournaments', async (req, res) => {
  let result = await alltournaments();
  res.json(result);
});

async function tournamentsById(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let result = await db.all(query, [id]);
  return { tournaments: result };
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  let result = await tournamentsById(id);
  res.json(result);
});

async function tournamentsBygameId(id) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let result = await db.all(query, [id]);
  return { tournaments: result };
}

app.get('/tournaments/game/:gameId', async (req, res) => {
  let id = req.params.gameId;
  let result = await tournamentsBygameId(id);
  res.json(result);
});

async function sortByPricePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let result = await db.all(query, []);
  return { tournaments: result };
}
app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  let result = await sortByPricePool();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
