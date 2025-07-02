import { useNavigate } from "react-router";
import { type Flight } from "shared/mocks/FlightsData"
import styles from './FlightCard.module.scss'
import clsx from "clsx";

export function FlightCard({ flight, onClick, active = false }
  : { 
      flight: Flight, 
      onClick?: (flight: Flight) => void, 
      active?: boolean 
    }) {

  const progress = 40; // или получить из пропсов/стейта
  const navigate = useNavigate();

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, '-');
  }

  const handleClick = () => {
    const airline = slugify(flight.airline);
    const from = slugify(flight.from.city);
    const to = slugify(flight.to.city);
    navigate(`/${airline}/${from}-${to}`);
    if (onClick) onClick(flight);
  };

  return (
    <div 
      onClick={handleClick}
      className={clsx(styles.flightCard, { [styles.active]: active })}
    >
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