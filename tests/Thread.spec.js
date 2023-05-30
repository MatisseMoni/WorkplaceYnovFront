import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
        await loginUser(page);
    });

    test('Affichage les éléments', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/443/threads/291');

        await page.waitForSelector('h1:has-text("test")');

        await page.waitForSelector('h6:has-text("Créé par ")');

        await page.waitForSelector('h6:has-text("Objet : ")');

        await page.waitForSelector('h3:has-text("Messages")');

    });        

    test('Création d\'un message', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/443/threads/291');

        await page.route('**/api/messages', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "@context": "/api/contexts/Message",
                    "@id": "/api/messages/1",
                    "@type": "Message",
                    "id": 1,
                    "content": "ça marche ?",
                    "hasBeenEdited": false,
                    "owner": "/api/users/186",
                    "thread": "/api/threads/291",
                    "createdAt": "2021-04-23T09:30:05+00:00",
                    "modifiedAt": "2021-04-23T09:30:05+00:00"
                }),
            });
        });

        await page.fill('input[type="text"]', 'ça marche ?');

        await page.click('button:has-text("Envoyer")');

        await page.waitForSelector('p:has-text("ça marche ?")');

        await page.waitForSelector('p:has-text("Me")');

    });
});