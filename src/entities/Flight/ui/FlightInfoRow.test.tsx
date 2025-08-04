import { render, screen } from "@testing-library/react";

import FlightInfoRow from "./FlightInfoRow";

test("отображает label и value", () => {
  render(
    <FlightInfoRow
      leftLabel="Рейс"
      leftValue="SU123"
      rightLabel="Время"
      rightValue="10:30"
    />,
  );

  // Проверяем, что оба label присутствуют
  const labels = screen.getAllByText(/Рейс|Время/);
  expect(labels).toHaveLength(2);

  // Проверяем, что оба value присутствуют
  expect(screen.getByText("SU123")).toBeInTheDocument();
  expect(screen.getByText("10:30")).toBeInTheDocument();
});
