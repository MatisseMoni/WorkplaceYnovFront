import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.waitForLoadState('networkidle');

    const pageTitle = await page.title();

    expect(pageTitle).toBe("Ynov Workplace");
});

test('get start link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.click('a:has-text("inscription")');
    await expect(page).toHaveURL(/.*inscription/);
});

test('get login link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.click('a:has-text("connexion")');
    await expect(page).toHaveURL(/.*connexion/);
});
