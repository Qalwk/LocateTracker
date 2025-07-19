import { useState } from 'react';

import styles from './Map.module.scss';

// Тип результата поиска Nominatim
export interface NominatimResult {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
}

// Тип пропса onSelect
interface SearchBoxProps {
  onSelect: (coords: [number, number], item: NominatimResult) => void;
  setCenter: (value: [number, number]) => void;
}

export function SearchBox({ onSelect, setCenter }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const res = await fetch(
      // `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      `https://api.allorigins.win/get?url=${encodeURIComponent('https://nominatim.openstreetmap.org/search?format=json&q=' + query)}`,
    );
    const data = await res.json();
    const results = JSON.parse(data.contents);
    setResults(results);
  };

  return (
    <div className={styles.SearchBox}>
      <form
        className={styles.InputBtn}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Город или страна"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: 200, padding: 4 }}
        />
        <button type="submit">Поиск</button>
      </form>
      <ul className={styles.ResultsMap}>
        {results.map((item) => (
          <li
            key={item.place_id}
            style={{ cursor: 'pointer', padding: 4 }}
            onClick={() => {
              onSelect([parseFloat(item.lon), parseFloat(item.lat)], item);
              setResults([]);
              console.log(results);
              // console.log(item.lon, item.lat)
              setCenter([parseFloat(item.lon), parseFloat(item.lat)]);
            }}
          >
            {item.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
