import { AnimatePresence, m } from 'framer-motion';

import { type Flight } from 'shared/mocks/FlightsData';

import styles from './FlightDetails.module.scss';
import { FlightDetailsActions } from './FlightDetailsActions';
import { FlightDetailsHeader } from './FlightDetailsHeader';
import { FlightDetailsInfo } from './FlightDetailsInfo';
import { FlightDetailsProgress } from './FlightDetailsProgress';
import { FlightDetailsRoute } from './FlightDetailsRoute';
import { FlightDetailsSchedule } from './FlightDetailsSchedule';

export function FlightDetails({
  flight,
  onClose,
  progress,
}: {
  flight: Flight | null;
  onClose: () => void;
  progress: number;
}) {
  if (!flight) return null;
  return (
    <AnimatePresence>
      <m.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{
          type: 'tween',
          duration: 0.4,
          ease: [0.3, 0.4, 0.45, 0.9],
        }}
        className={styles.flightDetails}
      >
        <FlightDetailsHeader
          flight={flight}
          onClose={onClose}
        />
        <div className={styles.flightStatic}>
          <FlightDetailsRoute flight={flight} />
          <FlightDetailsProgress progress={progress} />
          <FlightDetailsSchedule flight={flight} />
        </div>
        <FlightDetailsInfo flight={flight} />
        <FlightDetailsActions />
      </m.div>
    </AnimatePresence>
  );
}
