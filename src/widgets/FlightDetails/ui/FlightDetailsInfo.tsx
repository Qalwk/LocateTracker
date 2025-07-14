import { FlightInfoRow } from 'entities/Flight/ui/FlightInfoRow';

import { type Flight } from 'shared/mocks/FlightsData';

import styles from './FlightDetails.module.scss';

export function FlightDetailsInfo({ flight }: { flight: Flight }) {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.nameRow}>
        <span className={styles.infoLabel}>Flight information</span>
      </div>
      <div className={styles.infoTech}>
        <span className={styles.infoTechText}>{flight.aircraft}</span>
        <span className={styles.infoTechText}>{flight.to.countryCode}</span>
      </div>
      <FlightInfoRow
        leftLabel="Speed"
        leftValue={flight.speed || ''}
        rightLabel="Altitude"
        rightValue={flight.altitude || ''}
      />
    </div>
  );
}
