import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
    await page.goto('http://localhost:3000/');
  
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
    
    // Récupérer le titre de la page
    const pageTitle = await page.title();
    
    // Vérifier que le titre correspond à la valeur attendue
    expect(pageTitle).toBe("Ynov Workplace");
});

test('get start link', async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.click('a:has-text("inscription")');
    await expect(page).toHaveURL(/.*inscription/);
});

test('get login link', async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.click('a:has-text("connexion")');
    await expect(page).toHaveURL(/.*connexion/);
});
