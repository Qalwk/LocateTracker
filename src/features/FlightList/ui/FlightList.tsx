import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FlightCard } from 'entities/FlightCard/ui/FlightCard';

import { type Flight } from 'shared/mocks/FlightsData';

import { useRef, useEffect } from 'react';

import styles from './FlightList.module.scss';

interface FlightListProps {
  flights: Flight[];
  onSelect: (flight: Flight) => void;
  selectedFlight: Flight | null;
  progress: number;
  favorites: string[];
  onLikeClick: (flightId: string) => void;
  isLoading: boolean;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function FlightList({
  flights,
  onSelect,
  selectedFlight,
  progress,
  favorites,
  onLikeClick,
  isLoading,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage
}: FlightListProps) {

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    console.log('loadMoreRef', loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [onLoadMore, hasNextPage, isFetchingNextPage]);

  return (
    <div className={styles.flightList}>
      {isLoading ? (
        <Skeleton
          count={10}
          className={styles.skeleton}
        />
      ) : (
        flights.map((flight, idx) => {
          const isTrigger = hasNextPage && idx === flights.length - 5;
          return (
            <FlightCard
              key={flight.id}
              flight={flight}
              onClick={() => onSelect(flight)}
              active={selectedFlight?.id === flight.id}
              progress={progress}
              isFavorite={favorites.includes(flight.id)}
              onLikeClick={() => onLikeClick(flight.id)}
              ref={isTrigger ? loadMoreRef : undefined}
            />
          );
        })
      )}
      {isFetchingNextPage && (
        <div style={{ textAlign: 'center', margin: 10 }}>Загрузка...</div>
      )}
    </div>
  );
}
