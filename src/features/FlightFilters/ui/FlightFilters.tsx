import styles from './FlightFilters.module.scss';

interface FlightFiltersProps {
  flightId: string;
  setFlightId: (value: string) => void;
  flightCompany: string;
  setFlightCompany: (value: string) => void;
  flightFrom: string;
  setFlightFrom: (value: string) => void;
  flightTo: string;
  setFlightTo: (value: string) => void;
}

export function FlightFilters({
  flightId,
  setFlightId,
  flightCompany,
  setFlightCompany,
  flightFrom,
  setFlightFrom,
  flightTo,
  setFlightTo,
}: FlightFiltersProps) {
  return (
    <div className={styles.filtersWrap}>
      <div className={styles.filter}>
        <label htmlFor="flight-id">ID</label>
        <input
          id="flight-id"
          type="text"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="flight-company">Comp.</label>
        <input
          id="flight-company"
          type="text"
          value={flightCompany}
          onChange={(e) => setFlightCompany(e.target.value)}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="flight-from">From</label>
        <input
          id="flight-from"
          type="text"
          value={flightFrom}
          onChange={(e) => setFlightFrom(e.target.value)}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="flight-to">To</label>
        <input
          id="flight-to"
          type="text"
          value={flightTo}
          onChange={(e) => setFlightTo(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FlightFilters;
