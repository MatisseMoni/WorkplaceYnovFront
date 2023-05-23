import {test, expect} from '@playwright/test';

test ('has title', async ({page}) => {
    await page.goto('http://localhost:3000/');
    expect(page).toHaveTitle("🦆 Ynov Workplace");
});

test ('get start link', async ({page}) => {
    await page.goto('http://localhost:3000/');

    await page.getByRole('link', {name: "inscription"}).click();

    await expect(page).toHaveURL(/.*inscription/);
});