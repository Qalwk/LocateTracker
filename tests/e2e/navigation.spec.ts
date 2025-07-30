// import { test, expect } from '@playwright/test';

// test.describe('Навигация по приложению', () => {
//   test('главная страница загружается', async ({ page }) => {
//     // Переходим на главную страницу
//     await page.goto('/');

//     // Проверяем, что страница загрузилась
//     await expect(page).toHaveTitle(/SkyTrack/);

//     // Проверяем, что есть основные элементы
//     await expect(page.locator('body')).toBeVisible();
//   });

//   test('страница входа загружается', async ({ page }) => {
//     // Переходим на страницу входа
//     await page.goto('/login');

//     // Проверяем, что страница загрузилась
//     await expect(page).toHaveTitle(/SkyTrack/);

//     // Проверяем, что есть форма входа
//     await expect(page.locator('form')).toBeVisible();
//   });

//   test('можно перейти на главную страницу', async ({ page }) => {
//     // Начинаем со страницы входа
//     await page.goto('/login');

//     // Проверяем, что мы на странице входа
//     await expect(page).toHaveURL(/.*login/);

//     // Переходим на главную страницу
//     await page.goto('/');

//     // Проверяем, что мы на главной странице
//     await expect(page).toHaveURL('/');
//   });
// });
