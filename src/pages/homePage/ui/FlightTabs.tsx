import clsx from 'clsx';

import { useNavigate } from 'react-router';

import styles from './HomePage.module.scss';

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
        className={clsx(styles.buttonFilter, {
          [styles.buttonFilterActive]: !isFavorite,
          [styles.buttonText]: !isFavorite,
        })}
      >
        All
      </button>
      <button
        onClick={handleFavoritesClick}
        className={clsx(styles.buttonFilter, {
          [styles.buttonFilterActive]: isFavorite,
          [styles.buttonText]: isFavorite,
        })}
      >
        Favorites
      </button>
    </div>
  );
}
