import { FlightList } from "features/FlightList";
import { useState } from "react";
import { FlightDetails } from "widgets/FlightDetails";
import { type Flight } from "shared/mocks/FlightsData";
import styles from './HomePage.module.scss';
import { Header } from "widgets/Header";

export function HomePage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  return (
    <div className={styles.homeWrapper}>
      <Header />
      <div className={styles.homePageContainer}>
        <FlightList onSelect={setSelectedFlight} selectedFlight={selectedFlight} />
        <FlightDetails 
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      </div>
    </div>
  );
}