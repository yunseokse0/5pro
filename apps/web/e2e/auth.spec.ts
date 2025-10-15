import { test, expect } from '@playwright/test';

test('should display login page', async ({ page }) => {
  await page.goto('/auth/signin');
  await expect(page.locator('h1')).toContainText('5PRO 로그인');
});

test('should login with valid credentials', async ({ page }) => {
  await page.goto('/auth/signin');
  
  await page.fill('input[type="email"]', 'admin@5pro.local');
  await page.fill('input[type="password"]', 'Admin!234');
  
  await page.click('button[type="submit"]');
  
  // Should redirect to admin dashboard
  await page.waitForURL('/admin');
  await expect(page.locator('h1')).toContainText('대시보드');
});

