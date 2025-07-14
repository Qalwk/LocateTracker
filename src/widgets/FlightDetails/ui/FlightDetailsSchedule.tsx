import { FlightScheduleRow } from 'entities/Flight/ui/FlightScheduleRow';

import { type Flight } from 'shared/mocks/FlightsData';

import styles from './FlightDetails.module.scss';

export function FlightDetailsSchedule({ flight }: { flight: Flight }) {
  return (
    <div className={styles.scheduleBlock}>
      <FlightScheduleRow
        leftLabel="Scheduled"
        leftValue={flight.from.scheduled || ''}
        rightLabel="Actual"
        rightValue={flight.from.actual || ''}
      />
      <FlightScheduleRow
        leftLabel="Scheduled"
        leftValue={flight.to.scheduled || ''}
        rightLabel="Estimated"
        rightValue={flight.to.estimated || ''}
      />
    </div>
  );
}
