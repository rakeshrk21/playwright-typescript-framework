import { expect } from '@playwright/test';
import { test } from '../../utils/ui.fixtures'
import SecurePage from '../../pages/secure.page';
import logger from "../../utils/logger";

test('should login with valid credentials', async ({ page, loginPage }) => {
  const securePage = new SecurePage(page);

  await loginPage.open();
  const title = await page.evaluate(() => {
    return document.title
  })
  logger.info(`Title is: ${title}`);
  await loginPage.expectLoaded();

  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(securePage.titleHeading).toBeVisible();
  await expect(securePage.subTitleHeading).toBeVisible();
  await expect(securePage.flashAlert).toBeVisible();
  await expect(securePage.flashAlert).toContainText('You logged into a secure area!');

  await securePage.logout();
  await expect(loginPage.titleHeading).toBeVisible();
  await expect(loginPage.subTitleHeading).toBeVisible();
});
