import { expect, test } from "@playwright/test";
import LoginPage from "../../pages/login.page";
import SecurePage from "../../pages/secure.page";
import logger from "../../utils/logger";
import { ShadowDom } from "../../pages/shadowdom.page";
import { AlertsPage } from "../../pages/alerts.page";

test.describe('javascript executer', () => {

  test('login with jse', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const securePage = new SecurePage(page);

    await loginPage.open();
    await loginPage.expectLoaded();

    const username = 'tomsmith'
    const password = 'SuperSecretPassword!'

    const {
      title,
      heading
    } = await page.evaluate(({ username, password }) => {
      const usernameInput = document.querySelector('#username') as HTMLInputElement
      usernameInput.value = username
      const passwordInput = document.querySelector('#password') as HTMLInputElement
      passwordInput.value = password
      const button = document.querySelector('button') as HTMLElement
      button.click()

      return { title: document.title, heading: (document.querySelector("h2") as HTMLElement)?.textContent };
    }, {
      username,
      password,
    })

    await securePage.expectLoaded();
    await securePage.expectLoginSuccess();
    await expect(securePage.flashAlert).toContainText('You logged into a secure area!');

    await securePage.logout();

    await loginPage.expectLoaded();
    logger.info(`Login page: ${title} and heading: ${heading}`)
  })

  test('shadow-dom test', async ({ page }) => {
    const shadowDom = new ShadowDom(page);
    await shadowDom.open();

    const text = await shadowDom.getHeaderText()
    logger.info(`shadow-dom test: ${text}`);
    // expect(text).toContain("have some different text!");
  })

  test('js alert test', async ({ page }) => {
    const alertDom = new AlertsPage(page);
    await alertDom.open();
    const text = await alertDom.getHeaderText();
    logger.info(`alerts test: ${text}`);
    await expect(text).toContain("JavaScript Alerts");
    const firstPara = await alertDom.getParagraph();
    logger.info(`alerts test: ${firstPara}`);

    // click alert
    // await page.on('dialog', async dialog => {
    //   console.log(dialog.message());
    //   expect('I am a JS Alert').toContain(dialog.message());
    //   await dialog.accept()
    // })

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain("I am a JS Alert");
      await dialog.accept()
    })
    await alertDom.clickJsAlert()
    const result = await alertDom.getAlertResult()
    expect(result).toContain('You successfully clicked an alert')
  })

  test('js confirm prompt test', async ({ page }) => {
    const alertDom = new AlertsPage(page);
    await alertDom.open();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain("I am a JS prompt");
      await dialog.accept('Rakesh')
    })
    await alertDom.clickJsPrompt()
    const result = await alertDom.getAlertResult()
    await expect(result).toContain('You entered: Rakesh')
  })


})
