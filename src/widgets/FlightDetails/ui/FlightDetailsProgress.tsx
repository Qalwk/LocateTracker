import styles from './FlightDetails.module.scss'
import FlightStatus from 'entities/Flight/ui/FlightStatus'

export function FlightDetailsProgress({ progress }: { progress: number }) {
  return (
    <div className={styles.progressBarBlock}>
      <FlightStatus progress={progress} />
    </div>
  )
} 