import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  // Flights
  const flightsRaw = fs.readFileSync(path.join(__dirname, '../../src/shared/mocks/FlightsData.ts'), 'utf-8');
  const flightsMatch = flightsRaw.match(/export const flightsData: Flight\[\] = (\[.*\]);/s);
  let flights = [];
  if (flightsMatch) {
    // Преобразуем в валидный JSON
    let json = flightsMatch[1]
      .replace(/([a-zA-Z0-9_]+):/g, '"$1":')
      .replace(/'/g, '"')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    try {
      flights = JSON.parse(json);
    } catch (e) {
      console.error('Ошибка парсинга flightsData:', e);
    }
  }
  // Преобразуем к нужному виду
  const flightsToInsert = flights.map(f => ({
    airline: f.airline,
    from: f.from.city,
    to: f.to.city,
    number: f.flightNumber,
    departure: f.from.scheduled || '',
    arrival: f.to.scheduled || '',
    status: f.isActive ? 'active' : 'inactive',
  }));

  // Users
  const usersRaw = fs.readFileSync(path.join(__dirname, '../../src/shared/mocks/UserData.ts'), 'utf-8');
  const usersMatch = usersRaw.match(/export const users: User\[\] = (\[.*\]);/s);
  let users = [];
  if (usersMatch) {
    let json = usersMatch[1]
      .replace(/([a-zA-Z0-9_]+):/g, '"$1":')
      .replace(/'/g, '"')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    try {
      users = JSON.parse(json);
    } catch (e) {
      console.error('Ошибка парсинга users:', e);
    }
  }
  const usersToInsert = users.map(u => ({
    email: u.email,
    username: u.user,
    password: u.password,
  }));

  // Чистим старые данные
  await prisma.flight.deleteMany();
  await prisma.user.deleteMany();

  // Вставляем новые
  if (flightsToInsert.length) {
    await prisma.flight.createMany({ data: flightsToInsert });
  }
  if (usersToInsert.length) {
    await prisma.user.createMany({ data: usersToInsert });
  }

  console.log('Данные успешно загружены в базу!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 