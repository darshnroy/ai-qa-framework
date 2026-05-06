const { test, expect } = require('@playwright/test');

test('Playwright website search works', async ({ page }) => {

  // Open Playwright site
  await page.goto('https://playwright.dev');

  // Wait for search button
  await page.waitForSelector('button.DocSearch');

  // Click search
  await page.click('button.DocSearch');

  // Type search
  await page.fill('.DocSearch-Input', 'locator');

  // Wait for results
  await page.waitForSelector('.DocSearch-Hit');

  // Get result text
  const result = await page.locator('.DocSearch-Hit').first().textContent();

  console.log("First result:", result);

  // Assertion
  expect(result).toBeTruthy();
});