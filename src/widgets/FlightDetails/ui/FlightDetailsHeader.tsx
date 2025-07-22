import { type Flight } from 'shared/mocks/FlightsData';

import styles from './FlightDetails.module.scss';

export function FlightDetailsHeader({
  flight,
  onClose,
}: {
  flight: Flight;
  onClose: () => void;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.airlineMainInfo}>
        <img
          className={styles.airlineImage}
          src={`http://localhost:3001/images/${flight.airlineLogo}`}
          alt={flight.airline}
        />
        <div className={styles.flightNumberBlock}>
          <span className={styles.flightNumber}>{flight.flightNumber}</span>
          <span className={styles.airline}>{flight.airline}</span>
        </div>
      </div>
      <button
        className={styles.closeButton}
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
}
