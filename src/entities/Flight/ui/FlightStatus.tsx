import styles from './Flight.module.scss';

interface FlightStatusProps {
  progress: number;
}

export function FlightStatus({ progress }: FlightStatusProps) {
  return (
    <div className={styles.routeLine}>
      <div
        className={styles.routeProgress}
        style={{ width: `${progress}%` }}
      />
      <span
        className={styles.planeIcon}
        style={{ left: `${progress}%` }}
      >
        ✈️
      </span>
    </div>
  );
}

export default FlightStatus;
