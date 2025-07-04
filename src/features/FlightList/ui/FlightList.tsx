import { type Flight } from "shared/mocks/FlightsData"
import { FlightCard } from "widgets/FlightCard/ui/FlightCard"
import styles from './FlightList.module.scss'

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
  return (
    <div className={styles.flightList}>
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          onClick={() => onSelect(flight)}
          active={selectedFlight?.id === flight.id}
          progress={progress}
          isFavorite={favorites.includes(flight.id)}
          onLikeClick={() => onLikeClick(flight.id)}
        />
      ))}
    </div>
  )
}