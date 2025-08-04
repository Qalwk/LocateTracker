import { render } from "@testing-library/react";

import FlightStatus from "./FlightStatus";

test("отрисовывает прогресс и иконку самолёта в правильной позиции", () => {
  const { container } = render(<FlightStatus progress={60} />);

  // Проверяем ширину прогресс-бара
  const progressBar = container.querySelector(`.${"routeProgress"}`);
  expect(progressBar).toHaveStyle("width: 60%");

  // Проверяем позицию иконки самолёта
  const planeIcon = container.querySelector(`.${"planeIcon"}`);
  expect(planeIcon).toHaveStyle("left: 60%");
});
