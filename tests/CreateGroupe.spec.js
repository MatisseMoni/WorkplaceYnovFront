import { test, expect } from '@playwright/test';
import { loginUser } from './helpers';

test.describe('Tests avec connexion', () => {
    test.beforeEach(async ({ page }) => {
        await loginUser(page);
    });

    test('Affichage les éléments', async ({ page }) => {
        await page.goto('http://localhost:3000/createGroupe');

        await page.waitForSelector('h1:has-text("Créer un groupe")');
    });

    test('Création d\'un groupe', async ({ page }) => {
        await page.route('**/api/groups', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    "@context": "/api/contexts/Group",
                    "@id": "/api/groups/278",
                    "@type": "Group",
                    "id": 278,
                    "name": "GroupTest",
                    "owner": "/api/users/186",
                    "members": [
                    ],
                    "groupRequests": [
                    ],
                    "description": "Ce groupe est un groupe de test",
                    "threads": [
                    ]
                }),
            });
        });

        await page.route('**/api/group_requests', route => {
            route.fulfill({
                status: 201,
                body: JSON.stringify({
                    "@context": "/api/contexts/GroupRequest",
                    "@id": "/api/group_requests/5",
                    "@type": "GroupRequest",
                    "id": 5,
                    "targetUser": "/api/users/186",
                    "targetGroup": "/api/groups/278",
                    "status": 0
                }),
            });
        });
        await page.route('**/api/group_requests/5/accept', route => {
            route.fulfill({

                status: 201,
                body: JSON.stringify({
                    "@context": "/api/contexts/GroupRequest",
                    "@id": "/api/group_requests/5",
                    "@type": "GroupRequest",
                    "id": 5,
                    "targetUser": "/api/users/186",
                    "targetGroup": "/api/groups/278",
                    "status": 1
                }),
            })
        });

        await page.route('**/api/groups/5', route => {
            route.fulfill({

                status: 201,
                body: JSON.stringify({
                    "data": {
                        "@context": "/api/contexts/Group",
                        "@id": "/api/groups/278",
                        "@type": "Group",
                        "id": 278,
                        "name": "GroupTest",
                        "owner": "/api/users/186",
                        "members": [
                            "/api/users/186"
                        ],
                        "groupRequests": [
                        ],
                        "description": "Ce groupe est un groupe de test",
                        "threads": [
                        ]
                    }
                }),
            })
        });

        await page.goto('http://localhost:3000/createGroupe');

        await page.fill('input#name', 'GroupTest');
        await page.fill('textarea#description', 'Ce groupe est un groupe de test');

        await page.getByRole('button', { name: 'Créer', exact: true }).click();

        await page.waitForURL('http://localhost:3000/groupes/278');
        const currentURL = await page.url();
        expect(currentURL).toBe('http://localhost:3000/groupes/278');

    });

});
