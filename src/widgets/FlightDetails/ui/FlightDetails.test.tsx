import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import { MemoryRouter } from "react-router";

import FlightDetails from "widgets/FlightDetails/ui/FlightDetails";

import { FlightCard } from "entities/FlightCard/ui/FlightCard";

import type { Flight } from "shared/mocks/FlightsData";

const mockFlight: Flight = {
  id: "S7129",
  airline: "S7 Airlines",
  airlineLogo: "images.png",
  flightNumber: "S7129",
  codes: ["88020", "RA-73420"],
  from: {
    city: "Moscow",
    iata: "DME",
    utc: "UTC+3",
    distance: 3200,
    duration: "4h 30m",
    scheduled: "22:00",
    actual: "22:10",
    countryCode: "RU",
  },
  to: {
    city: "Dubai",
    iata: "DXB",
    utc: "UTC+4",
    distance: 3200,
    duration: "4h 30m",
    scheduled: "02:30",
    estimated: "02:40",
    countryCode: "AE",
  },
  aircraft: "Airbus A321neo",
  speed: "860 km/h",
  altitude: "11 200 m",
};

function Wrapper() {
  const [selected, setSelected] = React.useState<Flight | null>(null);
  return (
    <MemoryRouter>
      <FlightCard
        flight={mockFlight}
        onClick={setSelected}
        isFavorite={false}
        onLikeClick={() => {}}
        progress={60}
      />
      {selected && (
        <FlightDetails
          flight={selected}
          onClose={() => setSelected(null)}
          progress={60}
        />
      )}
    </MemoryRouter>
  );
}

test("открывает и закрывает детали рейса по клику", async () => {
  render(<Wrapper />);

  // Проверяем, что карточка отображается
  expect(screen.getByText("Moscow")).toBeInTheDocument();

  // Кликаем по карточке для открытия деталей
  const card = screen.getByText("Moscow");
  await userEvent.click(card);

  // Проверяем, что детали открылись (замени 'Детали рейса' на реальный текст из FlightDetails)
  expect(screen.getByText("Airbus A321neo")).toBeInTheDocument();

  // Кликаем по кнопке закрытия
  const closeButton = screen.getByRole("button", { name: /X/i });
  await userEvent.click(closeButton);

  // Проверяем, что детали закрылись
  expect(screen.queryByText("Airbus A321neo")).not.toBeInTheDocument();
});
