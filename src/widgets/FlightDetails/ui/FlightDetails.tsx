import { type Flight } from "shared/mocks/FlightsData"
import { FlightDetailsHeader } from "./FlightDetailsHeader"
import { FlightDetailsRoute } from "./FlightDetailsRoute"
import { FlightDetailsProgress } from "./FlightDetailsProgress"
import { FlightDetailsSchedule } from "./FlightDetailsSchedule"
import { FlightDetailsInfo } from "./FlightDetailsInfo"
import { FlightDetailsActions } from "./FlightDetailsActions"
import styles from './FlightDetails.module.scss'

export function FlightDetails({ flight, onClose }: { flight: Flight | null, onClose: () => void }) {
  if (!flight) return null;
  // Пример вычисления прогресса (можно заменить на реальный расчёт)
  const progress = 40;
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