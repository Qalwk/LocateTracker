import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);

const FRONTEND_ORIGIN = 'http://localhost:5173';

// Раздача статики для картинок
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

// Явно обрабатываем preflight-запросы для CORS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());
app.use(cookieParser());

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
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // true только для https
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 дней
      })
      .json({ accessToken, username: user.username, email: user.email });
  } else {
    res.status(401).json({ error: 'Неверный email или пароль' });
  }
});

app.post('/api/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(400).json({ error: 'No refresh token provided' });
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
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

app.post('/api/logout', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false, // true только для https
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out' });
});

// --- GraphQL schema and resolvers ---
const typeDefs = `#graphql
  type Flight {
    id: ID!
    airline: String!
    speed: String!
    codes: [String!]!
    from: Airport!
    to: Airport!
  }
  type Airport {
    city: String!
    iata: String!
  }
  type Query {
    flights: [Flight!]!
    flight(id: ID!): Flight
  }
`;

const resolvers = {
  Query: {
    flights: () => {
      const flights = JSON.parse(fs.readFileSync(flightsPath, 'utf-8'));
      return flights;
    },
    flight: (_, { id }) => {
      const flights = JSON.parse(fs.readFileSync(flightsPath, 'utf-8'));
      return flights.find(f => f.id === id);
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    '/graphql',
    cors({ origin: FRONTEND_ORIGIN, credentials: true }),
    express.json(),
    expressMiddleware(server)
  );
}

await startApolloServer();

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
});  