import { Page } from '@playwright/test';
import { BasePage } from "./base.page";

export class AlertsPage extends BasePage {
  heading;
  paragraph;
  jsAlertButton;
  jsConfirmButton;
  jsPromptButton;
  alertResultText;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.getByRole("heading", { level: 3, name: "JavaScript Alerts" });
    // this.paragraph = this.page.locator("p:nth-of-type(1)");
    // this.paragraph = this.page.locator("div>p:nth-child(2)");
    this.paragraph = this.page.getByText("Here are some examples of different JavaScript");
    this.jsAlertButton = this.page.getByRole("button", { name: 'Click for JS Alert' });
    this.jsConfirmButton = this.page.getByRole("button", { name: 'Click for JS Confirm' });
    this.jsPromptButton = this.page.getByRole("button", { name: 'Click for JS Prompt' });
    this.alertResultText = this.page.locator('#result');
  }

  async open() {
    await this.goto('https://the-internet.herokuapp.com/javascript_alerts');
  }

  async getHeaderText() {
    return await this.heading.textContent();
  }

  async getParagraph() {
    return await this.paragraph.textContent();
  }

  async clickJsAlert() {
    await this.jsAlertButton.click();
  }

  async clickJsConfirm() {
    await this.jsConfirmButton.click();
  }

  async clickJsPrompt() {
    await this.jsPromptButton.click();
  }

  async getAlertResult() {
    return await this.alertResultText.textContent();
  }
}
