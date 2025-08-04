import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router";

import type { Flight } from "shared/mocks/FlightsData";

import { FlightCard } from "./FlightCard";

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

test("отображает переданные данные рейса", () => {
  render(
    <MemoryRouter>
      <FlightCard
        flight={mockFlight}
        isFavorite={false}
        onLikeClick={() => {}}
        progress={60}
      />
    </MemoryRouter>,
  );

  // Проверяем alt атрибут изображения авиакомпании
  expect(screen.getByAltText("airlineLogo")).toBeInTheDocument();
  expect(screen.getByText("Moscow")).toBeInTheDocument();
  expect(screen.getByText("Dubai")).toBeInTheDocument();
  expect(screen.getByText("S7129")).toBeInTheDocument();
  expect(screen.getByText("DME")).toBeInTheDocument();
  expect(screen.getByText("DXB")).toBeInTheDocument();
});

test("вызывает onLikeClick при клике на кнопку лайка", async () => {
  const onLikeClick = jest.fn();

  render(
    <MemoryRouter>
      <FlightCard
        flight={mockFlight}
        isFavorite={false}
        onLikeClick={onLikeClick}
        progress={60}
      />
    </MemoryRouter>,
  );

  const likeButton = screen.getByRole("button");
  await userEvent.click(likeButton);

  expect(onLikeClick).toHaveBeenCalledTimes(1);
});

test("отображает активное состояние лайка", () => {
  render(
    <MemoryRouter>
      <FlightCard
        flight={mockFlight}
        isFavorite={true}
        onLikeClick={() => {}}
        progress={60}
      />
    </MemoryRouter>,
  );

  const likeButton = screen.getByRole("button");
  expect(likeButton).toHaveClass("btnLikeActive");
});

test("вызывает onClick при клике на карточку", async () => {
  const onClick = jest.fn();

  render(
    <MemoryRouter>
      <FlightCard
        flight={mockFlight}
        onClick={onClick}
        isFavorite={false}
        onLikeClick={() => {}}
        progress={60}
      />
    </MemoryRouter>,
  );

  const card = screen.getByText("Moscow").closest("div");
  await userEvent.click(card!);

  expect(onClick).toHaveBeenCalledWith(mockFlight);
});

test("соответствует снепшоту", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <FlightCard
        flight={mockFlight}
        isFavorite={false}
        onLikeClick={() => {}}
        progress={60}
      />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
