import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlightFilters from './FlightFilters';
import React from 'react';

test('input для ID доступен и работает', async () => {
  function Wrapper() {
    const [flightId, setFlightId] = React.useState('');
    return (
      <FlightFilters
        flightId={flightId}
        setFlightId={setFlightId}
        flightCompany=""
        setFlightCompany={() => {}}
        flightFrom=""
        setFlightFrom={() => {}}
        flightTo=""
        setFlightTo={() => {}}
      />
    );
  }

  render(<Wrapper />);
  const input = screen.getByLabelText('ID');
  expect(input).toBeInTheDocument();

  // Проверяем ввод значения
  await userEvent.type(input, '123');
  expect(input).toHaveValue('123');

  // Проверяем очистку
  await userEvent.clear(input);
  expect(input).toHaveValue('');
});