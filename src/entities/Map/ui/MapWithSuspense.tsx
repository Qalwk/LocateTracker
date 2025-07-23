import React, { Suspense } from 'react';

const LazyMap = React.lazy(() => import('./Map'));

export const MapWithSuspense: React.FC = (props) => (
  <Suspense fallback={<div>Загрузка карты...</div>}>
    <LazyMap {...props} />
  </Suspense>
);