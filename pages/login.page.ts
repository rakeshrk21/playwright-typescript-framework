import { expect, Page } from '@playwright/test';
import { BasePage } from "./base.page";

export default class LoginPage extends BasePage {
  url = 'https://the-internet.herokuapp.com/login';

  titleHeading;
  subTitleHeading;
  inputUsername;
  inputPassword;
  btnSubmit;

  constructor(page: Page) {
    super(page);
    this.titleHeading = page.getByRole('heading', { level: 2, name: 'Login Page' });
    this.subTitleHeading = page.getByText('This is where you can log into the secure area');
    this.inputUsername = page.getByLabel('Username');
    this.inputPassword = page.getByLabel('Password');
    // this.btnSubmit = page.getByRole('button', { name: 'Login' });
    this.btnSubmit = page.locator('button', { hasText: 'Login' });
  }

  async open() {
    await this.goto(this.url);
  }

  async expectLoaded() {
    await expect(this.titleHeading).toBeVisible();
    await expect(this.subTitleHeading).toBeVisible();
  }

  async login(username: string, password: string) {
    // await this.inputUsername.fill(username);
    // await this.inputPassword.fill(password);
    await this.inputUsername.pressSequentially(username, { delay: 200 });
    await this.inputPassword.pressSequentially(password, { delay: 200 });

    // generic assertions
    const text = await this.inputUsername.inputValue()
    expect(username).toContain(text);

    // locator assertion
    await expect(await this.inputUsername).toHaveValue(username)
    await this.btnSubmit.click();
  }
}
