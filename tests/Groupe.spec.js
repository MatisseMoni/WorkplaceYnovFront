import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
        await loginUser(page);
    });

    test('Affichage les éléments', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/443');

        await page.waitForSelector('h1:has-text("group de test")');

        await page.waitForSelector('p:has-text("ceci est un groupe de test")');

        await page.waitForSelector('h2:has-text("Threads")');

        await page.waitForSelector('h2:has-text("Membres")');

        await page.waitForSelector('button:has-text("Supprimer le groupe")');
    });        
});