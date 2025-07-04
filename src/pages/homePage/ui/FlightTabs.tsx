import clsx from 'clsx';
import styles from './HomePage.module.scss';

interface FlightTabsProps {
  activeTab: 'all' | 'favorites';
  setActiveTab: (tab: 'all' | 'favorites') => void;
}

export function FlightTabs({ activeTab, setActiveTab }: FlightTabsProps) {

  const handleAllClick = () => setActiveTab('all');
  const handleFavoritesClick = () => setActiveTab('favorites');

  return (
    <div className={styles.btnWrap}>
      <button 
        onClick={handleAllClick}
        className={clsx(styles.buttonFilter, { [styles.buttonFilterActive]: activeTab === 'all' })}
      >
        All
      </button>
      <button 
        onClick={handleFavoritesClick}
        className={clsx(styles.buttonFilter, { [styles.buttonFilterActive]: activeTab === 'favorites' })}
      >
        Favorites
      </button>
    </div>
  )
}