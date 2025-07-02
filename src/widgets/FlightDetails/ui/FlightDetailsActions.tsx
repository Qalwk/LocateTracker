import styles from './FlightDetails.module.scss'

export function FlightDetailsActions() {
  return (
    <div className={styles.actionsBlock}>
      <button className={styles.actionButton}>Route</button>
      <button className={styles.actionButton}>Follow</button>
      <button className={styles.actionButton}>Share</button>
      <button className={styles.actionButton}>More</button>
    </div>
  )
} 