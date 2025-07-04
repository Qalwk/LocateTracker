import { type Flight } from "shared/mocks/FlightsData"
import { FlightDetailsHeader } from "./FlightDetailsHeader"
import { FlightDetailsRoute } from "./FlightDetailsRoute"
import { FlightDetailsProgress } from "./FlightDetailsProgress"
import { FlightDetailsSchedule } from "./FlightDetailsSchedule"
import { FlightDetailsInfo } from "./FlightDetailsInfo"
import { FlightDetailsActions } from "./FlightDetailsActions"
import styles from './FlightDetails.module.scss'

export function FlightDetails({ flight, onClose, progress }: 
  { flight: Flight | null, 
    onClose: () => void, 
    progress:number 
  }) {
    
  if (!flight) return null;
  return (
    <div className={styles.flightDetails}>
      <FlightDetailsHeader flight={flight} onClose={onClose} />
      <div className={styles.flightStatic}>
        <FlightDetailsRoute flight={flight} />
        <FlightDetailsProgress progress={progress} />
        <FlightDetailsSchedule flight={flight} />
      </div>
      <FlightDetailsInfo flight={flight} />
      <FlightDetailsActions />
    </div>
  )
}