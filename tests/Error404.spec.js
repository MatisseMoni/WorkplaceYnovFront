import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {

    test.beforeEach(async ({ page }) => {
        await loginUser(page);
    });

    test('Page 404 : affichage', async ({ page }) => {
        await page.goto('http://localhost:3000/test');

        await page.waitForSelector('h1:has-text("404")');

        await page.waitForSelector('h6:has-text("Je crois que tu es perdu 😅")');

        await page.waitForSelector('button:has-text("Revenir a l\'accueil")');

        await page.waitForSelector('img');
    });

    test('Page 404 : retour a l\'accueil', async ({ page }) => {
        await page.goto('http://localhost:3000/test');

        await page.click('button:has-text("Revenir a l\'accueil")');

        const url = await page.url();

        expect(url).toBe('http://localhost:3000/');

    });

});