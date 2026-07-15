import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByRole('button', { name: `Button Triggering AJAX Request` }).click();
})

test('click and assert ajax', async ({ page }) => {
  const textElement = await page.locator('.bg-success')
  // await textElement.waitFor({state: 'attached'})
  await page.waitForSelector('.bg-success', { timeout: 20000 })
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
  // await page.waitForLoadState('networkidle')
  await expect(textElement).toHaveText('Data loaded with AJAX get request.');
})

