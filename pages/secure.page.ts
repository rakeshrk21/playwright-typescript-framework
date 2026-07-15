import { expect, Page } from '@playwright/test';
import { BasePage } from "./base.page";

export default class SecurePage extends BasePage {
  titleHeading;
  subTitleHeading;
  btnLogout;

  constructor(page: Page) {
    super(page);
    this.titleHeading = this.page.getByRole('heading', { level: 2, name: 'Secure Area' });
    this.subTitleHeading = this.page.getByText('Welcome to the Secure Area.');
    this.btnLogout = this.page.locator('a[href="/logout"]');
  }

  get flashAlert() {
    return this.page.locator('#flash')
  }

  async expectLoaded() {
    await expect(this.titleHeading).toBeVisible();
    await expect(this.subTitleHeading).toBeVisible();
  }

  async expectLoginSuccess() {
    await expect(this.flashAlert).toBeVisible();
  }

  async logout() {
    await this.btnLogout.click()
  }
}
