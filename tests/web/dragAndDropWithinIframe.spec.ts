import { test } from '@playwright/test'

test('dragAndDropWithinIframe', async ({page}) => {
    await page.goto(`https://www.globalsqa.com/demo-site/draganddrop/`)
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    const dest = frame.locator('#trash')
    await frame.locator('li h5', {hasText: "High Tatras 2"}).dragTo(dest)

    await frame.locator('li h5', {hasText: "High Tatras 3"}).hover()
    await page.mouse.down()
    await dest.hover()
    await page.mouse.up()
})
