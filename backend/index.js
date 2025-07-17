import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const flightsPath = path.join(__dirname, 'data', 'flights.json');
const usersPath = path.join(__dirname, 'data', 'users.json');

const JWT_SECRET = process.env.JWT_SECRET;

app.get('/api/flights', (req, res) => {
  try {
    const flights = JSON.parse(fs.readFileSync(flightsPath, 'utf-8'));
    res.json(flights);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load flights' });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // Генерируем access и refresh токены
    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username
    };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    res.json({ accessToken, refreshToken, username: user.username, email: user.email });
  } else {
    res.status(401).json({ error: 'Неверный email или пароль' });
  }
});

app.post('/api/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'No refresh token provided' });
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    // Можно добавить проверку отзыва refreshToken (например, хранить их в базе)
    const newAccessToken = jwt.sign({
      userId: payload.userId,
      email: payload.email,
      username: payload.username
    }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken: newAccessToken });
  } catch (e) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});  