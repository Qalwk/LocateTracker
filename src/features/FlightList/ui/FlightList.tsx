import { type Flight, flightsData } from "shared/mocks/FlightsData"
import { FlightCard } from "widgets/FlightCard/ui/FlightCard"
import styles from './FlightList.module.scss'

export function FlightList({ onSelect, selectedFlight }: { onSelect: (flight: Flight) => void, selectedFlight: Flight | null }) {
  return (
    <div className={styles.flightList}>
      {
        flightsData.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            onClick={() => onSelect(flight)}
            active={selectedFlight?.id === flight.id}
          />
        ))
      }
    </div>
  )
}