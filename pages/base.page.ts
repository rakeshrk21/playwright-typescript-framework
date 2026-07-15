import { Page } from '@playwright/test';

export class BasePage {

  constructor(protected page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(locator: any) {
    await locator.click();
  }

}

