import { FlightAirportInfo } from 'entities/Flight/ui/FlightAirportInfo';

import { type Flight } from 'shared/mocks/FlightsData';

import styles from './FlightDetails.module.scss';

export function FlightDetailsRoute({ flight }: { flight: Flight }) {
  return (
    <div className={styles.routeBlock}>
      <FlightAirportInfo
        iata={flight.from.iata}
        city={flight.from.city}
        utc={flight.from.utc || ''}
      />
      <div className={styles.routeIconBlock}>
        <span className={styles.routeIcon}>✈️</span>
      </div>
      <FlightAirportInfo
        iata={flight.to.iata}
        city={flight.to.city}
        utc={flight.to.utc || ''}
      />
    </div>
  );
}
