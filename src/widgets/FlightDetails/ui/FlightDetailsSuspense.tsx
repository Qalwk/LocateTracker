import React, { Suspense } from "react";

import type { Flight } from "shared/mocks/FlightsData";

const LazyFlightDetails = React.lazy(() => import("./FlightDetails"));

type FlightDetailsProps = {
  flight: Flight | null;
  onClose: () => void;
  progress: number;
};

export const FlightDetailsSuspense: React.FC<FlightDetailsProps> = (props) => (
  <Suspense fallback={<div>Загрузка деталей рейса...</div>}>
    <LazyFlightDetails {...props} />
  </Suspense>
);
