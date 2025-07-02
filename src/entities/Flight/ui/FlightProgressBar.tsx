import styles from './Flight.module.scss';

export function FlightProgressBar({ progress }: { progress: number }) {
  return (
    <div className={styles.flightProgressBar}>
      <div className={styles.flightProgressTrack}>
        <div
          className={styles.flightProgressPassed}
          style={{ width: `${progress}%` }}
        />
        <div
          className={styles.flightProgressPlane}
          style={{ left: `${progress}%` }}
        >
          ✈️
        </div>
      </div>
    </div>
  );
} 