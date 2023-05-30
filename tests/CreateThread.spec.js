import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
        await loginUser(page);
        await page.goto('http://localhost:3000/groupes/443');
    });

    test('Affichage les éléments', async ({ page }) => {
        await page.getByRole('button', { name: 'Ajouter', exact: true }).click();
        await page.waitForSelector('h1:has-text("Créer un thread")');
        await page.waitForSelector('input[id="title"]');
        await page.waitForSelector('input[id="content"]');
    });

    test('Création d\'un thread', async ({ page }) => {
        await page.getByRole('button', { name: 'Ajouter', exact: true }).click();
        await page.route('**/api/threads/1', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "@context": "/api/contexts/Thread",
                    "@id": "/api/threads/1",
                    "@type": "Thread",
                    "id": 1,
                    "title": "ThreadTest",
                    "slug": "threadtest",
                    "content": "Ce thread est un thread de test",
                    "owner": "/api/users/186",
                    "messages": [
                    ],
                    "createdAt": "2023-05-30T18:01:39.959Z",
                    "relatedGroup": "/api/groups/443"
                }),
            });
        });

        await page.fill('input[id="title"]', 'ThreadTest');

        await page.fill('input[id="content"]', 'Ce thread est un thread de test');

        await page.getByRole('button', { name: 'Créer', exact: true }).click();

        await page.waitForSelector('h2:has-text("ThreadTest")');

        await page.waitForSelector('h6:has-text("Ce thread est un thread de test")');

        await page.waitForSelector('h6:has-text("Créé par")');

    });

});