import { FlightList } from "features/FlightList";
import { useEffect, useState, useMemo } from "react";
import { FlightDetails } from "widgets/FlightDetails";
import { type Flight } from "shared/mocks/FlightsData";
import styles from './HomePage.module.scss';
import { Header } from "widgets/Header";
import { FlightTabs } from "./FlightTabs";
import { useDispatch, useSelector } from "react-redux";
import { flightsData } from 'shared/mocks/FlightsData';
import { addFavorite, removeFavorite } from "shared/model/favoriteFlightsSlice";
import type { RootState } from "app/store";
import { useLocation } from "react-router";
import { FlightFilters } from "./FlightFilters";
import { useIsMobile } from "shared/hooks/useIsMobile";
import clsx from "clsx";

export function HomePage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

  const [flightId, setFlightId] = useState<string>('');
  const [flightCompany, setFlightCompany] = useState<string>('');
  const [flightFrom, setFlightFrom] = useState<string>('');
  const [flightTo, setFlightTo] = useState<string>('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/favorites') ) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [location])

  const favorites = useSelector((state: RootState) => state.favoriteFlights.ids);
  const dispatch = useDispatch();
  
  const baseFlights = isFavorite === true
    ? flightsData.filter(flight => favorites.includes(flight.id))
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
        ? flight.from.city.toLowerCase().includes(flightFrom.toLowerCase()) 
        || flight.from.iata.toLowerCase().includes(flightFrom.toLowerCase())
        : true;
      const matchTo = flightTo
        ? flight.to.city.toLowerCase().includes(flightTo.toLowerCase()) 
        || flight.to.iata.toLowerCase().includes(flightTo.toLowerCase())
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

  const progressBar = 60

  const isMobile = useIsMobile();
  
  return (
    <div className={styles.homeWrapper}>
      <Header />
      <div className={styles.homePageContainer}>
        <div className={clsx(styles.flight, { [styles.hide]: isMobile && selectedFlight })}>
          <div className={styles.flightParams}>
            <FlightTabs 
              isFavorite={isFavorite}
            />
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
          <FlightList 
            flights={filteredFlights}
            onSelect={setSelectedFlight}
            selectedFlight={selectedFlight}
            onLikeClick={handleLikeClick}
            favorites={favorites}
            progress={progressBar}
          />
        </div>
        <FlightDetails 
          progress={progressBar}
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      </div>
    </div>
  );
}