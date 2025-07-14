import FlightStatus from 'entities/Flight/ui/FlightStatus';

import styles from './FlightDetails.module.scss';

export function FlightDetailsProgress({ progress }: { progress: number }) {
  return (
    <div className={styles.progressBarBlock}>
      <FlightStatus progress={progress} />
    </div>
  );
}
