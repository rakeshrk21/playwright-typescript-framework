import { expect, test } from "@playwright/test";
import { ShadowDom } from "../../pages/shadowdom.page";
import logger from "../../utils/logger";

test.describe('shadow dom', () => {
  test('should display expected shadow text', async ({ page }) => {
    const shadowDom = new ShadowDom(page);
    await shadowDom.open();

    const text = await shadowDom.getHeaderText();
    logger.info(`shadow dom text: ${text}`);

    // Validate the text shown inside the shadow DOM contains the expected phrase
    await expect(text).toContain('different text');
  });
});
