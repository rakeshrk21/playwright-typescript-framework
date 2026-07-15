import { test as base } from '@playwright/test'
import LoginPage from "../pages/login.page";
import logger from "../utils/logger";

type UiFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
    logger.info('UI test finished...');
  }
})

export { expect } from '@playwright/test';
