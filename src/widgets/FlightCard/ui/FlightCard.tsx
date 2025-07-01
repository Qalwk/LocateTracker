import { type Flight } from "shared/mocks/FlightsData"
import styles from './FlightCard.module.scss'

export function FlightCard({ flight }: { flight: Flight }) {
  const progress = 40; // или получить из пропсов/стейта

  return (
    <div className={styles.flightCard}>
      <div className={styles.header}>
        <div className={styles.airline}>
          <div className={styles.airlineLogo}>
              <img src={flight.airlineLogo} alt="airlineLogo" />
          </div>
          <div className={styles.flightNumber}>{flight.flightNumber}</div>
        </div>
        <div className={styles.codes}>
          <span className={styles.code}>{flight.codes[0]}</span>
          <span className={styles.code}>{flight.codes[1]}</span>
        </div>
      </div>
      <div className={styles.airports}>
        <div className={`${styles.airport} ${styles.from}`}>
          <span className={styles.city}>{flight.from.city}</span>
          <span className={styles.iata}>{flight.from.iata}</span>
        </div>
        <div className={styles.routeLine}>
          <div className={styles.routeProgress} style={{ width: `${progress}%` }} />
          <span className={styles.planeIcon} style={{ left: `${progress}%` }}>✈️</span>
        </div>
        <div className={`${styles.airport} ${styles.to}`}>
          <span className={styles.city}>{flight.to.city}</span>
          <span className={styles.iata}>{flight.to.iata}</span>
        </div>
      </div>
    </div>
  )
}