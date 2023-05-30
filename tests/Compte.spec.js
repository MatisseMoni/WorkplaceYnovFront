import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page);
    });

    test('Page de compte : affichage des informations de l\'utilisateur', async ({ page }) => {
        await page.goto('http://localhost:3000/compte');

        await page.waitForSelector('h1:has-text("Mon Profil")');
    });

    test('Page de compte : confirmation de suppression du compte', async ({ page }) => {
        await page.goto('http://localhost:3000/compte');

        await page.click('button:has-text("Supprimer mon compte")');

        const buttonText = await page.textContent('button:has-text("Es-tu sur ?")');
        expect(buttonText).toBe('Es-tu sur ?');
    });

    test('Page de compte : annulation de la suppression du compte', async ({ page }) => {
        await page.goto('http://localhost:3000/compte');

        await page.click('button:has-text("Supprimer mon compte")');

        await page.click('button:has-text("annuler")');

        const buttonText = await page.textContent('button:has-text("Supprimer mon compte")');
        expect(buttonText).toBe('Supprimer mon compte');
    });
});