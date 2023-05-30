import { test, expect } from '@playwright/test';

test('Affiche les éléments de la page d\'inscription', async ({ page }) => {
    await page.goto('http://localhost:3000/inscription');

    await page.waitForSelector('h1:has-text("Inscription")');
    await page.waitForSelector('input#nickname');
    await page.waitForSelector('input#email');
    await page.waitForSelector('input#password');
    await page.waitForSelector('input#password-confirmation');
    await page.waitForSelector('button:has-text("S\'inscrire")');
});

test('Inscription avec des informations valides', async ({ page }) => {
    await page.route('**/api/users', route => {
        route.fulfill({
            status: 201,
            body: JSON.stringify({
                "@context": "/api/contexts/User",
                "@id": "/api/users/5",
                "@type": "User",
                "id": 5,
                "email": "test@example.com",
                "nickname": "testnickname"
            }),
        });
    });

    await page.goto('http://localhost:3000/inscription');

    await page.fill('input#nickname', 'testnickname');
    await page.fill('input#email', 'test@example.com');
    await page.fill('input#password', 'testpassword');
    await page.fill('input#password-confirmation', 'testpassword');

    await page.click('button:has-text("S\'inscrire")');

    await page.waitForURL('http://localhost:3000/');

    const currentURL = await page.url();
    expect(currentURL).toBe('http://localhost:3000/');
});

test('Inscription avec des mots de passe ne correspondant pas', async ({ page }) => {
    await page.route('**/api/users', route => {
        route.fulfill({
            status: 400,
            body: JSON.stringify({
            }),
        });
    });

    await page.goto('http://localhost:3000/inscription');

    await page.fill('input#nickname', 'testnickname');
    await page.fill('input#email', 'test@example.com');
    await page.fill('input#password', 'testpassword');
    await page.fill('input#password-confirmation', 'wrongpasswordconfirmation');

    await page.click('button:has-text("S\'inscrire")');

    await page.waitForSelector('p:has-text("Passwords do not match")');
});
