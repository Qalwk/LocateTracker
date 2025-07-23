import { Header } from 'widgets/Header';

import styles from './FlightTablePage.module.scss';
import FlightTable from 'entities/Flight';

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
