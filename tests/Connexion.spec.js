import { test, expect } from '@playwright/test';

test('Affiche les éléments de la page de connexion', async ({ page }) => {
  await page.goto('http://localhost:3000/connexion'); // Remplacez l'URL par celle de la page de connexion à tester

  // Vérifier que les éléments attendus sont présents sur la page
  await page.waitForSelector('h1:has-text("Connexion")');
  await page.waitForSelector('input#email');
  await page.waitForSelector('input#password');
  await page.waitForSelector('button:has-text("Se Connecter")');
  // ... Ajoutez d'autres assertions pour vérifier les éléments de la page
});

test('Effectue une tentative de connexion avec des identifiants valides', async ({ page }) => {
    await page.goto('http://localhost:3000/connexion'); // Remplacez l'URL par celle de la page de connexion à tester
  
    // Remplir les champs de connexion avec des identifiants valides
    await page.fill('input#email', 'toto42@ynov.com');
    await page.fill('input#password', '1234');
  
    // Attendre que le bouton "Se Connecter" soit visible
    await page.waitForSelector('button:has-text("Se Connecter")', { state: 'visible' });
  
    // Cliquer sur le bouton "Se Connecter"
    await page.click('button:has-text("Se Connecter")');
  
    // Attendre que la redirection vers la page "/compte" se produise (en vérifiant l'URL actuelle)
    await page.waitForURL(/\/compte/);
  
    // Vérifier que l'URL actuelle correspond à l'URL de la page "/compte"
    const currentURL = await page.url();
    expect(currentURL).toMatch(/\/compte/);
  
    // ... Ajoutez d'autres assertions pour vérifier le résultat de la connexion
  });
  

test('Effectue une tentative de connexion avec des identifiants invalides', async ({ page }) => {
  await page.goto('http://localhost:3000/connexion'); // Remplacez l'URL par celle de la page de connexion à tester

  // Remplir les champs de connexion avec des identifiants invalides
  await page.fill('input#email', 'invalid@example.com');
  await page.fill('input#password', 'invalidpassword');

  // Attendre que le bouton "Se Connecter" soit visible
  await page.waitForSelector('button:has-text("Se Connecter")', { state: 'visible' });
  
  // Cliquer sur le bouton "Se Connecter"
  await page.click('button:has-text("Se Connecter")');

  // Vérifier le résultat de la tentative de connexion
  await page.waitForSelector('p:has-text("Email ou mot de passe incorrect")');
  // ... Ajoutez d'autres assertions pour vérifier le résultat de la connexion avec des identifiants invalides
});
