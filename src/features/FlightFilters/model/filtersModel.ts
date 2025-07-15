import { createEvent, createStore, combine } from 'effector';

// 1. Событие для изменения фильтров
export const setFilters = createEvent<Partial<{
  flightId: string;
  flightCompany: string;
  flightFrom: string;
  flightTo: string;
}>>();

// 2. Store для всех фильтров (один объект)
export const $filters = createStore({
  flightId: '',
  flightCompany: '',
  flightFrom: '',
  flightTo: '',
}).on(setFilters, (state, payload) => ({ ...state, ...payload }));

// 3. Store с массивом рейсов (теперь обновляется через setFlights)
export const setFlights = createEvent<any[]>();
export const $flights = createStore<any[]>([]).on(setFlights, (_, flights) => flights);

// 4. Комбинированный store для фильтрации
export const $filteredFlights = combine(
  $flights,
  $filters,
  (flights, filters) =>
    flights.filter((flight) => {
      const matchId = filters.flightId
        ? flight.id.toLowerCase().includes(filters.flightId.toLowerCase())
        : true;
      const matchCompany = filters.flightCompany
        ? flight.airline.toLowerCase().includes(filters.flightCompany.toLowerCase())
        : true;
      const matchFrom = filters.flightFrom
        ? flight.from.city.toLowerCase().includes(filters.flightFrom.toLowerCase()) ||
          flight.from.iata.toLowerCase().includes(filters.flightFrom.toLowerCase())
        : true;
      const matchTo = filters.flightTo
        ? flight.to.city.toLowerCase().includes(filters.flightTo.toLowerCase()) ||
          flight.to.iata.toLowerCase().includes(filters.flightTo.toLowerCase())
        : true;
      return matchId && matchCompany && matchFrom && matchTo;
    })
);