
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  // Open login page before every test
  await page.goto('https://www.saucedemo.com/');

});

test('TC01 - Valid Username and Valid Password', async ({ page }) => {

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory/);

  await expect(page.locator('.title')).toHaveText('Products');

});

test('TC02 - Invalid Username and Valid Password', async ({ page }) => {

  await page.locator('#user-name').fill('wrong_user');

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});

test('TC03 - Valid Username and Invalid Password', async ({ page }) => {

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});

test('TC04 - Invalid Username and Invalid Password', async ({ page }) => {

  await page.locator('#user-name').fill('wrong_user');

  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});

test('TC05 - Empty Username and Valid Password', async ({ page }) => {

  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});

test('TC06 - Valid Username and Empty Password', async ({ page }) => {

  await page.locator('#user-name').fill('standard_user');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});

test('TC07 - Empty Username and Empty Password', async ({ page }) => {

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});