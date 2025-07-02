import { FlightProgressBar } from 'entities/Flight/ui/FlightProgressBar'
import styles from './FlightDetails.module.scss'

export function FlightDetailsProgress({ progress }: { progress: number }) {
  return (
    <div className={styles.progressBarBlock}>
      <FlightProgressBar progress={progress} />
    </div>
  )
} 