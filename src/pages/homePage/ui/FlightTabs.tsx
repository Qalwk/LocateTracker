import clsx from 'clsx';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router';

interface FlightTabsProps {
  isFavorite: boolean | null;
}

export function FlightTabs({ isFavorite }: FlightTabsProps) {

  const navigate = useNavigate();

  const handleAllClick = () => navigate('/');
  const handleFavoritesClick = () => navigate('/favorites');

  return (
    <div className={styles.btnWrap}>
      <button 
        onClick={handleAllClick}
        className={clsx(
          styles.buttonFilter, 
          { 
            [styles.buttonFilterActive]: !isFavorite,
            [styles.buttonText]: !isFavorite
          }
        )}
      >
        All
      </button>
      <button 
        onClick={handleFavoritesClick}
        className={clsx(
          styles.buttonFilter, 
          { 
            [styles.buttonFilterActive]: isFavorite,
            [styles.buttonText]: isFavorite
          }
        )}
      >
        Favorites
      </button>
    </div>
  )
}