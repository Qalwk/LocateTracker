import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useEffect, useRef, useState } from 'react';

import styles from './Map.module.scss';
import { SearchBox } from './SearchBox';

export function Map() {
  const mapContainer = useRef(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [center, setCenter] = useState<[number, number]>([37.6173, 55.7558]); // Москва

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        'https://api.maptiler.com/maps/outdoor-v2/style.json?key=ktExOhjs6KluWthAGPqe',
      center: center,
      zoom: 9,
    });

    return () => map.remove();
  }, [center]);

  const handleSelect = (coords: [number, number]) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: coords, zoom: 10 });
      // new maplibregl.Marker().setLngLat(coords).addTo(mapRef.current);
    }
  };

  return (
    <div className={styles.Map}>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '100%' }}
      />
      <SearchBox
        setCenter={setCenter}
        onSelect={handleSelect}
      />
    </div>
  );
}
