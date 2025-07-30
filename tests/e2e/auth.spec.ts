// import { test, expect } from '@playwright/test';

// test.describe('Авторизация', () => {
//   test('пользователь может войти в систему', async ({ page }) => {
//     // Переходим на страницу входа
//     await page.goto('/login');

//     // Ждём загрузки страницы
//     await page.waitForLoadState('networkidle');

//     // Проверяем, что форма входа отображается
//     await expect(page.locator('form')).toBeVisible();

//     // Вводим данные для входа
//     await page.fill('input[type="email"]', 'admin@gmail.com');
//     await page.fill('input[type="password"]', 'adminpass');

//     // Нажимаем кнопку входа
//     await page.click('button[type="submit"]');

//     // Ждём перехода на главную страницу
//     await page.waitForURL('/');

//     // Проверяем, что мы на главной странице
//     await expect(page).toHaveURL('/');
//   });

//   test('неверные данные входа показывают ошибку', async ({ page }) => {
//     // Переходим на страницу входа
//     await page.goto('/login');

//     // Ждём загрузки страницы
//     await page.waitForLoadState('networkidle');

//     // Вводим неверные данные
//     await page.fill('input[type="email"]', 'wrong@email.com');
//     await page.fill('input[type="password"]', 'wrongpassword');

//     // Нажимаем кнопку входа
//     await page.click('button[type="submit"]');

//     // Проверяем, что остались на странице входа
//     await expect(page).toHaveURL(/.*login/);
//   });

//   test('можно использовать разные аккаунты', async ({ page }) => {
//     // Переходим на страницу входа
//     await page.goto('/login');

//     // Ждём загрузки страницы
//     await page.waitForLoadState('networkidle');

//     // Тестируем второй аккаунт из users.json
//     await page.fill('input[type="email"]', 'test@example.com');
//     await page.fill('input[type="password"]', '123456');

//     // Нажимаем кнопку входа
//     await page.click('button[type="submit"]');

//     // Ждём перехода на главную страницу
//     await page.waitForURL('/');

//     // Проверяем, что мы на главной странице
//     await expect(page).toHaveURL('/');
//   });
// });
