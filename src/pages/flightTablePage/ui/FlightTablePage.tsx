import { Header } from 'widgets/Header';

import { FlightTable } from 'entities/Flight/ui/FlightTable';

import styles from './FlightTablePage.module.scss';

export function FlightTablePage() {
  return (
    <div>
      <Header />
      <div className={styles.tableContainer}>
        <FlightTable />
      </div>
    </div>
  );
}
