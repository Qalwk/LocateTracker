import styles from './Flight.module.scss';

export function FlightScheduleRow({ leftLabel, leftValue, rightLabel, rightValue }: { leftLabel: string, leftValue: string, rightLabel: string, rightValue: string }) {
  return (
    <div className={styles.scheduleRow}>
      <div className={styles.scheduleGroup}>
        <span className={styles.scheduleLabel}>{leftLabel}</span>
        <span className={styles.scheduleValue}>{leftValue}</span>
      </div>
      <div className={styles.scheduleGroup}>
        <span className={styles.scheduleLabel}>{rightLabel}</span>
        <span className={styles.scheduleValue}>{rightValue}</span>
      </div>
    </div>
  );
} 