import { test, expect } from '@playwright/test';

const loginUrl = 'https://www.saucedemo.com/';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  await page.goto(loginUrl);
});

// Scenario 1: Valid username and valid password
test('TC01 - Login with valid username and valid password', async ({ page }) => {
  await page.locator('#user-name').fill(validUsername);
  await page.locator('#password').fill(validPassword);

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

// Scenario 2: Invalid username and valid password
test('TC02 - Login with invalid username and valid password', async ({ page }) => {
  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill(validPassword);

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Scenario 3: Valid username and invalid password
test('TC03 - Login with valid username and invalid password', async ({ page }) => {
  await page.locator('#user-name').fill(validUsername);
  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Scenario 4: Invalid username and invalid password
test('TC04 - Login with invalid username and invalid password', async ({ page }) => {
  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Scenario 5: Empty username and valid password
test('TC05 - Login with empty username and valid password', async ({ page }) => {
  await page.locator('#user-name').fill('');
  await page.locator('#password').fill(validPassword);

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Scenario 6: Valid username and empty password
test('TC06 - Login with valid username and empty password', async ({ page }) => {
  await page.locator('#user-name').fill(validUsername);
  await page.locator('#password').fill('');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Scenario 7: Empty username and empty password
test('TC07 - Login with empty username and empty password', async ({ page }) => {
  await page.locator('#user-name').fill('');
  await page.locator('#password').fill('');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
