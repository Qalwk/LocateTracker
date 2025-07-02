import styles from './Flight.module.scss';

export function FlightInfoRow({ leftLabel, leftValue, rightLabel, rightValue }: { leftLabel: string, leftValue: string, rightLabel: string, rightValue: string }) {
  return (
    <div className={styles.infoBox}>
      <div className={styles.scheduleGroup}>
        <span className={styles.scheduleLabel}>{leftLabel}</span>
        <span className={styles.infoValue}>{leftValue}</span>
      </div>
      <div className={styles.scheduleGroup}>
        <span className={styles.scheduleLabel}>{rightLabel}</span>
        <span className={styles.infoValue}>{rightValue}</span>
      </div>
    </div>
  );
} 