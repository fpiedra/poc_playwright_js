const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.amazon.com/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Amazon/);
});

test('get results from search', async ({ page }) => {
  await page.locator("#twotabsearchtextbox").fill("Headset");
  await page.locator("#twotabsearchtextbox").press("Enter");
  await page.waitForLoadState();
  await expect(page.locator("[data-cy='title-recipe']").first()).toContainText("Headset");
});

test('can open hamburger menu', async ({ page }) => {
  await page.locator("#nav-hamburger-menu").count();
  await expect(page.locator("#hmenu-content").first()).toBeVisible();
});

test('check if titles are present', async ({ page }) => {
  const menuTitles = ["Digital Content & Devices", "Shop by Department", "Programs & Features", "Help & Settings", "Stream Music"]
  const items = page.locator(".hmenu-title");
  for (let i = 0; i < await items.count(); i++) {
    await items.nth(i).toContainText(menuTitles[i]);
  }
});

test('can search and check last element has headset text', async ({ page }) => {
  await page.locator("#twotabsearchtextbox").fill("Headset");
  await page.locator("#twotabsearchtextbox").press("Enter");
  await page.waitForLoadState();
  await expect(page.locator("[data-cy='title-recipe']").last()).toContainText("Headset");
});

test('check add to cart button is visible', async ({ page }) => {
  await page.locator("#twotabsearchtextbox").fill("Headset");
  await page.locator("#twotabsearchtextbox").press("Enter");
  await page.waitForLoadState();
  await expect(page.locator('[data-csa-c-content-id="s-search-add-to-cart-action"]')).toBeVisible();
});
