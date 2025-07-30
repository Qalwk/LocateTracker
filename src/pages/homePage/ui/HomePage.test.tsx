import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './HomePage';
import { store } from '../../../app/store';
import { AuthProvider } from '../../../shared/model/auth/context/AuthProvider';

// Мокаем API
jest.mock('shared/api/axiosInstance', () => ({
  fetchFlights: jest.fn(() => Promise.resolve([
    {
      id: 'S7129',
      airline: 'S7 Airlines',
      airlineLogo: 'images.png',
      flightNumber: 'S7129',
      codes: ['88020', 'RA-73420'],
      from: {
        city: 'Moscow',
        iata: 'DME',
        utc: 'UTC+3',
        distance: 3200,
        duration: '4h 30m',
        scheduled: '22:00',
        actual: '22:10',
        countryCode: 'RU'
      },
      to: {
        city: 'Dubai',
        iata: 'DXB',
        utc: 'UTC+4',
        distance: 3200,
        duration: '4h 30m',
        scheduled: '02:30',
        estimated: '02:40',
        countryCode: 'AE'
      },
      aircraft: 'Airbus A321neo',
      speed: '860 km/h',
      altitude: '11 200 m'
    },
    {
      id: 'TK143',
      airline: 'Turkish Airlines',
      airlineLogo: 'turkish-logo.png',
      flightNumber: 'TK143',
      codes: ['93247', 'TC-JFP'],
      from: {
        city: 'Istanbul',
        iata: 'IST',
        utc: 'UTC+3',
        distance: 7420,
        duration: '9h 45m',
        scheduled: '07:10',
        actual: '07:18',
        countryCode: 'TR'
      },
      to: {
        city: 'Beijing',
        iata: 'PEK',
        utc: 'UTC+8',
        distance: 7420,
        duration: '9h 45m',
        scheduled: '23:55',
        estimated: '00:05',
        countryCode: 'CN'
      },
      aircraft: 'Boeing 777-300ER',
      speed: '910 km/h',
      altitude: '12 200 m'
    }
  ]))
}));

// Мокаем auth API
jest.mock('features/auth/api/refresh', () => ({
  refreshRequest: jest.fn(() => Promise.resolve({ accessToken: 'mock-token' }))
}));

jest.mock('features/auth/api/logout', () => ({
  logoutRequest: jest.fn(() => Promise.resolve())
}));

// Мокаем localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Создаём QueryClient для тестов
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function renderWithProviders(component: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  
  return render(
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <MemoryRouter>
          <AuthProvider>
            {component}
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

test('отображает список рейсов и фильтры', async () => {
  renderWithProviders(<HomePage />);
  
  // Проверяем, что фильтры отображаются
  expect(screen.getByLabelText('ID')).toBeInTheDocument();
  expect(screen.getByLabelText('Comp.')).toBeInTheDocument();
  expect(screen.getByLabelText('From')).toBeInTheDocument();
  expect(screen.getByLabelText('To')).toBeInTheDocument();
  
  // Ждём загрузки рейсов
  expect(await screen.findByText('Moscow')).toBeInTheDocument();
  expect(screen.getByText('Istanbul')).toBeInTheDocument();
});

test('фильтры влияют на список рейсов', async () => {
  renderWithProviders(<HomePage />);
  
  // Ждём загрузки рейсов
  await screen.findByText('Moscow');
  
  // Вводим фильтр по ID
  const idInput = screen.getByLabelText('ID');
  await userEvent.type(idInput, 'S7129');
  
  // Проверяем, что отображается только один рейс
  expect(screen.getByText('Moscow')).toBeInTheDocument();
  expect(screen.queryByText('Istanbul')).not.toBeInTheDocument();
  
  // Очищаем фильтр
  await userEvent.clear(idInput);
  
  // Проверяем, что снова отображаются оба рейса
  expect(screen.getByText('Moscow')).toBeInTheDocument();
  expect(screen.getByText('Istanbul')).toBeInTheDocument();
});

test('фильтр по авиакомпании работает', async () => {
  renderWithProviders(<HomePage />);
  
  // Ждём загрузки рейсов
  await screen.findByText('Moscow');
  
  // Вводим фильтр по авиакомпании
  const companyInput = screen.getByLabelText('Comp.');
  await userEvent.type(companyInput, 'Turkish');
  
  // Проверяем, что отображается только Turkish Airlines
  expect(screen.queryByText('Moscow')).not.toBeInTheDocument();
  expect(screen.getByText('Istanbul')).toBeInTheDocument();
});

test('фильтр по городу отправления работает', async () => {
  renderWithProviders(<HomePage />);
  
  // Ждём загрузки рейсов
  await screen.findByText('Moscow');
  
  // Вводим фильтр по городу отправления
  const fromInput = screen.getByLabelText('From');
  await userEvent.type(fromInput, 'Moscow');
  
  // Проверяем, что отображается только рейс из Москвы
  expect(screen.getByText('Moscow')).toBeInTheDocument();
  expect(screen.queryByText('Istanbul')).not.toBeInTheDocument();
});

test('фильтр по городу назначения работает', async () => {
  renderWithProviders(<HomePage />);
  
  // Ждём загрузки рейсов
  await screen.findByText('Moscow');
  
  // Вводим фильтр по городу назначения
  const toInput = screen.getByLabelText('To');
  await userEvent.type(toInput, 'Beijing');
  
  // Проверяем, что отображается только рейс в Пекин
  expect(screen.queryByText('Moscow')).not.toBeInTheDocument();
  expect(screen.getByText('Istanbul')).toBeInTheDocument();
});
