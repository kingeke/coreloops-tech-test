import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/auth/login');

  expect(await page.locator('h3').innerText()).toContain('Login');
});
