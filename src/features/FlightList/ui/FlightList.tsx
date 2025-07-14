import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FlightCard } from 'entities/FlightCard/ui/FlightCard';

import { type Flight } from 'shared/mocks/FlightsData';

import styles from './FlightList.module.scss';

interface FlightListProps {
  flights: Flight[];
  onSelect: (flight: Flight) => void;
  selectedFlight: Flight | null;
  progress: number;
  favorites: string[];
  onLikeClick: (flightId: string) => void;
}

export function FlightList({
  flights,
  onSelect,
  selectedFlight,
  progress,
  favorites,
  onLikeClick,
}: FlightListProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.flightList}>
      {isLoading ? (
        <Skeleton
          count={10}
          className={styles.skeleton}
        />
      ) : (
        flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onClick={() => onSelect(flight)}
            active={selectedFlight?.id === flight.id}
            progress={progress}
            isFavorite={favorites.includes(flight.id)}
            onLikeClick={() => onLikeClick(flight.id)}
          />
        ))
      )}
    </div>
  );
}
