import { test, expect } from '@playwright/test';

const describe = test.describe;

describe('application title', () => {
  test.skip('has correct title', async ({ page }) => {
    await page.goto('http://ec2-13-49-145-115.eu-north-1.compute.amazonaws.com:3000');
  
    await expect(page).toHaveTitle(/Arcade Playlist/);
  });
  
  test.skip('game playlist header cover', async ({ page }) => {
    await page.goto('http://ec2-13-49-145-115.eu-north-1.compute.amazonaws.com:3000/game-collection?sortBy=A%20-%20Z');
  
    await expect(page.locator('.kb-playlist-image')).toBeVisible();
  });

});

