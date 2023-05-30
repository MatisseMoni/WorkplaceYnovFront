import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
      // Connecte l'utilisateur avant chaque test de ce groupe
      await loginUser(page);
    });

    test('Page de compte : affichage des informations de l\'utilisateur', async ({ page }) => {
        // Supposez que l'utilisateur est déjà connecté et que l'URL est /compte
        await page.goto('http://localhost:3000/compte');

        // Vérifiez que le UserCard est affiché
        await page.waitForSelector('h1:has-text("Mon Profil")');
    });

    test('Page de compte : confirmation de suppression du compte', async ({ page }) => {
        // Supposez que l'utilisateur est déjà connecté et que l'URL est /compte
        await page.goto('http://localhost:3000/compte');

        // Cliquez sur le bouton "Supprimer mon compte"
        await page.click('button:has-text("Supprimer mon compte")');

        // Vérifiez que le texte du bouton a changé pour "Es-tu sur ?"
        const buttonText = await page.textContent('button:has-text("Es-tu sur ?")');
        expect(buttonText).toBe('Es-tu sur ?');
    });

    test('Page de compte : annulation de la suppression du compte', async ({ page }) => {
        // Supposez que l'utilisateur est déjà connecté et que l'URL est /compte
        await page.goto('http://localhost:3000/compte');

        // Cliquez sur le bouton "Supprimer mon compte"
        await page.click('button:has-text("Supprimer mon compte")');

        // Cliquez sur le bouton "annuler"
        await page.click('button:has-text("annuler")');

        // Vérifiez que le texte du bouton est revenu à "Supprimer mon compte"
        const buttonText = await page.textContent('button:has-text("Supprimer mon compte")');
        expect(buttonText).toBe('Supprimer mon compte');
    });
});