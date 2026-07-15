import { Page } from '@playwright/test';
import { BasePage } from "./base.page";

export class ShadowDom extends BasePage {
  url = 'https://the-internet.herokuapp.com/shadowdom';
  headerText;

  constructor(page: Page) {
    super(page);
    this.headerText = page.locator('my-paragraph p').first();
  }

  async open() {
    await this.goto(this.url);
  }

  async getHeaderText() {
    return await this.headerText.textContent();
  }
}
