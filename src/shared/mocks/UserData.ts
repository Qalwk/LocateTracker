export interface User {
  id: string;
  email: string;
  user: string;
  password: string;
  company:
    | 'admin'
    | 'Ryanair'
    | 'S7 Airlines'
    | 'Swiss'
    | 'Lufthansa'
    | 'Turkish Airlines';
}

export const users: User[] = [
  {
    id: '1',
    email: 'admin@gmail.com',
    user: 'admin',
    password: 'adminpass',
    company: 'admin',
  },
  {
    id: '2',
    email: 'test@example.com',
    user: 'testuser',
    password: '123456',
    company: 'Ryanair',
  },
  {
    id: '3',
    email: 'user@demo.com',
    user: 'demo',
    password: 'demo123',
    company: 'S7 Airlines',
  },
  {
    id: '4',
    email: 'jane.doe@mail.com',
    user: 'jane',
    password: 'qwerty',
    company: 'Swiss',
  },
  {
    id: '5',
    email: 'john.smith@mail.com',
    user: 'johnny',
    password: 'letmein',
    company: 'Lufthansa',
  },
  {
    id: '6',
    email: 'dev@company.com',
    user: 'developer',
    password: 'devpass',
    company: 'Turkish Airlines',
  },
];
