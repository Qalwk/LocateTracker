import styles from './Flight.module.scss';

export function FlightAirportInfo({
  iata,
  city,
  utc,
}: {
  iata: string;
  city: string;
  utc: string;
}) {
  return (
    <div className={styles.airportInfo}>
      <span className={styles.airportCode}>{iata}</span>
      <span className={styles.airportCity}>{city}</span>
      <span className={styles.airportUtc}>{utc}</span>
    </div>
  );
}
