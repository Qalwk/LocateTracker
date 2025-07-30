import { expect, test } from "@playwright/test";

test.describe("Фильтрация рейсов", () => {
  test.beforeEach(async ({ page }) => {
    // Авторизуемся перед каждым тестом
    await page.goto("/login");

    // Ждём загрузки страницы входа
    await page.waitForLoadState("networkidle");

    // Вводим данные для входа (используем данные из users.json)
    await page.fill('input[type="email"]', "admin@gmail.com");
    await page.fill('input[type="password"]', "adminpass");

    // Нажимаем кнопку входа
    await page.click('button[type="submit"]');

    // Ждём перехода на главную страницу
    await page.waitForURL("/");
  });

  test("фильтры отображаются на главной странице", async ({ page }) => {
    // Переходим на главную страницу (уже авторизованы)
    await page.goto("/");

    // Ждём загрузки страницы
    await page.waitForLoadState("networkidle");

    // Проверяем, что фильтры отображаются
    // Ищем поля ввода по их label
    await expect(page.getByLabel("ID")).toBeVisible();
    await expect(page.getByLabel("Comp.")).toBeVisible();
    await expect(page.getByLabel("From")).toBeVisible();
    await expect(page.getByLabel("To")).toBeVisible();
  });

  // test('можно ввести текст в фильтр ID', async ({ page }) => {
  //   // Переходим на главную страницу (уже авторизованы)
  //   await page.goto('/');

  //   // Ждём загрузки страницы
  //   await page.waitForLoadState('networkidle');

  //   // Находим поле фильтра по ID
  //   const idFilter = page.getByLabel('ID');

  //   // Вводим текст
  //   await idFilter.fill('S7129');

  //   // Проверяем, что текст введён
  //   await expect(idFilter).toHaveValue('S7129');
  // });

  // test('можно очистить фильтр', async ({ page }) => {
  //   // Переходим на главную страницу (уже авторизованы)
  //   await page.goto('/');

  //   // Ждём загрузки страницы
  //   await page.waitForLoadState('networkidle');

  //   // Находим поле фильтра по ID
  //   const idFilter = page.getByLabel('ID');

  //   // Вводим текст
  //   await idFilter.fill('S7129');

  //   // Очищаем поле
  //   await idFilter.clear();

  //   // Проверяем, что поле пустое
  //   await expect(idFilter).toHaveValue('');
  // });
});
