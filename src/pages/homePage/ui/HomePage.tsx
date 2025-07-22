import type { RootState } from 'app/store';
import clsx from 'clsx';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { FlightList } from 'features/FlightList';

import { FlightDetails } from 'widgets/FlightDetails';
import { Header } from 'widgets/Header';

import {
  addFavorite,
  removeFavorite,
} from 'entities/Flight/model/favoriteFlightsSlice';
import { Map } from 'entities/Map/ui/Map';

import { type Flight } from 'shared/mocks/FlightsData';

import { useQuery } from '@tanstack/react-query';
import { fetchFlights } from 'shared/api/axiosInstance';

import { FlightFilters } from 'features/FlightFilters/ui/FlightFilters';
import { FlightTabs } from './FlightTabs';
import styles from './HomePage.module.scss';

export function HomePage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

  const [flightId, setFlightId] = useState('');
  const [flightCompany, setFlightCompany] = useState('');
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');

  const location = useLocation();

  const { data: flightsData = [], isLoading, isError } = useQuery<Flight[]>({
    queryKey: ['flights'],
    queryFn: fetchFlights,
  });

  useEffect(() => {
    if (location.pathname.includes('/favorites')) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [location]);

  const favorites = useSelector(
    (state: RootState) => state.favoriteFlights.ids,
  );
  const dispatch = useDispatch();

  const baseFlights = !!isFavorite
    ? flightsData.filter((flight) => favorites.includes(flight.id))
    : flightsData;

  const filteredFlights = useMemo(() => {
    return baseFlights.filter((flight) => {
      const matchId = flightId
        ? flight.id.toLowerCase().includes(flightId.toLowerCase())
        : true;
      const matchCompany = flightCompany
        ? flight.airline.toLowerCase().includes(flightCompany.toLowerCase())
        : true;
      const matchFrom = flightFrom
        ? flight.from.city.toLowerCase().includes(flightFrom.toLowerCase()) ||
          flight.from.iata.toLowerCase().includes(flightFrom.toLowerCase())
        : true;
      const matchTo = flightTo
        ? flight.to.city.toLowerCase().includes(flightTo.toLowerCase()) ||
          flight.to.iata.toLowerCase().includes(flightTo.toLowerCase())
        : true;
      return matchId && matchCompany && matchFrom && matchTo;
    });
  }, [baseFlights, flightId, flightCompany, flightFrom, flightTo]);

  const handleLikeClick = (flightId: string) => {
    if (favorites.includes(flightId)) {
      dispatch(removeFavorite(flightId));
    } else {
      dispatch(addFavorite(flightId));
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteFlights', JSON.stringify(favorites));
  }, [favorites]);

  const progressBar = 60;

  return (
    <div className={styles.homeWrapper}>
      <Header />
      <div className={styles.homePageContainer}>
        <div className={clsx(styles.flight, { [styles.hide]: selectedFlight })}>
          <div className={styles.flightParams}>
            <FlightTabs isFavorite={isFavorite} />
            <FlightFilters
              flightId={flightId}
              setFlightId={setFlightId}
              flightCompany={flightCompany}
              setFlightCompany={setFlightCompany}
              flightFrom={flightFrom}
              setFlightFrom={setFlightFrom}
              flightTo={flightTo}
              setFlightTo={setFlightTo}
            />
          </div>
          {isError && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>
              Не удалось загрузить список рейсов. Попробуйте позже.
            </div>
          )}
          <FlightList
            flights={filteredFlights}
            onSelect={setSelectedFlight}
            selectedFlight={selectedFlight}
            onLikeClick={handleLikeClick}
            favorites={favorites}
            progress={progressBar}
            isLoading={isLoading}
          />
        </div>
        <FlightDetails
          progress={progressBar}
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      </div>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </div>
  );
}
