import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
        await loginUser(page);
    });

    test('Navigation vers /', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.waitForURL('http://localhost:3000/');
    });

    test('Navigation vers /inscription', async ({ page }) => {
        await page.goto('http://localhost:3000/inscription');
        await page.waitForURL('http://localhost:3000/');
    });

    test('Navigation vers /connexion', async ({ page }) => {
        await page.goto('http://localhost:3000/connexion');
        await page.waitForURL('http://localhost:3000/');
    });

    test('Navigation vers /compte', async ({ page }) => {
        await page.goto('http://localhost:3000/compte');
        await page.waitForURL('http://localhost:3000/compte');
    });

    test('Navigation vers /groupes/:idGroupe', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/278');
        await page.waitForURL('http://localhost:3000/groupes/278');
    });

    test('Navigation vers /groupes/:idGroupe/threads/:idThread', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/278/threads/173');
        await page.waitForURL('http://localhost:3000/groupes/278/threads/173');
    });

    test('Navigation vers /createGroupe', async ({ page }) => {
        await page.goto('http://localhost:3000/createGroupe');
        await page.waitForURL('http://localhost:3000/createGroupe');
    });

    test('Navigation vers /groupes/:idGroupe/createThread', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/278/createThread');
        await page.waitForURL('http://localhost:3000/groupes/278/createThread');
    });

    test('Navigation vers *', async ({ page }) => {
        await page.goto('http://localhost:3000/azerty');
        await page.waitForSelector('h1:has-text("404")');
    });
});

test.describe('Tests sans connexion', () => {

    test('Navigation vers /', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.waitForURL('http://localhost:3000/connexion');
    });

    test('Navigation vers /inscription', async ({ page }) => {
        await page.goto('http://localhost:3000/inscription');
        await page.waitForURL('http://localhost:3000/inscription');
    });

    test('Navigation vers /connexion', async ({ page }) => {
        await page.goto('http://localhost:3000/connexion');
        await page.waitForURL('http://localhost:3000/connexion');
    });

    test('Navigation vers /compte', async ({ page }) => {
        await page.goto('http://localhost:3000/compte');
        await page.waitForURL('http://localhost:3000/connexion');
    });

    test('Navigation vers /groupes/:idGroupe', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/278');
        await page.waitForURL('http://localhost:3000/connexion');
    })

    test('Navigation vers /groupes/:idGroupe/threads/:idThread', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/278/threads/173');
        await page.waitForURL('http://localhost:3000/connexion');
    })

    test('Navigation vers /createGroupe', async ({ page }) => {
        await page.goto('http://localhost:3000/createGroupe');
        await page.waitForURL('http://localhost:3000/connexion');
    })

    test('Navigation vers /groupes/:idGroupe/createThread', async ({ page }) => {
        await page.goto('http://localhost:3000/groupes/278/createThread');
        await page.waitForURL('http://localhost:3000/connexion');
    });

    test('Navigation vers *', async ({ page }) => {
        await page.goto('http://localhost:3000/azerty');
        await page.waitForSelector('h1:has-text("404")');
    });
});