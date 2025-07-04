import { FlightList } from "features/FlightList";
import { useState } from "react";
import { FlightDetails } from "widgets/FlightDetails";
import { type Flight } from "shared/mocks/FlightsData";
import styles from './HomePage.module.scss';
import { Header } from "widgets/Header";
import { FlightTabs } from "./FlightTabs";
import { useDispatch, useSelector } from "react-redux";
import { flightsData } from 'shared/mocks/FlightsData';
import { addFavorite, removeFavorite } from "shared/model/favoriteFlightsSlice";

export function HomePage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const favorites = useSelector((state: any) => state.favoriteFlights.ids);
  const dispatch = useDispatch();
  
  const filteredFlights = activeTab === 'all'
    ? flightsData
    : flightsData.filter(flight => favorites.includes(flight.id));

  const handleLikeClick = (flightId: string) => {
    if (favorites.includes(flightId)) {
      dispatch(removeFavorite(flightId));
    } else {
      dispatch(addFavorite(flightId));
    }
  };

  const progressBar = 60
  
  return (
    <div className={styles.homeWrapper}>
      <Header />
      <div className={styles.homePageContainer}>
        <div className={styles.flight}>
          <FlightTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <FlightList 
            flights={filteredFlights}
            onSelect={setSelectedFlight}
            selectedFlight={selectedFlight}
            onLikeClick={handleLikeClick}
            favorites={favorites}
            progress={progressBar}
          />
        </div>
        <FlightDetails 
          progress={progressBar}
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      </div>
    </div>
  );
}