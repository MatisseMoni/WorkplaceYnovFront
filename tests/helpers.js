export async function loginUser(page) {
    // Aller à la page de connexion
    await page.goto('http://localhost:3000/connexion');

    // Remplir les champs du formulaire de connexion
    await page.fill('input#email', 'toto42@ynov.com');
    await page.fill('input#password', '1234');

    // Cliquer sur le bouton de connexion
    await page.click('button:has-text("Se connecter")');

    // Attendre que l'URL change pour indiquer que la connexion a réussi
    await page.waitForURL('http://localhost:3000/compte');
}