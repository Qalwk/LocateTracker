import { flightsData } from "shared/mocks/FlightsData"
import { FlightCard } from "widgets/FlightCard/ui/FlightCard"
import styles from './FlightList.module.scss'

export function FlightList() {
  return (
    <div className={styles.flightList}>
      {
        flightsData.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      }
    </div>
  )
}